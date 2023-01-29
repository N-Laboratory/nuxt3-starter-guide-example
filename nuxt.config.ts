// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true
  },
  modules: [
    ['@pinia/nuxt',
      {
        autoImports: [
          // defineStoreの自動インポート
          'defineStore'
        ]
        // If you need to use vuex and pinia, add following option.
        // disableVuex: false ,
      }
    ]
  ]
})
