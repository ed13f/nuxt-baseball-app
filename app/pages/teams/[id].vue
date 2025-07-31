<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTeamStore } from '../../../stores/team'

const route = useRoute()
const teamStore = useTeamStore()

const team = ref(null)

 onMounted(async () => {
  const route = useRoute()
  const teamId = Number(route.params.id)
  const teamStore = useTeamStore()
  team.value = await teamStore.getTeamById(teamId)
})
</script>

<template>
  <div v-if="team">
    <h1 class="text-2xl font-bold">{{ team.name }}</h1>
    <p>Created: {{ new Date(team.createdAt).toLocaleString() }}</p>
    <p>Updated: {{ new Date(team.updatedAt).toLocaleString() }}</p>
  </div>
  <div v-else>
    <p>Team not found.</p>
  </div>
</template>