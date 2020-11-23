<template lang="pug">
article.wrapper
  .slider-section
    section.slider-wrapper
      the-slider(:slides="slides")
      the-mobile-slider(:slides="slides")
    aside.news-wrapper
      the-hot-news(:news="news")

  .container
    section.top-articles
      nuxt-link.article(
        v-for="article in topPosts"
        :to="`post/${article.id}`"
        :key="article.id"
        :style="{background: `url(${`https://medach.pro${article.coverImage.url}`}) no-repeat center / cover`}"
      )
        .gradient

        .content
          .tag
            span(v-if="article.tags[0] && article.tags[0] !== ''")
              | {{ article.tags[0] }}

          .name
            | {{article.title}}

    section.blogs-section
      the-blogs(:articles="blogs")

    section.middle-articles
      .article-wrapper(v-for="article in middlePosts" :key="article.id")
        media-card(
          :name="article.title"
          :tags="article.tags"
          :image="article.coverImage.url"
          :id="article.id"
        )

    section.promoted-articles
      .promoted-article(v-for="article in promotedPosts" :key="article.id")
        article-card(
          :name="article.title"
          :tags="article.tags"
          :image="article.coverImage.url"
          :id="article.id"
          :publicationDate="article.pubslish_on"
          :isBigCard="false"
        )

</template>

<script>
import TheSlider from '~/components/TheSlider'
import TheHotNews from '~/components/TheHotNews'
import TheBlogs from '~/components/TheBlogs'
import MediaCard from '~/components/cards/MediaCard'
import ArticleCard from '~/components/cards/ArticleCard'
import TheHeader from '~/components/TheHeader'
import TheMobileSlider from '~/components/TheMobileSlider'
import ScrollTop from '~/components/ScrollTop'

import { mapGetters } from 'vuex'

export default {
  components: {
    TheSlider,
    TheHotNews,
    TheBlogs,
    MediaCard,
    ArticleCard,
    TheHeader,
    TheMobileSlider,
    ScrollTop
  },

  async fetch({store}) {
    return await store.dispatch('mainPage/fetchMainPageConfig')
  },

  head() {
    return {
      title: 'Медач | Главная'
    }
  },

  data() {
    return {
      BASE_URL: process.env.BASE_URL
    }
  },

  computed: {
    ...mapGetters({
      slides: 'mainPage/slides',
      news: 'mainPage/news',
      topPosts: 'mainPage/topPosts',
      blogs: 'mainPage/blogs',
      middlePosts: 'mainPage/postsBottom',
      promotedPosts: 'mainPage/promoted'
    }),
  }
}
</script>

<style lang="scss">

   .mobile {
      display: none;
    }

  @media (max-width: 768px) {
    .desctop {
      display: none;
    }

    .mobile {
      display: block
    }
  }
</style>


<style scoped lang="scss">
.slider-section {
  position: relative;
}

.news-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 35%;
  height: 100%;
  z-index: 5;
}

.top-articles {
  display: flex;
  flex-flow: row nowrap;
  padding: 20px 0;
}

.article {
  flex: 1 1 50%;
  min-height: 250px;
  display: flex;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
  border-radius: 3px;
  overflow: hidden;

  &:not(:first-child) {
    margin-left: 20px;
  }
}

.content {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  justify-content: space-between;
  z-index: 10;
  padding: 25px;
}

.gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.90) 76%);
}

.name {
  font-size: 24px;
  color: #FFFFFF;
  line-height: 29px;
  font-weight: 600;
}

.tag {
  span {
    border: 1px solid #A3A3A3;
    border-radius: 3px;
    font-size: 12px;
    color: #EDEADC;
    letter-spacing: 0;
    display: inline-block;
    padding: 4px 8px;
  }
}

.middle-articles {
  display: flex;
  flex-flow: row wrap;
  margin-top: 20px;
}

.article-wrapper {
  flex: 1 1 calc(50% - 10px);
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);


  &:nth-child(2) {
    margin-left: 20px;
  }

  &:nth-child(3) {
    margin-top: 20px;
  }
}

.promoted-articles {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 40px;
  border-bottom: 1px solid #DBDBDB;
}

.promoted-article {
  flex: 1 1 33.3%;
  overflow: hidden;
  border-radius: 3px;

  &:nth-child(2) {
    margin: 0 20px;
  }
}

.subscribe-section {
  margin-top: 40px;
  padding-bottom: 40px;
}

.right {
  margin-left: 40px;
}

.inner {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  color: #7198BA;
  letter-spacing: 0;
  line-height: 31px;
  font-weight: 500;
  max-width: 181px;
}

.text {
  font-family: 'PTSerif', serif;
  font-size: 16px;
  color: #5B5B5B;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 16px;
}

.form {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
}

.input-wrapper {
  background: #F2F3EC;
  border-radius: 3px;
  padding: 17px 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  input {
    font-size: 24px;
    color: #5B5B5B;
    letter-spacing: 0;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    display: block;
    flex: 1 1 auto;
    outline: none;
    margin-left: 15px;
  }

  &::before {
    content: '';
    width: 24px;
    height: 19px;
    background: url('~assets/images/mail.svg') no-repeat center / contain;
  }
}

.send {
  width: 16px;
  height: 18px;
  cursor: pointer;
  background: url('~assets/images/send.svg') no-repeat center / contain;
}


@media (max-width: 1024px) {
  .promoted-articles {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 0;
    padding-right: 0;
  }

  .slider-section {
    display: flex;
    flex-flow: column nowrap;
  }

  .slider-wrapper {
    order: 2;
  }

  .news-wrapper {
    position: relative;
    order: 1;
    width: 100%;
  }

  .promoted-article {
    border-radius: 3px;
    &:nth-child(2) {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .top-articles {
    flex-flow: column nowrap;
  }

  .inner {
    flex-flow: column nowrap;
    padding-left: 32px;
    padding-right: 32px;
  }

  .left {
    margin-bottom: 16px;
  }

  .right {
    margin-left: 0;
  }

  .title {
    font-size: 16px;
    line-height: 19px;
  }

  .text {
    font-size: 14px;
    line-height: 20px;
  }

  .input-wrapper {
    padding: 8px 12px;

    input {
      font-size: 14px;
    }
  }

  .article {
    min-height: 80vw;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
    &:not(:first-child) {
      margin-left: 0;
    }
  }

  .middle-articles {
    flex-flow: column nowrap;
  }

  .article-wrapper:nth-child(2) {
    margin-left: 0;
  }

  .article-wrapper:not(:first-child) {
    margin-top: 16px;
  }
}

@media (max-width: 580px) {
  .content {
    padding-bottom: 12px;
    padding-left: 32px;
    padding-right: 32px;
  }

  .name {
    margin-top: 8px;

    font-size: 14px;
    line-height: 24px;
  }

  .content .tag {
    margin-top: auto;

    font-size: 12px;
    border-width: 1px;
  }
}
</style>

