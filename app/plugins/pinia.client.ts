// plugins/pinia.client.ts
import { defineNuxtPlugin } from '#app'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  const installPersistedState = createPersistedState()
  // @ts-ignore
  nuxtApp.$pinia.use(installPersistedState)
})
