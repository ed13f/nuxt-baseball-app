import { defineStore } from 'pinia'
import type { Team, TeamStoreState, TeamStoreActions } from '../types/teams'

export const useTeamStore = defineStore<'team', TeamStoreState, {}, TeamStoreActions>('team', {
  state: (): TeamStoreState => ({
    managedTeams: [] as Team[],
  }),
  actions: {
    async createTeam(data:any) {
      try {
        const newTeam = await $fetch('/api/teams/create', {
          method: 'POST',
          body: data,
      })
      const exists = this.managedTeams.find(t => t.id === newTeam.id)
      if (!exists) {
        this.managedTeams.push(newTeam)
      }
        return newTeam
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error getting teams')
      }
    },
    async getTeamById(id: number): Promise<Team> {
      try {
        const team = await $fetch<Team>(`/api/teams/${id}`)
    
        const existingIndex = this.managedTeams.findIndex(t => t.id === id)
        const existingTeam = this.managedTeams[existingIndex]
    
        // Only update if the team is missing or changed
        if (
          existingIndex === -1 ||
          JSON.stringify(existingTeam) !== JSON.stringify(team)
        ) {
          if (existingIndex !== -1) {
            this.managedTeams[existingIndex] = team
          } else {
            this.managedTeams.push(team)
          }
        }
    
        return team
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error fetching team')
      }
    },
    async getAllTeams() {
      try {
        const teams = await $fetch<Team[]>('/api/teams/get-all')
        this.managedTeams = teams
        return teams
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error getting teams')
      }
    },
    async updateTeam(id: number, data: { name: string }) {
      try {
        const team = await $fetch(`/api/teams/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.managedTeams.findIndex(t => t.id === id)
        if (index !== -1) {
          this.managedTeams[index] = team // ✅ replace the existing team
        } 
        } catch (err: any) {
          throw new Error(err?.data?.message || 'Error getting teams')
        }
    },
    async deleteTeam(id: number){
      try {
        await $fetch(`/api/teams/${id}`, {
          method: 'DELETE'
        })
        this.managedTeams = this.managedTeams.filter(team => team.id !== id)
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error deleting team')
      }
    }
  },
  persist: true, 
})