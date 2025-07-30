<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useTeams} from '../../../composables/teamsData'
  import { useTeamStore } from '../../../stores/team'
  import type { Team } from '../../../types/teams'

  const { getAllTeams, deleteTeam } = useTeams()

  const teams = ref<Team[]>([])

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

</script>

<template>
  <ul class="menu bg-base-200 w-56 rounded-box">
    <li v-for="team in teams" :key="team.id">
      {{ team.name }} <button @click="removeTeam(team.id)">Remove team</button>
    </li>
  </ul>
</template>