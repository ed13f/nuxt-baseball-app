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
const selectedTeam = ref(null)

onMounted(async () => {
  selectedTeam.value = await getTeamById(68)
  console.log('selectedTeam:', selectedTeam.value)
})
</script>

<template>
  <div v-if="!user.isLoggedIn">
    <AuthCreateUserForm />
  </div>
  <div v-if="user.isLoggedIn">
    <SectionsTwoColumnSidebar>
      <template #main>
        <TeamsList />
      </template>
      <template #sidebar>
        <h1>{{ user.name }}'s' Profile Page</h1>
        <h2 v-if="selectedTeam">Team: {{ selectedTeam.name }}</h2>
        <button @click="openTeamDrawer" class="btn btn-accent">Create Team</button>
        <Drawer v-model="isAddTeamFormOpen" #default="{ closeModal }">
          <TeamsForm :closeModal="closeModal"/>
        </Drawer>
        <button @click="openPlayerDrawer" class="btn btn-accent">Create Player</button>
        <Drawer v-model="isAddPlayerFormOpen">
            <PlayersProfileForm />
        </Drawer>
      </template>
    </SectionsTwoColumnSidebar>
  </div>
</template>