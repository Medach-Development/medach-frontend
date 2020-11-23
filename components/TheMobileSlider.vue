<template lang="pug">
  .wrapper.mobile
    .item(
      v-for="(slide, index) in slides",
      :key="slide.id",

    )
      nuxt-link.content(:to="`/post/${slide.id}`")
        .image(:style="{background: `url(${BASE_URL}${slide.coverImage.url}) no-repeat center / cover`}")
        article.item-wrapper
          .title
            | {{ slide.title }}
          .tags
            .tag(v-for="(tag, index) in slide.tags")
              | {{tag}}
</template>

<script>
  import format from 'date-fns/format'
  import ru from 'date-fns/locale/ru'

  export default {
    props: {
      slides: Array
    },

    methods: {
      formatDate(date) {
        return format(date, 'MMMM DD, YYYY', {locale: ru})
      }
    },
    data() {
      return {
        BASE_URL: process.env.BASE_URL
      }
    }
  }
</script>

<style scoped lang="scss">

  .wrapper {
    order: 2
  }

  .image {
    width: 100%;
    height: 64vw;
  }

  .item-wrapper {
    padding: 12px 32px;
  }

  .item {
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 2px 0 rgba(219, 219, 219, .5);
  }

  .title {
    margin-bottom: 8px;

    font-size: 14px;
  }

  .tags {
    max-width: 320px;
    width: 100%;
  }

  .tag {
      display: inline-block;
      font-weight: 500;
      font-size: 12px;
      color: #AFB09A;
      letter-spacing: 0;
      border: 1px solid #AFB09A;
      border-radius: 3px;
      padding: 4px 8px;
      margin-right: 4px;
      margin-top: 4px;
    }
</style>
