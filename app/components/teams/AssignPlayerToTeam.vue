<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useTeamStore } from '../../../stores/team'
import { usePlayerStore } from '../../../stores/player'

const props = defineProps<{ teamId: number }>()

const teamStore = useTeamStore()
const playerStore = usePlayerStore()

const players = ref([])

const loadPlayers = async () => {
  try {
    players.value = await playerStore.getAllPlayers()
    await teamStore.getTeamPlayers(props.teamId)
  } catch (err: any) {
    console.error('Error loading players:', err?.data?.message || err)
  }
}

watch(() => props.teamId, loadPlayers, { immediate: true })

const teamPlayers = computed(() => teamStore.teamPlayers)

const isPlayerOnTeam = (playerId: number) => {
  return teamPlayers.value.some(player => player.id === playerId)
}

const togglePlayer = async (playerId: number) => {
  try {
    if (isPlayerOnTeam(playerId)) {
      await teamStore.removeTeamPlayer(props.teamId, playerId)
    } else {
      await teamStore.addTeamPlayer(props.teamId, playerId)
    }
    await teamStore.getTeamPlayers(props.teamId) // ensure store is updated
  } catch (err: any) {
    console.error('Toggle player failed:', err?.data?.message || err)
  }
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="player in players"
      :key="player.id"
      :class="[
        'card card-border w-96',
        isPlayerOnTeam(player.id) ? 'bg-gray-200' : 'bg-base-100'
      ]"
    >

      <PlayersFullInfoCard :player="player">
        <button class="btn btn-primary" @click="() => togglePlayer(player.id)">
          {{ isPlayerOnTeam(player.id) ? 'Remove Player' : 'Add Player' }}
        </button>
      </PlayersFullInfoCard>
    </div>
  </div>
</template>