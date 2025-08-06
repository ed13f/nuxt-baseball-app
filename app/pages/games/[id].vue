<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useTeamStore } from '../../../stores/team'
import { useGameStore } from '../../../stores/game'

const route = useRoute()
const gameStore = useGameStore()
const teamStore = useTeamStore()

const game = ref(null)
const error = ref<string | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const gameId = Number(route.params.id)

    // Fetch game details
    game.value = await gameStore.getGameById(gameId)

    // Optionally: preload teams if not already in store
    if (teamStore.allTeams.length === 0) {
      await teamStore.getAllTeams()
    }
  } catch (err: any) {
    error.value = err?.message || 'Error loading game'
  } finally {
    isLoading.value = false
  }
})

// Optional: Resolve team names from IDs
const getTeamName = (teamId: number) => {
  return teamStore.allTeams.find((t) => t.id === teamId)?.name || 'Unknown Team'
}
</script>

<template>
  <SectionsFullWidth>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <div v-if="isLoading">Loading game details...</div>
    <div v-else-if="error" class="text-red-600">❌ {{ error }}</div>
    <div v-else-if="game">
      <h1 class="text-3xl font-bold mb-4">Game Details</h1>

      <div class="bg-base-100 p-4 rounded-lg shadow-md space-y-2">
        <p><strong>Date:</strong> {{ new Date(game.date).toLocaleDateString() }}</p>
        <p><strong>Location:</strong> {{ game.location }}</p>
        <p><strong>Home Team:</strong> {{ getTeamName(game.homeTeamId) }}</p>
        <p><strong>Away Team:</strong> {{ getTeamName(game.awayTeamId) }}</p>
        <p class="text-sm text-gray-500">
          Created: {{ new Date(game.createdAt).toLocaleString() }} <br>
          Updated: {{ new Date(game.updatedAt).toLocaleString() }}
        </p>
      </div>
    </div>
    <div v-else>No game found.</div>
  </div>
</SectionsFullWidth>
<SectionsTwoColumnsEven>
    <template #columnOne>
      Away Team
    </template>
    <template #columnTwo>
      Home Team
    </template>
  </SectionsTwoColumnsEven>
</template>
