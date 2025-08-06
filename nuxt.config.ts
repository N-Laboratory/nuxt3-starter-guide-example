// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    ['@pinia/nuxt',
      {
        autoImports: [
          // imnpot defineStore
          'defineStore',
        ],
        // If you need to use vuex and pinia, add following option.
        // disableVuex: false ,
      },
    ],
    // delete '@nuxtjs/storybook' because it is not compatible with Storybook 9
    '@nuxt/eslint'],
  components: [
    { path: '~/components/', pathPrefix: false },
  ],
  srcDir: 'src/',
  compatibilityDate: '2024-11-10',
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
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
  // delete '@nuxtjs/storybook' because it is not compatible with Storybook 9
  // storybook: {
  //   host: 'http://localhost',
  //   port: 6006,
  // },
})
