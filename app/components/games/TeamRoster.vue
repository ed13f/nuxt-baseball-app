<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { $fetch } from 'ofetch'

import { useGameStore } from '../../../stores/game'
import type { Game } from '../../../types/games'
import type { Player } from '../../../types/player'

const props = defineProps<{ game: Game }>()
const gameStore = useGameStore()

const homePlayers = ref<Player[]>([])
const awayPlayers = ref<Player[]>([])

const loadRoster = async () => {
  if (props.game?.homeTeamId) {
    homePlayers.value = await gameStore.getHomePlayersRoster(props.game.id, props.game.homeTeamId)
    awayPlayers.value = await gameStore.getAwayPlayersRoster(props.game.id, props.game.awayTeamId)
  }
}

watch(() => props.game, loadRoster, { immediate: true })

const updateHomePlayerPositions = async () => {
  for (let i = 0; i < homePlayers.value.length; i++) {
    const player = homePlayers.value[i]
    await $fetch('/api/game-players/update', {
      method: 'POST',
      body: {
        gameId: props.game.id,
        teamId: props.game.homeTeamId,
        playerId: player.id,
        newPositionId: i + 1,
      },
    })
  }
}

const updateAwayPlayerPositions = async () => {
  for (let i = 0; i < awayPlayers.value.length; i++) {
    const player = awayPlayers.value[i]
    await $fetch('/api/game-players/update-player-position', {
      method: 'POST',
      body: {
        gameId: props.game.id,
        teamId: props.game.awayTeamId,
        playerId: player.id,
        newPositionId: i + 1,
      },
    })
  }
}
</script>

<template>
  <SectionsTwoColumnsEven>
    <!-- Away Team -->
    <template #columnOne>
      <h2 class="text-xl font-bold mb-4">Away Team (Draggable)</h2>

      <div v-if="awayPlayers.length === 0">No players found.</div>

      <draggable
        v-model="awayPlayers"
        item-key="id"
        @end="updateAwayPlayerPositions"
      >
        <template #item="{ element }">
          <div class="card bg-base-100 shadow-md mb-4 w-96" :key="element.id">
            <GamesRosterCard :player="element" :gameId="game.id" :teamId="props.game.awayTeamId" />
          </div>
        </template>
      </draggable>
    </template>

    <!-- Home Team -->
    <template #columnTwo>
      <h2 class="text-xl font-bold mb-4">Home Team (Draggable)</h2>

      <div v-if="homePlayers.length === 0">No players found.</div>

      <draggable
        v-model="homePlayers"
        item-key="id"
        @end="updateHomePlayerPositions"
      >
        <template #item="{ element }">
          <div class="card bg-base-100 shadow-md mb-4 w-96" :key="element.id">
            <GamesRosterCard :player="element"  :gameId="game.id" :teamId="props.game.homeTeamId" />
          </div>
        </template>
      </draggable>
    </template>
  </SectionsTwoColumnsEven>
</template>
