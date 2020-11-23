<template lang="pug">
.wrapper
  .head
    .title
      | Популярное
  .inner
    nuxt-link.authors-item(
      :to="`/post/${item.id}`"
      v-for="item in articles",
      :key="item.id"
    )
      .name
        | {{ item.title }}
      .footer
        .author
          | {{ item.author }}
        .date
          | {{ formatDate(item.publication_date) }}
</template>

<script>
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

export default {
  name: 'ThePopularAuthors',
  props: {
    articles: Array
  },
  methods: {
    formatDate(date) {
      return format(date, 'D MMMM YYYY', { locale: ru });
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  background: #F2F3EC;
  height: 100%;
  padding: 24px 0;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
}

.head {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #fff;
}

.title {
  font-size: 24px;
  color: #5B5B5B;
  letter-spacing: 0;
}

.flag {
  width: 36px;
  height: 29px;
  background: url('~assets/images/news-flag.svg') no-repeat center / contain;
}

.inner {
  padding: 0 24px;
}

.footer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
}

.authors-item {
  padding: 24px 0;
  display: block;

  &:not(:last-child) {
    border-bottom: 1px solid #fff;
  }
}

.name {
  font-size: 16px;
  color: #5B5B5B;
  letter-spacing: 0;
  line-height: 22px;
}

.date {
  font-size: 12px;
  color: #A3A3A3;
  letter-spacing: 0;
  font-weight: 500;
  white-space: nowrap;
}

.author {
  font-size: 16px;
  color: #7198BA;
  letter-spacing: 0;
  font-weight: 500;
}
</style>
