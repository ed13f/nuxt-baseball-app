<script setup lang="ts">
    import { ref } from 'vue'
    import { $fetch } from 'ofetch'

    const name = ref('')
    const email = ref('')
    const age = ref<number | null>(null)
    const height = ref('')
    const weight = ref('')

    const success = ref(false)
    const error = ref<string | null>(null)

    const submit = async () => {
        error.value = null
        success.value = false
        
        try {
            await $fetch('/api/players/post', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                age: age.value,
                height: height.value,
                weight: weight.value,
            },
            })
            success.value = true
            
            name.value = ''
            email.value = ''
            age.value = null
            height.value = ''
            weight.value = ''
        } catch (err: any) {
            error.value = err?.data?.message || 'Error adding user'
        }
    }
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">Add a Player Profile</h1>
    <input
      v-model="name"
      class="input input-bordered w-full"
      placeholder="Name"
    />
    <input
      v-model="email"
      class="input input-bordered w-full"
      placeholder="Email"
    />
    <input
      v-model="age"
      type="number"
      class="input input-bordered w-full"
      placeholder="Age"
    />
    <input
      v-model="height"
      class="input input-bordered w-full"
      placeholder="Height"
    />
    <input
      v-model="weight"
      class="input input-bordered w-full"
      placeholder="Weight"
    />

    <button @click="submit" class="btn btn-primary w-full">Add Player</button>

    <p v-if="success" class="text-green-600">✅ Player added!</p>
    <p v-if="error" class="text-red-600">❌ {{ error }}</p>
  </div>
</template>
