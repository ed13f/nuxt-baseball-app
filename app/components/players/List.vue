<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { usePlayerStore } from '../../../stores/player'
  import type { Player } from '../../../types/player'

  const { deletePlayer, getAllPlayers } = usePlayerStore()

  const players = ref([])
  const selectedPlayer = ref<Player | null>(null)

  const isUpdatePlayerDrawerOpen = ref(false)
  
  onMounted(async () => {
      try {
        players.value = await getAllPlayers()
      } catch (err: any) {
        err.value = err?.data?.message || 'Error getting players'
      }
  })

  const removePlayer = async (id: number) => {
    await deletePlayer(id)
    players.value = await getAllPlayers()
  }

  function openPlayerUpdateDrawer(player: Player) {
    selectedPlayer.value = player

    isUpdatePlayerDrawerOpen.value = true
  }

</script>

<template>
  <ul class="menu bg-base-200 w-56 rounded-box">
    <li v-for="player in players" :key="player.id">
      <div>{{ player.name }}</div> 
      <div className="flex">
        <button @click="openPlayerUpdateDrawer(player)" class="btn btn-accent">Edit Player</button>
        </div>
        <div className="flex">
        <button @click="removePlayer(player.id)">Remove player</button>
      </div>
    </li>
  </ul>
  <GlobalDrawer v-model="isUpdatePlayerDrawerOpen" #default="{ closeModal }">
       <PlayersForm :editingPlayer="selectedPlayer" :closeModal="closeModal"/>
  </GlobalDrawer>
</template>