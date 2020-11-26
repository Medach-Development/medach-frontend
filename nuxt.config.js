const path = require('path')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Медач 2.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Medical Channel (www.medach.pro) – это портал для молодых врачей и студентов медицинских университетов, задачей которого является знакомство людей с достижениями современной медицины, обменом знаниями между участниками, а также выпуск материалов, облегчающих учебную и практическую деятельность.' },
      {
        hid: 'ogimage',
        property: 'og:image',
        content: 'https://medach.pro/android-chrome-512x512.png'
      }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32',  href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'msapplication-TileColor', content: '#da532c' }
    ],
    __dangerouslyDisableSanitizers: ["script"],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  env: {
    BASE_URL: process.env.BASE_URL
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    filenames: {
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[ext]',
    }
  },
  plugins: [
    { src: '~/plugins/vue-carousel', ssr: false },
    { src: '~/plugins/vue-the-mask', ssr: false }
  ],
  router: {
    middleware: 'redirects',
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'post-id',
        path: '/post/:id?',
        component: resolve(__dirname, 'pages/post/_id.vue')
      }, {
        name: 'news-post-id',
        path: '/news-post/:id?',
        component: resolve(__dirname, 'pages/post/_id.vue')
      }, {
        name: 'blog-post-id',
        path: '/blog-post/:id?',
        component: resolve(__dirname, 'pages/post/_id.vue')
      }, {
        name: 'article-post-id',
        path: '/articles/:id?',
        component: resolve(__dirname, 'pages/post/_id.vue')
      }, {
        name: 'media-post-id',
        path: '/media-post/:id?',
        component: resolve(__dirname, 'pages/post/_id.vue')
      }
      )
    }
  },

  modules: [
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '50175607',
        webvisor: true,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
      }
    ]
  ]
}
