<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGameStore } from '../../../stores/game'
import type { Game } from '../../../types/games'
import type { Player } from '../../../types/player'

const props = defineProps<{ game: Game }>()
const gameStore = useGameStore()

const homePlayers = ref<Player[]>([])
const awayPlayers = ref<Player[]>([])

const loadRoster = async () => {
  if (props.game?.homeTeamId) {
    homePlayers.value = await gameStore.getHomePlayersRoster(props.game.homeTeamId)
    awayPlayers.value = await gameStore.getAwayPlayersRoster(props.game.awayTeamId)
  }
}

watch(() => props.game, loadRoster, { immediate: true })
</script>



<template>
  <SectionsTwoColumnsEven>
    <template #columnOne>
      <h2>Away Team</h2>
      <!-- Add similar logic for away players if needed -->
      <div>
        <h2 class="text-xl font-bold mb-4">Team Players</h2>

        <div v-if="awayPlayers.length === 0">No players found.</div>

        <div
          v-for="player in awayPlayers"
          :key="player.id"
          class="card bg-base-100 shadow-md mb-4 w-96"
        >
          <PlayersFullInfoCard :player="player" />
        </div>
      </div>
    </template>

    <template #columnTwo>
      <h2>Home Team</h2>

      <div>
        <h2 class="text-xl font-bold mb-4">Team Players</h2>

        <div v-if="homePlayers.length === 0">No players found.</div>

        <div
          v-for="player in homePlayers"
          :key="player.id"
          class="card bg-base-100 shadow-md mb-4 w-96"
        >
          <PlayersFullInfoCard :player="player" />
        </div>
      </div>
    </template>
  </SectionsTwoColumnsEven>
</template>

