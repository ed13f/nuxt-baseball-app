<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTeamStore } from '../../../stores/team'

const route = useRoute()
const teamStore = useTeamStore()

const team = ref(null)

const isAddTeamPlayerFormOpen = ref(false)
function openTeamPlayerDrawer() {
  isAddTeamPlayerFormOpen.value = true
}

const isAddGameFormOpen = ref(false)
function openGameDrawer() {
  isAddGameFormOpen.value = true
}


 onMounted(async () => {
  const teamId = Number(route.params.id)
  team.value = await teamStore.getTeamById(teamId)
})
</script>

<template>
  <SectionsTwoColumnSidebar>
    <template #sidebar>
      <div v-if="team">
        <h1 class="text-2xl font-bold">{{ team.name }}</h1>
        <p>Created: {{ new Date(team.createdAt).toLocaleString() }}</p>
        <p>Updated: {{ new Date(team.updatedAt).toLocaleString() }}</p>
        <button @click="openTeamPlayerDrawer" class="btn btn-accent">Add Player to Team</button>
        <GlobalDrawer v-model="isAddTeamPlayerFormOpen" #default="{ closeModal }">
          <TeamsAssignPlayerToTeam :teamId="team.id" :closeModal="closeModal"/>
        </GlobalDrawer>

        <button @click="openGameDrawer" class="btn btn-accent">Start Game</button>
        <GlobalDrawer v-model="isAddGameFormOpen" #default="{ closeModal }">
          <GamesForm :teamId="team.id" :closeModal="closeModal"/>
        </GlobalDrawer>
        
      </div>
      <div v-else>
        <p>Team not found.</p>
      </div>
    </template>
    <template #main>
      <TeamsPlayersList v-if="team?.id" :teamId="team.id" />
    </template>
  </SectionsTwoColumnSidebar>
</template>