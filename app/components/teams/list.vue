<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useTeamStore } from '../../../stores/team'
  import type { Team } from '../../../types/teams'

  const { deleteTeam, getAllTeams } = useTeamStore()

  const teams = ref<Team[]>([])
  const selectedTeam = ref<Team | null>(null)

  const isUpdateTeamDrawerOpen = ref(false)
  

  onMounted(async () => {
      try {
        teams.value = await getAllTeams()
      } catch (err: any) {
        err.value = err?.data?.message || 'Error getting teams'
      }
  })

  const removeTeam = async (id: number) => {
    await deleteTeam(id)
    teams.value = await getAllTeams()
  }

  function openTeamUpdateDrawer(team: Team) {
    selectedTeam.value = team
    console.log(team)
    console.log('selectedTeam: ',selectedTeam.value);
    isUpdateTeamDrawerOpen.value = true
  }

</script>

<template>
  <ul class="menu bg-base-200 w-56 rounded-box">
    <li v-for="team in teams" :key="team.id">
      <div>{{ team.name }}</div> 
      <div className="flex">
        <button @click="openTeamUpdateDrawer(team)" class="btn btn-accent">Edit Team</button>
        </div>
        <div className="flex">
        <button @click="removeTeam(team.id)">Remove team</button>
      </div>
    </li>
  </ul>
  <Drawer v-model="isUpdateTeamDrawerOpen" #default="{ closeModal }">
       <TeamsForm :editingTeam="selectedTeam" :closeModal="closeModal"/>
  </Drawer>
</template>