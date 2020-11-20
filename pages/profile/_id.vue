<template lang="pug">
.wrapper
  .profile-img(:style="{background: `url(${BASE_URL}${profile.user_profile ? profile.user_profile.cover_image.url : ''}) no-repeat center / cover`}")

  .container
    .profile-info
      .avatar(:style="{background: `url(${BASE_URL}${profile.user_profile ? profile.user_profile.avatar.url : ''}) no-repeat center/contain`} ")
      .info
        .name
          | {{ profile.full_name }}
        .social-items(v-if="profile.user_profile")
          a(:href="profile.user_profile.facebook_account" v-if="profile.user_profile.facebook_account" target="_blank").social.social-facebook
          a(:href="profile.user_profile.telegram_account" v-if="profile.user_profile.telegram_account" target="_blank").social.social-telegram
          a(:href="profile.user_profile.instagram_account" v-if="profile.user_profile.instagram_account" target="_blank").social.social-instagram
    .about
      .about-text
        | {{ profile.user_profile ? profile.user_profile.about : 'описание автора' }}
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
        profile-list-articles-view(v-if="isList" :articles="articles" :profile="profile" key="list-view")
        grid-articles-view(v-else :articles="articles" key="grid-view")
        .no-articles(v-if="articles.length === 0") Здесь ещё ничего нет, но вы можете найти много крутых штук на
          nuxt-link(to="/")
            | главной

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

const BASE_URL = process.env.BASE_URL

const SEARCH_INTERVAL = 300

import { debounce } from 'lodash'

import ProfileListArticlesView from '~/components/ProfileListArticlesView'
import GridArticlesView from '~/components/GridArticlesView'
import InterestedArticles from '~/components/InterestedArticles'
import ThePopularAuthors from '~/components/ThePopularAuthors'

import { mapGetters } from 'vuex'

export default {
  components: {
    ProfileListArticlesView,
    GridArticlesView,
    InterestedArticles,
    ThePopularAuthors,
  },
  fetch({store, params}) {
    return store.dispatch('profilePage/fetchProfile', {
      id: params.id
    })
      .then(() => store.dispatch('profilePage/fetchBlogs', {id: params.id}))
      .then(() => store.dispatch('interestedArticles/fetchInterestedArticles'))
  },
  data() {
    return {
      isList: true,
      isPopular: false,
      searchQuery: '',
      isAboutText: 'true',
      BASE_URL: BASE_URL,
    }
  },
  created() {
    this.debouncedSearch = debounce(this.getSearchResults, SEARCH_INTERVAL)
  },
  head() {
    return {
      title: `Медач | ${this.profile.full_name}`
    }
  },
  computed: {
    ...mapGetters({
      articles: 'profilePage/articles',
      interested: 'interestedArticles/articles',
      nextPage: 'profilePage/nextPage',
      profile: 'profilePage/profile'
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

      return this.$store.dispatch('profilePage/fetchBlogs', {
        id: this.currentCategory,
        page: 1,
        perPage: this.perPage,
        isSortByPopular: this.isPopular
      })
    },

    sortByDate() {
      this.searchQuery = ''
      if (this.isPopular) {
        this.isPopular = false

        return this.$store.dispatch('profilePage/fetchBlogs', {
          id: this.currentCategory,
          page: 1,
          perPage: this.perPage,
          isSortByPopular: this.isPopular
        })
      }
    },

    sortByPopular() {
      this.searchQuery = ''
      if (!this.isPopular) {
        this.isPopular = true

        return this.$store.dispatch('profilePage/fetchBlogs', {
          id: this.currentCategory,
          page: 1,
          perPage: this.perPage,
          isSortByPopular: this.isPopular
        })
      }
    },

    getNextPage() {
      return this.$store.dispatch('profilePage/fetchBlogs', {
        id: this.currentCategory,
        page: this.nextPage,
        perPage: this.perPage,
        isSortByPopular: this.isPopular,
        query: this.searchQuery === '' ? null : this.searchQuery
      })
    },

    getSearchResults() {
      return this.$store.dispatch('profilePage/fetchBlogs', {
        id: this.currentCategory,
        page: 1,
        perPage: this.perPage,
        isSortByPopular: this.isPopular,
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
        return this.$store.dispatch('profilePage/fetchBlogs', {
          id: this.currentCategory,
          page: 1,
          perPage: this.perPage,
          isSortByPopular: this.isPopular,
          query: this.searchQuery === '' ? null : this.searchQuery
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
  display: block;
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
  display: block;
  padding-left: 40px;
}

.autor-articles {
  margin-top: 60px;

  font-size: 24px;
}

.more {
  display: none;
  font-size: 16px;
  color: #7198BA;
}

@media (max-width: 1024px) {
  .promo-wrapper {
    display: none;
  }
}

@media(max-width: 768px) {
  .right {
    display: none;
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

  .about {
    flex-flow: column nowrap;
  }

  .more {
    display: block;
    margin-top: 16px;

    text-align: right;
  }

  .about-text:nth-child(1) {
    padding-right: 0;
    margin-bottom: 16px;
  }

  .about-text:nth-child(2) {
    padding-left: 0;
    display: none;
  }

  .about-text.visible {
    display: block;
  }

  .autor-articles {
    margin-top: 30px;
  }
}
</style>

