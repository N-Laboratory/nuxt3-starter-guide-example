import { type Preview, setup } from '@storybook/vue3'
import type { App } from 'vue'
import { createPinia } from 'pinia'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
// import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { initialize, mswLoader } from 'msw-storybook-addon'

const pinia = createPinia()
initialize({
  onUnhandledRequest: 'bypass',
})
setup((app: App) => {
  app.use(pinia)
})

configure({
  generateMessage: localize({ en }),
})

Object.entries(all).forEach(([name, rule]) => {
  // use all rules
  defineRule(name, rule)
})

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
