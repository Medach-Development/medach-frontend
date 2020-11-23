<template lang="pug">
.wrapper
  scroll-top
  .container
    .buttons
      nuxt-link.button-wrapper(:to="`/categories/media/подкасты`")
        .flag
          h2
            | Подкасты
        .content
          .button-icon
            img(src="~/assets/images/podcasts.svg")
          .text
            | Слушайте наши подкасты на SoundCloud
      nuxt-link.button-wrapper(:to="`/categories/media/инфографика`")
        .flag
          h2
            | Инфографика
        .content
          .button-icon
            img(src="~/assets/images/infographic.svg")
          .text
            | Сложные схемы простым языком
      nuxt-link.button-wrapper(:to="`/categories/media/видеоматериалы`")
        .flag
          h2
            | Видеоматериалы
        .content
          .button-icon
            img(src="~/assets/images/video.svg")
          .text
            | Смотрите наши видеолекции на YouTube
  .container.row
    .articles

      .heading
        .top
          .search-wrapper
            input(type="text" placeholder="Поиск по тегам и ключевым словам…" v-model="searchQuery")
        .bottom
          .left
            .sort-button(:class="{'active': isPopular }" @click="sortByPopular")
              | Популярное
            .sort-button(:class="{'active': !isPopular }" @click="sortByDate")
              | Свежее
          .right
            .switch-grid(@click="switchView")
              .icon.icon-grid(v-if="isList")
              .icon.icon-list(v-else)

      .articles-view
        list-articles-view(v-if="isList" :articles="articles" key="list-view")
        grid-articles-view(v-else :articles="articles" key="grid-view")
        .no-articles(v-if="articles.length === 0") Здесь ещё ничего нет, но вы можете вернуться на&nbsp;
          nuxt-link(to="/")
            | главную страницу

    .promo-wrapper

  .load-more-wrapper
    .load-more(v-if="nextPage" @click="getNextPage")
      | Еще

  .interested-wrapper
    .container
      interested-articles(:articles="interested")
</template>

<script>
const ARTICLES_PER_PAGE_LIST = 5
const ARTICLES_PER_PAGE_GRID = 12

const SEARCH_INTERVAL = 300

import { debounce } from 'lodash'

import ListArticlesView from '~/components/ListArticlesView'
import GridArticlesView from '~/components/GridArticlesView'
import InterestedArticles from '~/components/InterestedArticles'
import ThePopularAuthors from '~/components/ThePopularAuthors'
import ScrollTop from '~/components/ScrollTop'

import { mapGetters } from 'vuex'

export default {
  components: {
    ListArticlesView,
    GridArticlesView,
    InterestedArticles,
    ThePopularAuthors,
    ScrollTop,
  },
  fetch({store, params}) {
    return store.dispatch('mediaPage/fetchMedia', {
      page: 1,
      perPage: ARTICLES_PER_PAGE_LIST,
      isSortByPopular: false,
      category: params.id
    })
      .then(() => store.dispatch('interestedArticles/fetchInterestedArticles'))
  },
  data() {
    return {
      isList: true,
      isPopular: false,
      searchQuery: ''
    }
  },
  head() {
    return {
      title: `Медач | ${this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1)}`
    }
  },
  created() {
    this.debouncedSearch = debounce(this.getSearchResults, SEARCH_INTERVAL)
  },
  computed: {
    ...mapGetters({
      articles: 'mediaPage/articles',
      interested: 'interestedArticles/articles',
      nextPage: 'mediaPage/nextPage'
    }),
    perPage() {
      return this.isList ? ARTICLES_PER_PAGE_LIST : ARTICLES_PER_PAGE_GRID
    },
    currentCategory() {
      return this.$route.params.id || null
    }
  },
  methods: {
    switchView() {
      this.isList = !this.isList
      return this.$store.dispatch('mediaPage/fetchMedia', {
        page: 1,
        perPage: this.perPage,
        isSortByPopular: this.isPopular,
        query: this.currentCategory
      })
    },

    sortByDate() {
      this.searchQuery = ''
      if (this.isPopular) {
        this.isPopular = false

        return this.$store.dispatch('mediaPage/fetchMedia', {
          page: 1,
          perPage: this.perPage,
          isSortByPopular: this.isPopular,
          category: this.currentCategory
        })
      }
    },

    sortByPopular() {
      this.searchQuery = ''
      if (!this.isPopular) {
        this.isPopular = true

        return this.$store.dispatch('mediaPage/fetchMedia', {
          page: 1,
          perPage: this.perPage,
          isSortByPopular: this.isPopular,
          category: this.currentCategory
        })
      }
    },

    getNextPage() {
      return this.$store.dispatch('mediaPage/fetchMedia', {
        page: this.nextPage,
        perPage: this.perPage,
        category: this.currentCategory,
        isSortByPopular: this.isPopular,
        query: this.searchQuery === '' ? null : this.searchQuery
      })
    },

    getSearchResults() {
      return this.$store.dispatch('mediaPage/fetchMedia', {
        page: 1,
        perPage: this.perPage,
        isSortByPopular: this.isPopular,
        category: this.currentCategory,
        query: this.searchQuery === '' ? null : this.searchQuery
      })
    }
  },

  watch: {
    searchQuery: function(e) {
      if (e !== '') {
        this.debouncedSearch()
      }
      else {
        return this.$store.dispatch('categoryPage/fetchCategory', {
          page: 1,
          perPage: this.perPage,
          isSortByPopular: this.isPopular,
          category: this.currentCategory
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.no-articles {
  font-size: 24px;
  color: #5B5B5B;
  letter-spacing: 0;
  text-decoration: none;
  max-width: 520px;
  margin: 150px 0;
  line-height: 32px;

  a {
    font-weight: 600;
    color: #7198BA;
    letter-spacing: 0;
    border-color: #7198BA;
  }
}
.icon {
  width: 16px;
  height: 16px;

  &-grid {
    background: url('~assets/images/grid-icon.svg') no-repeat center / contain;
  }

  &-list {
    background: url('~assets/images/list-icon.svg') no-repeat center / contain;
  }
}

.articles {
  max-width: 880px;
  flex: 1 1 auto;
}

.switch-grid {
  cursor: pointer;
  user-select: none;
}

.bottom {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
}

.heading {
  margin-top: 24px;
}

.left {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.sort-button {
  font-size: 16px;
  color: #5B5B5B;
  letter-spacing: 0;
  cursor: pointer;
  border-bottom: 2px solid rgba(0,0,0,0);

  &:not(:first-child) {
    margin-left: 16px;
  }

  &.active {
    font-weight: 600;
    color: #7198BA;
    letter-spacing: 0;
    border-color: #7198BA;
  }
}

.search-wrapper {
  display: flex;

  input {
    flex: 1 1 auto;
    border: 2px solid #DBDBDB;
    border-radius: 3px;
    padding: 8px 20px 6px 20px;
    outline: none;

    &::placeholder {
      font-size: 16px;
      color: #7198BA;
      letter-spacing: 0;
    }
  }
}

.load-more-wrapper {
  margin-top: 60px;
}

.load-more {
  font-weight: 600;
  font-size: 16px;
  color: #FFFFFF;
  background: #7198BA;
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
  text-align: center;
  cursor: pointer;
  user-select: none;
  padding: 24px;
}

.interested-wrapper {
  padding: 40px 0;
}

.row {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
}

.promo-wrapper {
  margin-left: 80px;
  max-width: 400px;
  flex: 1 1 auto;
  margin-top: 24px;
}

.buttons {
  display: flex;
  flex-flow: row nowrap;
  margin-top: 24px;

  .nuxt-link-active {
    transition: background .2s ease;

    background: #DBDCD5;

    .flag {
      min-width: 65%;

      &::before {
        background: #DBDCD5;
      }
    }
  }
}

.button-wrapper {
  background: #F2F3EC;
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
  border-radius: 3px;
  width: 33.3%;
  padding: 24px 0;
  cursor: pointer;
  min-height: 150px;
  transition: background .2s ease;

  &:last-child {
    .flag {
      min-width: 205px;
    }
  }

  &:nth-child(2) {
    margin: 0 20px;
  }

  &:hover {
    .flag {
      min-width: 65%
    }
  }

}

.flag {
  display: inline-block;
  min-width: 190px;
  min-height: 27px;
  position: relative;
  z-index: 10;
  background: #7198BA;
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
  transition: min-width .2s ease;
  will-change: min-width;

  &::before {
    content: '';
    background: #F2F3EC;
    width: 27px;
    height: 27px;
    position: absolute;
    right: -19px;
    top: 0;
    transform: rotate(45deg);

  }

  h2 {
    z-index: 10;
    display: flex;
    align-items: center;
    min-height: 27px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 1.13px;
    font-weight: 500;
    margin-left: 16px;
  }
}

.content {
  padding: 0 24px;
  margin-top: 16px;
  font-size: 16px;
  color: #474747;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.button-icon {
  width: 40px;
  height: 40px;
}

.text {
  margin-left: 24px;
}

@media (max-width: 1024px) {
  .promo-wrapper {
    display: none;
  }
}

@media (max-width: 768px) {
  .interested-wrapper {
    padding-top: 16px;
    padding-bottom: 0;
  }

  .load-more-wrapper {
    margin-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #AFB09A;
  }

  .load-more {
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .buttons {
    flex-flow: column nowrap;
    align-items: center;
  }

  .button-wrapper {
    min-height: 150px;
    width: 100%;
    margin-bottom: 10px;

    &:nth-child(2) {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>
