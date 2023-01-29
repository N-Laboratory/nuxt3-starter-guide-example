import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: { email: '', password: '' }
  }),
  actions: {
    setUserInfo (email: string, password: string) {
      this.user.email = email
      this.user.password = password
    }
  }
})
