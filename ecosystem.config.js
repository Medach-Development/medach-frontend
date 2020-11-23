module.exports = {
  apps : [
    {
      name: "nuxt",
      script: "./node_modules/nuxt/bin/nuxt-start",
      env: {
          "HOST": "142.93.13.232",
          "NODE_ENV": "production",
          "BASE_URL": 'https://medach.pro'
      }
    }
  ]
}

