// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  components: [
    { path: '~/components/', pathPrefix: false },
  ],
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  modules: [
    ['@pinia/nuxt',
      {
        autoImports: [
          // defineStoreの自動インポート
          'defineStore',
        ],
        // If you need to use vuex and pinia, add following option.
        // disableVuex: false ,
      },
    ],
    '@nuxt/eslint', '@nuxtjs/storybook'],
  storybook: {
    host: 'http://localhost',
    port: 6006,
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    },
  },
})
