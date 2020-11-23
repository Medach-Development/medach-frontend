<template lang="pug">
.wrapper
  .title
    | Вам может быть интересно

  aside.inner
    .article-wrapper(v-for="article in articles" :key="article.id")
      article-card(
        :name="article.title"
        :id="article.id"
        :tags="article.tags"
        :image="article.cover_image.url"
      )
</template>

<script>
import ArticleCard from '~/components/cards/ArticleCard'

export default {
  name: 'InterestedArticles',
  props: {
    articles: Array
  },
  components: {
    ArticleCard
  }
}
</script>

<style scoped lang="scss">
.title {
  font-size: 24px;
  color: #5B5B5B;
  letter-spacing: 0;
  position: relative;
  text-align: center;
  padding-bottom: 8px;

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 80px;
    height: 1px;
    background: #AFB09A;
  }
}

.inner {
  margin-top: 25px;
  display: flex;
  flex-flow: row nowrap;
}

.article-wrapper {
  width: 33.3%;

  &:nth-child(2) {
    margin: 0 20px;
  }
}

@media (max-width: 768px) {
  .title {
    padding-left: 32px;
    font-size: 14px;
    font-weight: bold;
    text-align: left;

    &::after {
      left: 32px;
      transform: translateX(0);
    }
  }

  .article-wrapper {
    width: 100%;
    margin-bottom: 16px;

    &:nth-child(2) {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 16px;
    }
  }

  .inner {
    margin-top: 16px;
    flex-flow: column nowrap;
  }
}
</style>
