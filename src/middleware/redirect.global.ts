export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/' || (to.path === '/myPage' && from.path === '/myPage')) {
    return navigateTo('formScript')
  }
})
