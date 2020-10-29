import {
  getMedia,
  getPostsByTag
} from '~/utils/requests'

export const state = () => ({
  articles: [],
  nextPage: null
})

export const mutations = {
  setArticles(state, {articles, nextPage}) {
    state.articles = articles
    state.nextPage = nextPage
  },

  updateArticles(state, {articles, nextPage}) {
    state.articles = [...state.articles, ...articles]
    state.nextPage = nextPage
  }
}

export const getters = {
  articles: (store) => store.articles,
  nextPage: (store) => store.nextPage
}

export const actions = {
  fetchMedia({commit}, {page, perPage, isSortByPopular, query, category}) {
    if (!category) {
      return getMedia(page, perPage, isSortByPopular, query).then(data => {
        commit('setArticles', { articles: data.collection, nextPage: data.meta.nextPage })
      })
    }
    else {
      return getPostsByTag(category, page, perPage, isSortByPopular, query).then(data => {
        commit('setArticles', { articles: data.collection, nextPage: data.meta.nextPage })
      })
    }
    
  },

  fetchNextPage({commit, state}, {perPage, isSortByPopular, query}) {
    if (state.nextPage) {
      return getMedia(state.nextPage, perPage, isSortByPopular, query).then(data => {
        commit('updateArticles', { articles: data.collection, nextPage: data.meta.nextPage })
      })
    }
  }
}