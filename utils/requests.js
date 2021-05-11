import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://medach.pro",
  baseURL: 'http://localhost:3000',
  timeout: 50000,
  headers: {},
  withCredentials: false
});

const simpleRequest = (url, method, data, headers) => {
  const requestObj = {
    url,
    method,
    data,
    headers: {
      ...headers
    }
  };

  return axiosInstance.request(requestObj);
};

const get = (url, params = {}, headers = {}) => {
  const requestObj = {
    url,
    method: "get",
    params: {
      ...params
    },
    headers: {
      ...headers
    }
  };

  return axiosInstance.request(requestObj);
};

const post = (url, data, headers = {}) => {
  console.log(url, data);
  return simpleRequest(url, "post", data, headers);
};

export const getMainPageConfig = () => {
  return get(`/api/main_page_config`)
    .then(response => response.data)
    .catch(error => console.log("mainPageConfig request error", error));
};

export const getBlogs = (page, per_page, isSortByPopular, query) => {
  return get(`/api/blogs`, {
    page,
    per_page,
    "sort[col]": isSortByPopular ? "impressions_count" : "publish_on",
    query
  })
    .then(response => response.data)
    .catch(error => console.log("getBlogsInOrder error", error));
};

export const getNews = (page, per_page, isSortByPopular, query) => {
  return get(`/api/news`, {
    page,
    per_page,
    "sort[col]": isSortByPopular ? "impressions_count" : "publish_on",
    query
  })
    .then(response => response.data)
    .catch(error => console.log("getNews error", error));
};

export const getMedia = (page, per_page, isSortByPopular, query) => {
  return get(`/api/media`, {
    page,
    per_page,
    "sort[col]": isSortByPopular ? "impressions_count" : "publish_on",
    query
  })
    .then(response => response.data)
    .catch(error => console.log("getMedia error", error));
};

export const getLongreadArticles = (page, per_page, isSortByPopular, query) => {
  return get(`/api/longread_articles`, {
    page,
    per_page,
    "sort[col]": isSortByPopular ? "impressions_count" : "publish_on",
    query
  })
    .then(response => response.data)
    .catch(error => console.log("get articles error", error));
};

export const getCasesArticles = (page, per_page, isSortByPopular, query) => {
  return get(`/api/cases`, {
    page,
    per_page,
    "sort[col]": isSortByPopular ? "impressions_count" : "publish_on",
    query
  })
    .then(response => response.data)
    .catch(error => console.log("get articles error", error));
};

export const getLongreadPost = id => {
  return get(`/api/articles/${id}`)
    .then(response => response.data)
    .catch(error => console.log("getPost error", error));
};

export const getBloggersList = (page, per_page) => {
  return get(`/api/users/bloggers`, {
    page,
    per_page
  })
    .then(response => response.data)
    .catch(error => console.log("getBloggerList error", error));
};

export const getBlogPost = id => {
  console.log("get post", id);
  return get(`/api/blogs/${id}`)
    .then(response => response.data)
    .catch(error => console.log("getPost error", error));
};

export const getNewsPost = id => {
  return get(`/api/news/${id}`)
    .then(response => response.data)
    .catch(error => console.log("getNewsPost error", error));
};

export const getMediaPost = id => {
  return get(`/api/media/${id}`)
    .then(response => response.data)
    .catch(error => console.log("getMediaPost error", error));
};

export const getPostsByTag = (tag, page, per_page, isSortByPopular, query) => {
  return get(`/api/all_articles`, {
    tag,
    page,
    per_page,
    "sort[col]": isSortByPopular ? "impressions_count" : "publish_on",
    query
  })
    .then(response => response.data)
    .catch(error => console.log("get posts by tag error", error));
};

export const getInterestedArticles = () => {
  return get(`/api/articles/show_random`)
    .then(response => response.data)
    .catch(error => console.log("getInterestedArticles error", error));
};

export const getRelatedArticles = id => {
  return get(`/api/articles/${id}/show_related`)
    .then(response => response.data)
    .catch(error => console.log("getRelatedArticles error", error));
};

export const searchRequest = (page, per_page, query) => {
  return get(`/api/all_articles`, {
    query,
    page,
    per_page
  })
    .then(response => response.data)
    .catch(error => console.log("searchRequest error", error));
};

export const getUserProfile = id => {
  return get(`/api/users/${id}`)
    .then(response => response.data)
    .catch(error => console.log("getUserProfile error", error));
};

export const getUserBlogs = (id, page, per_page, isSortByPopular, query) => {
  return get(`/api/users/${id}/blogs`, {
    page,
    per_page,
    "sort[col]": isSortByPopular ? "impressions_count" : "publish_on",
    query
  })
    .then(response => response.data)
    .catch(error => console.log("getUserBlogs error", error));
};

export const postMistakeArticle = (id, text, comment) => {
  return post(`api/articles/${id}/add_typo`, {
    typo_text: text,
    commentary: comment
  })
    .then(data => data)
    .catch(err => console.log("postMistakeArticle", err));
};

export const getVacancies = (page, per_page) => {
  return get("/api/vacancies", {
    page,
    per_page
  })
    .then(response => response.data)
    .catch(error => console.log("getVacancies error", error));
};

export const getVacancy = id => {
  return get(`/api/vacancies/${id}`)
    .then(response => response.data)
    .catch(error => console.log("getVacancy error", error));
};

export const postSubscribe = email => {
  return post(`/api/vacancies/subscribe`, {
    email
  });
};
