import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import AllRules from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { vi } from 'vitest'
import flushPromises from 'flush-promises'
import { RouteLocationNormalized, NavigationGuard } from 'vue-router'

// stub defineNuxtRouteMiddleware
interface RedirectMiddleware {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
  ): ReturnType<NavigationGuard>;
}
const stubMiddleWare = (middleware: RedirectMiddleware) => middleware
vi.stubGlobal('defineNuxtRouteMiddleware', stubMiddleWare)

// vee-validate setup
configure({
  generateMessage: localize({
    en
  })
})

// import vee-validate all rules
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

// Call this method after you called fireEvent.
// After call this method, your fireEvent operation will apply to HTML.
export const waitPerfectly = async () => {
  await flushPromises()
  vi.runAllTimers()
  await flushPromises()
}
