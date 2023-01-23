// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true
  }
})
