<template lang="pug">
section.articles-wrapper(v-if="articles.length > 0")
  .article-wrapper(v-for="article in articles" :key="article.id")
    article-card(
      :name="article.title"
      :id="article.id"
      :image="article.cover_image.url"
      :publicationDate="article.publication_date"
      :tags="article.tags"
      :author="article.author"
      isGridCard
      isMetaVisible
    )
</template>

<script>
import ArticleCard from '~/components/cards/ArticleCard'

export default {
  name: 'GridArticlesView',
  props: {
    articles: Array
  },
  components: {
    ArticleCard
  }
}
</script>

<style scoped lang="scss">
.articles-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin-top: 40px;
}

.article-wrapper {
  width: calc(33.33% - 14px);
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
  overflow: hidden;
  border-radius: 3px;

  &:nth-child(3n - 1) {
    margin: 0 20px;
  }

  &:nth-child(n + 4) {
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .article-wrapper {
    width: 100%;
    margin-bottom: 16px;

    &:nth-child(3n - 1) {
      margin-bottom: 16px;
      margin-left: 0;
      margin-right: 0;
    }

    &:nth-child(n + 4) {
      margin-top: 0;
    }
  }

  .tags {
    margin-top: 16px;
  }

  .tag {
    margin-top: 4px;
  }
}
</style>
