<template lang="pug">
nuxt-link(:to="`/post/${id}`")
  article.card-wrapper(
    v-if="isBrowser"
    :style="{background: `url(${BASE_URL}${image}) no-repeat center / cover`}"
    :key="`media-card-${id}`"
  )
    .gradient
    .content
      .tags
        nuxt-link.tag(v-for="tag in tags" :key="`${id}-${tag}`" :to="`/search?query=${tag}`")
          | {{ tag }}
      .name
        | {{ name }}
</template>

<script>
export default {
  props: {
    name: String,
    tags: Array,
    image: String,
    id: [String, Number]
  },
  name: 'MediaCard',
  data() {
    return {
      BASE_URL: process.env.BASE_URL,
      isBrowser: process.browser
    }
  }
}
</script>

<style scoped lang="scss">
.card-wrapper {
  min-height: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  position: relative;
  padding: 40px;
  border-radius: 3px;
  overflow: hidden;
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

.content {
  z-index: 10;
}

.name {
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 0;
  line-height: 32px;
  font-weight: 600;
}

.tags {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  margin-bottom: 25px;
}

.tag {
  font-size: 12px;
  color: #7198BA;
  letter-spacing: 0;
  font-weight: 500;
  padding: 4px 8px;
  border: 1px solid #7198BA;
  border-radius: 3px;
  margin: 5px;
}

@media (max-width: 768px) {
  .card-wrapper {
    min-height: 80vw;
  }
}

@media (max-width: 580px) {
  .card-wrapper {
    padding-bottom: 12px;
    padding-left: 32px;
    padding-right: 32px;
  }

  .name {
    font-size: 14px;
    line-height: 24px;
  }

  .tags {
    margin-bottom: 8px;
  }

  .tags .tag {
    font-size: 12px;
    border-width: 1px;
  }

  .tag {
    &:not(:first-child) {
      margin-left: 5px;
    }
  }
}
</style>
