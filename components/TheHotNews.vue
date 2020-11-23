<template lang="pug">
.wrapper
  nuxt-link.head(to="/categories/news")
    .title
      | Новости
    .flag-wrapper
      .flag-icon
      
  .inner
    nuxt-link.news-item(
      v-for="(item, id) in news"
      :key="item.id"
      :to="`/post/${item.id}`"
      v-if="id < 3"
    )
      .name
        | {{ item.title }}
      .date
        | {{ formatDate(item.publicationDate) }}
</template>

<script>
import distanceInWords from 'date-fns/distance_in_words'
import ru from 'date-fns/locale/ru'
import { format } from 'date-fns'

export default {
  name: 'TheHotNews',
  props: {
    news: Array
  },
  methods: {
    formatDate(date) {
      return format(date, 'D MMMM YYYY', { locale: ru })
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  background: rgba(91,91,91,0.8);
  height: 100%;
  padding: 40px 0;
}

.head {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding-left: 40px;
  padding-bottom: 40px;
  cursor: pointer;
}

.title {
  font-size: 24px;
  color: #AFB09A;
  letter-spacing: 0;
}

.flag-wrapper {
  display: flex;
}

.flag-icon {
  width: 36px;
  height: 29px;
  background: url('~assets/images/news-flag.svg') no-repeat center / contain;
}

.inner {
  padding: 0 40px;
}

.news-item {
  padding: 40px 0;
  display: block;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(151,151,151,0.4);
  }

  &:first-child {
    padding-top: 0;
  }
}

.name {
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0;
  line-height: 22px;
  font-weight: 600;
}

.date {
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: 0;
  margin-top: 25px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .wrapper {
    background: #ffffff;
  }

  .inner {
    padding: 0 32px;
    background: #FDFDFD;
    box-shadow: 0 2px 2px 0 rgba(219,219,219,0.50);
    border-radius: 8px;
  }

  .news-item {
    padding: 12px 0;
  }

  .head {
    padding-left: 32px;
    margin-bottom: 4px;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #5B5B5B;
  }

  .name {
    font-size: 14px;
    color: #5B5B5B;
  }

  .date {
    margin-top: 8px;

    font-size: 12px;
    color: #A3A3A3;
  }

  .flag {
    width: 20px;
    height: 16px;
  }

}
</style>
