import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { vi } from 'vitest'
import flushPromises from 'flush-promises'
import type { RouteLocationNormalized, NavigationGuard } from 'vue-router'

// stub defineNuxtRouteMiddleware
interface RedirectMiddleware {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
  ): ReturnType<NavigationGuard>
}
const stubMiddleWare = (middleware: RedirectMiddleware) => middleware
vi.stubGlobal('defineNuxtRouteMiddleware', stubMiddleWare)

// vee-validate setup
configure({
  generateMessage: localize({
    en,
  }),
})

// import vee-validate all rules
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})
