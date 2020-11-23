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
          .icon
            img(src="~/assets/images/podcasts.svg")
          .text
            | Слушайте наши подкасты на SoundCloud
      nuxt-link.button-wrapper(:to="`/categories/media/инфографика`")
        .flag
          h2
            | Инфографика
        .content
          .icon
            img(src="~/assets/images/infographic.svg")
          .text
            | Сложные схемы простым языком
      nuxt-link.button-wrapper(:to="`/categories/media/видео`")
        .flag
          h2
            | Видеоматериалы
        .content
          .icon
            img(src="~/assets/images/video.svg")
          .text
            | Смотрите наши видеолекции на YouTube

    .articles
      .article-wrapper(v-for="article in articles" :key="article.id")
        media-card(
          :name="article.title"
          :tags="article.tags"
          :image="article.cover_image.url"
          :id="article.id"
        )

  .load-more-wrapper
    .load-more(v-if="nextPage" @click="getNextPage")
      | Еще

  .container
    .interested-wrapper
      interested-articles(:articles="interested")
</template>

<script>
const PER_PAGE = 12

import MediaCard from '~/components/cards/MediaCard'
import interestedArticles from '~/components/InterestedArticles'
import ScrollTop from '~/components/ScrollTop'

import { mapGetters } from 'vuex'

export default {
  components: {
    MediaCard,
    interestedArticles,
    ScrollTop
  },

  async fetch({store}) {
    return store.dispatch('mediaPage/fetchMedia', {page: 1, perPage: PER_PAGE})
      .then(() => store.dispatch('interestedArticles/fetchInterestedArticles'))
  },

  computed: {
    ...mapGetters({
      articles: 'mediaPage/articles',
      nextPage: 'mediaPage/nextPage',
      interested: 'interestedArticles/articles'
    }),
  },

  data() {
    return {
      query: null
    }
  },

  head() {
    return {
      title: 'Медач | Медиа'
    }
  },

  methods: {
    getNextPage() {
      return this.$store.dispatch('mediaPage/fetchNextPage', {
        page: this.nextPage,
        perPage: PER_PAGE,
        query: this.query
      })
    },

    choose(tag) {
      this.query = tag;

      return this.$store.dispatch('mediaPage/fetchMedia', {
        page: 1,
        perPage: PER_PAGE,
        query: tag
      })
    }
  }
}
</script>

<style scoped lang="scss">
.articles {
  display: flex;
  flex-flow: row wrap;
}

.article-wrapper {
  flex: 1 1 auto;
  max-width: 49.26%;
  margin-top: 20px;

  &:nth-child(3n) {
    flex: 1 1 100%;
    max-width: initial;
  }

  &:nth-child(3n - 1) {
    margin-left: 1.46%;
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
  margin-top: 40px;
  padding-bottom: 40px;
}

.buttons {
  display: flex;
  flex-flow: row nowrap;
  margin-top: 24px;
}

.button-wrapper {
  background: #F2F3EC;
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
  border-radius: 3px;
  width: 33.3%;
  padding: 24px 0;
  cursor: pointer;
  min-height: 150px;

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

.icon {
  width: 40px;
  height: 40px;
}

.text {
  margin-left: 24px;
}

@media (max-width: 768px) {
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

  .article-wrapper {
    max-width: 100%;

    &:nth-child(3n - 1) {
      margin-left: 0;
    }
  }
}
</style>

