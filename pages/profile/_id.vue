<template lang="pug">
.wrapper
  the-header
  .profile-img

  .container
    .profile-info
      .avatar
      .info
        .name
          | Dental Jedi
        .social-items
          .social.social-facebook
          .social.social-telegram
          .social.social-instagram
    .about
      .about-text
        | On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish.
      .about-text
        | On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish.
    .autor-articles
      | Статьи Автора

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

    .promo-wrapper
      the-popular-authors(:articles="dummyAuthors")

  .load-more-wrapper
    .load-more(v-if="nextPage" @click="getNextPage")
      | Больше статей

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
import TheHeader from '~/components/TheHeader'

import { mapGetters } from 'vuex'

export default {
  components: {
    ListArticlesView,
    GridArticlesView,
    InterestedArticles,
    ThePopularAuthors,
    TheHeader
  },
  fetch({store, params}) {
    return store.dispatch('profilePage/fetchProfile', {
      id: params.id
    })
      .then(() => store.dispatch('interestedArticles/fetchInterestedArticles'))
  },
  data() {
    return {
      isList: true,
      isPopular: false,
      searchQuery: '',
      dummyAuthors: [
        {
          publicationDate: new Date(),
          title: 'Владимир Владимирович',
          author: 'Владимирович',
          id: 1
        },
        {
          publicationDate: new Date(),
          title: 'Много Много',
          author: 'Подливы',
          id: 2
        },
        {
          publicationDate: new Date(),
          title: 'Владимирович Путин',
          author: 'Владимир',
          id: 3
        }
      ]
    }
  },
  created() {
    this.debouncedSearch = debounce(this.getSearchResults, SEARCH_INTERVAL)
  },
  computed: {
    ...mapGetters({
      articles: 'categoryPage/articles',
      interested: 'interestedArticles/articles',
      nextPage: 'categoryPage/nextPage'
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

      return this.$store.dispatch('categoryPage/fetchCategory', {
        page: 1,
        perPage: this.perPage,
        isSortByPopular: this.isPopular,
        category: this.currentCategory
      })
    },

    sortByDate() {
      this.searchQuery = ''
      if (this.isPopular) {
        this.isPopular = false

        return this.$store.dispatch('categoryPage/fetchCategory', {
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

        return this.$store.dispatch('categoryPage/fetchCategory', {
          page: 1,
          perPage: this.perPage,
          isSortByPopular: this.isPopular,
          category: this.currentCategory
        })
      }
    },

    getNextPage() {
      return this.$store.dispatch('categoryPage/fetchNextPage', {
        page: this.nextPage,
        perPage: this.perPage,
        category: this.currentCategory,
        isSortByPopular: this.isPopular,
        query: this.searchQuery === '' ? null : this.searchQuery
      })
    },

    getSearchResults() {
      return this.$store.dispatch('categoryPage/fetchCategory', {
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
.icon {
  width: 16px;
  height: 16px;

  &-grid {
    background: url('~/assets/images/grid-icon.svg') no-repeat center / contain;
  }

  &-list {
    background: url('~/assets/images/list-icon.svg') no-repeat center / contain;
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

.container {
  position: relative;
  z-index: 4;
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

.profile-info {
  margin-bottom: 54px;
}

.profile-img {
  position: relative;
  z-index: 2;

  min-height: 320px;
  background: url('~/assets/images/profile.jpg') no-repeat center / cover;
}

.avatar {
  position: absolute;
  left: 30px;
  top: -32px;
  width: 160px;
  height: 160px;

  background: url('~/assets/images/profile.jpg') no-repeat center / cover;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
}

.info {
  padding-top: 24px;
  padding-left: 184px;
}

.name {
  margin-bottom: 16px;

  font-size: 24px;
  font-weight: bold;
  color: #5B5B5B;
}

.social-items {
  position: relative;

  display: flex;
  flex-flow: row wrap;
  padding-bottom: 17px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;

    display: block;
    width: 120px;
    height: 1px;
    background: #AFB09A;
  }
}

.social {
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;

  &-youtube {
    background: url('~/assets/images/youtube.svg') no-repeat center / contain;
  }
  &-vk {
    background: url('~/assets/images/vk.svg') no-repeat center / contain;
  }
  &-telegram {
    background: url('~/assets/images/telegram.svg') no-repeat center / contain;
  }
  &-instagram {
    background: url('~/assets/images/instagram.svg') no-repeat center / contain;
  }
  &-twitter {
    background: url('~/assets/images/twitter.svg') no-repeat center / contain;
  }
  &-facebook {
    background: url('~/assets/images/facebook.svg') no-repeat center / contain;
  }

  &:not(:first-child) {
    margin-left: 10px;
  }
}

.about {
  display: flex;
  flex: 1 1 50%;
}

.about-text:nth-child(1) {
  padding-right: 40px;
}

.about-text:nth-child(2) {
  padding-left: 40px;
}

.autor-articles {
  margin-top: 60px;

  font-size: 24px;
}

@media (max-width: 1024px) {
  .promo-wrapper {
    display: none;
  }
}

@media(max-width: 768px) {
  .load-more-wrapper {
    margin-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #AFB09A;
  }

  .load-more {
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .interested-wrapper {
    padding-top: 16px;
    padding-bottom: 0;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border: 2px solid #FFFFFF;
    top: -16px;
  }

  .info {
    padding-top: 16px;
    padding-left: 112px;
  }

  .name {
    margin-bottom: 8px;
    font-size: 16px;
  }

  .social-items {
    padding-bottom: 8px;
  }
}
</style>
