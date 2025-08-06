<script setup lang="ts">

import { computed, watch } from 'vue'
import { useTeamStore } from '../../../stores/team'

const props = defineProps<{ teamId: number }>()
const teamStore = useTeamStore()

const loadPlayers = async () => {
  if (props.teamId) {
    await teamStore.getTeamPlayers(props.teamId)
  }
}

watch(() => props.teamId, loadPlayers, { immediate: true })

const teamPlayers = computed(() => teamStore.teamPlayers)
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Team Players</h2>

    <div v-if="teamPlayers.length === 0">No players found.</div>

    <div
      v-for="player in teamPlayers"
      :key="player.id"
      class="card bg-base-100 shadow-md mb-4 w-96"
    >
      <PlayersFullInfoCard :player="player" />
    </div>
  </div>
</template>
