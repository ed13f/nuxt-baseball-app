<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// import { useFieldPositionsStore } from '../../stores/fieldPositions'
// import { useGamePlayersStore } from '~/stores/gamePlayers'

import { useFieldPositionsStore } from '../../../stores/feildPositions'
import { useGameStore } from '../../../stores/game'

const props = defineProps<{
  player: {
    id: number
    name: string
    primaryPositionId: number | null
  }
  gameId: number
  teamId: number
}>()

const fieldStore = useFieldPositionsStore()
const gamePlayersStore = useGameStore()

const selectedPosition = ref<number | null>(props.player.primaryPositionId ?? null)

fieldStore.fetchPositions()
const fieldPositions = computed(() => fieldStore.positions)

watch(selectedPosition, async (newVal) => {
  if (newVal !== null) {
    gamePlayersStore.updatePlayerPosition({
      playerId: props.player.id,
      gameId: props.gameId,
      teamId: props.teamId,
      positionId: newVal,
    })
  }
})
</script>

<template>
  <div class="card bg-base-100 shadow-md p-4 space-y-3">
    <h3 class="text-lg font-bold">{{ player.name }}</h3>

    <label class="block text-sm font-medium">Primary Position</label>
    <select
      v-model="selectedPosition"
      class="select select-bordered w-full"
    >
      <option :value="null">None</option>
      <option
        v-for="pos in fieldPositions"
        :key="pos.id"
        :value="pos.id"
      >
        {{ pos.name }}
      </option>
    </select>
  </div>
</template>
