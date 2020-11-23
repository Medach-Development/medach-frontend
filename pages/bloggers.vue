<template lang="pug">
.wrapper-1
  .list
    section.card-wrapper(v-for="blogger in bloggers" :key="blogger.id")
      the-blogger-card(:profile="blogger")

  .load-more-wrapper
    .load-more(v-if="nextPage" @click="getNextPage")
      | Еще
</template>

<script>
const BLOGGERS_PER_PAGE = 10

import InterestedArticles from '~/components/InterestedArticles'
import ThePopularAuthors from '~/components/ThePopularAuthors'
import TheBloggerCard from '~/components/TheBloggerCard'

import { mapGetters } from 'vuex'

export default {
  components: {
    InterestedArticles,
    ThePopularAuthors,
    TheBloggerCard
  },
  fetch({store}) {
    return store.dispatch('profilePage/fetchBloggers', {
      page: 1,
      perPage: BLOGGERS_PER_PAGE
    })
      .then(() => store.dispatch('interestedArticles/fetchInterestedArticles'))
  },
  data() {
    return {

    }
  },
  head() {
    return {
      title: 'Медач | Блоги'
    }
  },
  computed: {
    ...mapGetters({
      bloggers: 'profilePage/bloggers',
      interested: 'interestedArticles/articles',
      nextPage: 'profilePage/bloggersNextPage'
    }),
  },
  methods: {
    getNextPage() {
      return this.$store.dispatch('categoryPage/fetchNextBloggers', {
        perPage: BLOGGERS_PER_PAGE
      })
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  padding: 100px 0;
  max-width: 980px;
  margin: 0 auto;
  min-height: calc(100vh - 153px);
}

.card-wrapper {
  background: #F2F3EC;
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
  border-radius: 3px;
  padding: 15px;
  &:not(:first-child) {
    margin-top: 20px;
  }
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

.profile-img {
  min-height: 320px;
  background: url('~assets/images/profile.jpg') no-repeat center / cover;
}

@media(max-width: 768px) {
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
}
</style>

