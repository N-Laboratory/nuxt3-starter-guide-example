import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
// import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { all } from '@vee-validate/rules';
import { defineRule, configure } from 'vee-validate'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  configure({
    generateMessage: localize({
      en
    })
  })

  Object.entries(all).forEach(([name, rule]) => {
    // use all rules
    defineRule(name, rule)
  })
})
