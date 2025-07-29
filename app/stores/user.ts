import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const isLoggedIn = ref(false)

  function login(n: string) {
    name.value = n
    isLoggedIn.value = true
  }

  function logout() {
    name.value = ''
    isLoggedIn.value = false
  }

  return { name, isLoggedIn, login, logout }
})

// // ⬇️ Register persistence outside the store definition (v4 syntax)
// useUserStore.persist = {
//   storage: persistedState.localStorage, // optional, defaults to localStorage
//   paths: ['name', 'isLoggedIn'],
// }
