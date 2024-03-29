import { getLongreadPost } from "~/utils/requests";

export const state = () => ({
  article: {},
  defaultLeftBanners: [],
  defaultTextBanners: [],
  defaultBannersLoaded: false
});

export const mutations = {
  setArticle(state, article) {
    state.article = article;
  },
  setDefaultBanners: (state, banners) => {
    state.defaultLeftBanners = banners.filter(elem => elem.position === "left");
    state.defaultTextBanners = banners.filter(
      elem => elem.position === "in_text"
    );
    state.defaultBannersLoaded = true;
  }
};

export const getters = {
  article: state => state.article,
  leftBanners(state) {
    const leftBanners = state.article.banners.filter(
      elem => elem.position === "left"
    );
    return leftBanners.length > 0 ? leftBanners : state.defaultLeftBanners;
  },
  inTextBanners(state) {
    const inTextBanners = state.article.banners.filter(
      elem => elem.position === "in_text"
    );
    return inTextBanners.length > 0 ? inTextBanners : state.defaultTextBanners;
  },
  hasDefaultBanners: state => (
    state.defaultLeftBanners.length ||
    state.defaultTextBanners
  ) && state.defaultBannersLoaded
};

export const actions = {
  async fetchArticle({ commit }, { id, type }) {
    const data = await getLongreadPost(id);
    commit("setArticle", data);
    return data;
  },

  async fetchDefaultBanners({ commit, getters }) {
    if (getters.hasDefaultBanners) return;

    const data = await getLongreadPost(2505);
    if (data && data.banners) commit("setDefaultBanners", data.banners);
  }
};
