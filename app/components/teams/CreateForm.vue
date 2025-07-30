<script setup lang="ts">
    import { ref } from 'vue'
    import { $fetch } from 'ofetch'
    import { useTeamStore } from '../../../stores/team'

    const name = ref('')

    const success = ref(false)
    const error = ref<string | null>(null)

    const submit = async () => {
        error.value = null
        success.value = false
        
        try {
          const newTeam = await $fetch('/api/teams/create', {
                method: 'POST',
                body: {
                    name: name.value,
                },
            })
            success.value = true

            const teamStore = useTeamStore()
            // @ts-ignore
            teamStore.addTeam(newTeam)

            name.value = ''
        } catch (err: any) {
            error.value = err?.data?.message || 'Error adding user'
        }
    }
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">Add a Team</h1>
    <input
      v-model="name"
      class="input input-bordered w-full"
      placeholder="Name"
    />

    <button @click="submit" class="btn btn-primary w-full">Add Team</button>

    <p v-if="success" class="text-green-600">✅ Team added!</p>
    <p v-if="error" class="text-red-600">❌ {{ error }}</p>
  </div>
</template>
