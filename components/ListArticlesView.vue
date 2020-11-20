<template lang="pug">
section.articles-wrapper
  .article-wrapper(v-for="article in articles" :key="article.id")
    article-card(
      :name="article.title"
      :id="article.id"
      :image="article.cover_image ? article.cover_image.url : null "
      :publicationDate="article.publication_date"
      :author="article.author"
      :tags="article.tags"
      isMetaVisible
      isListCard
    )
</template>

<script>
import ArticleCard from '~/components/cards/ArticleCard'

export default {
  name: 'ListArticlesView',
  props: {
    articles: Array
  },
  components: {
    ArticleCard
  }
}
</script>

<style scoped lang="scss">
.article-wrapper {
  margin-top: 40px;
}

@media(max-width: 768px) {
  .article-wrapper {
    margin-top: 16px;
  }
}
</style>
