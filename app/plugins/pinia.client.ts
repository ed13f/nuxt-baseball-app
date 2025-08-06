import { defineNuxtPlugin } from '#app'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  const installPersistedState = createPersistedState()
  nuxtApp.$pinia.use(installPersistedState)
})
