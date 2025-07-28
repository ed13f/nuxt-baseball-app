import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { name: string; email: string },
    token: null as null | string,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const res = await $fetch('/api/login', {
          method: 'POST',
          body: { email, password },
        })

        this.user = res.user
        this.token = res.token // optional, if using JWTs
      } catch (error: any) {
        throw new Error(error.data?.message || 'Login failed')
      }
    },

    logout() {
      this.user = null
      this.token = null
    },
  },
})
