<script setup lang="ts">
// import { useUserStore } from '/stores/user';
import { useUserStore } from '../../stores/user'

const user = useUserStore()

const handleLogin = () => {
  console.log('loggedIn');
  // @ts-ignore
  user.login('Alice1', 'alice@example.com')
}
</script>

<template>
  <ClientOnly>
    <div className="navbar bg-base-100 shadow-sm w-full">
      <div className="flex-1">
        <p v-if="user.isLoggedIn">Welcome, {{ user.name }}</p>
        <a v-if="!user.isLoggedIn" className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Link</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li>
          
          <li v-if="!user.isLoggedIn"><button @click="handleLogin">Log In</button></li>
        </ul>
      </div>

    </div>
  </ClientOnly>
</template>