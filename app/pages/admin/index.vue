<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../../stores/user'
import { useTeamStore } from '../../../stores/team'

const user = useUserStore()
const { getTeamById } = useTeamStore()

const isAddTeamFormOpen = ref(false)
function openTeamDrawer() {
  isAddTeamFormOpen.value = true
}

const isAddPlayerFormOpen = ref(false)
function openPlayerDrawer() {
  isAddPlayerFormOpen.value = true
}
</script>

<template>
  <div v-if="!user.isLoggedIn">
  </div>
  <div v-if="user.isLoggedIn">
   <SectionsTwoColumnSidebar>
      <template #main>
        <h2>All Team List</h2>
        <TeamsList />

        <h2>All Players List</h2>
        <PlayersList />
        
      </template>
      <template #sidebar>
        <h1>{{ `${user.name}'s Profile Page` }}</h1>
        <button @click="openTeamDrawer" class="btn btn-accent">Create Team</button>
        <GlobalDrawer v-model="isAddTeamFormOpen" #default="{ closeModal }">
          <TeamsForm :closeModal="closeModal"/>
        </GlobalDrawer>
        <button @click="openPlayerDrawer" class="btn btn-accent">Create Player</button>
        <GlobalDrawer v-model="isAddPlayerFormOpen" #default="{ closeModal }">
          <PlayersForm :closeModal="closeModal" />
        </GlobalDrawer>
      </template>
    </SectionsTwoColumnSidebar>
  </div>
</template>