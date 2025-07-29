<script setup lang="ts">
    import { ref } from 'vue'
    import { $fetch } from 'ofetch'
    import { useUserStore } from '../../../stores/user'

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const age = ref<number | null>(null)

    const success = ref(false)
    const error = ref<string | null>(null)

    const submit = async () => {
        error.value = null
        success.value = false
        console.log('yeahhhh: ', name.value)
        
        try {
            await $fetch('/api/users/post', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                password: password.value,
                age: age.value,
            },
            })
            success.value = true

            const userStore = useUserStore()
            // @ts-ignore
            userStore.login(name.value, email.value)
            
            name.value = ''
            email.value = ''
            password.value = ''
            age.value = null
        } catch (err: any) {
            error.value = err?.data?.message || 'Error adding user'
        }
    }
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">Add a User</h1>
    <input
      v-model="name"
      class="input input-bordered w-full"
      placeholder="Name"
    />
    <input
      v-model="age"
      type="number"
      class="input input-bordered w-full"
      placeholder="Age"
    />
    <input
      v-model="email"
      class="input input-bordered w-full"
      placeholder="Email"
    />
    <input
      v-model="password"
      class="input input-bordered w-full"
      placeholder="Password"
    />

    <button @click="submit" class="btn btn-primary w-full">Add User</button>

    <p v-if="success" class="text-green-600">✅ User added!</p>
    <p v-if="error" class="text-red-600">❌ {{ error }}</p>
  </div>
</template>
