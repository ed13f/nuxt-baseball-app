import { $fetch } from 'ofetch'
import type { Team } from '../types/teams'
import { useTeamStore } from '../stores/team'

export function useTeams() {
    const getAllTeams = async ():Promise<Team[]> => {
      try {
        // return await $fetch<Team[]>('/api/teams/get-all')
        const teams = await $fetch<Team[]>('/api/teams/get-all')
        const teamStore = useTeamStore()
        teamStore.managedTeams = teams
        return teams
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error getting teams')
      }
    }

    const deleteTeam = async (id: number) => {
        try {
          await $fetch(`/api/teams/${id}`, {
            method: 'DELETE'
          })
          const teamStore = useTeamStore()
          teamStore.removeTeam(id)
          teamStore.managedTeams = await getAllTeams()
        } catch (err: any) {
          throw new Error(err?.data?.message || 'Error deleting team')
        }
      }
  
    return {
      getAllTeams,
      deleteTeam
    }
  }