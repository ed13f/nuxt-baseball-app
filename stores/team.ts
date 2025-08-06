import { defineStore } from 'pinia'
import type { Team, TeamStoreState, TeamStoreActions } from '../types/teams'

export const useTeamStore = defineStore<'team', TeamStoreState, {}, TeamStoreActions>('team', {
  state: (): TeamStoreState => ({
    selectedTeamId: null,
    allTeams: [] as Team[],
    teamPlayers: [] as Player[],
  }),
  actions: {
    async createTeam(data:any) {
      try {
        const newTeam = await $fetch('/api/teams/create', {
          method: 'POST',
          body: data,
      })
      const exists = this.allTeams.find(t => t.id === newTeam.id)
      if (!exists) {
        this.allTeams.push(newTeam)
      }
        return newTeam
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error getting teams')
      }
    },
    async getTeamById(id: number): Promise<Team> {
      try {
        const team = await $fetch<Team>(`/api/teams/${id}`)
    
        const existingIndex = this.allTeams.findIndex(t => t.id === id)
        const existingTeam = this.allTeams[existingIndex]
    
        // Only update if the team is missing or changed
        if (
          existingIndex === -1 ||
          JSON.stringify(existingTeam) !== JSON.stringify(team)
        ) {
          if (existingIndex !== -1) {
            this.allTeams[existingIndex] = team
          } else {
            this.allTeams.push(team)
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
        this.allTeams = teams
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
        const index = this.allTeams.findIndex(t => t.id === id)
        if (index !== -1) {
          this.allTeams[index] = team // ✅ replace the existing team
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
        this.allTeams = this.allTeams.filter(team => team.id !== id)
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error deleting team')
      }
    },
    async addTeamPlayer(teamId: number, playerId: number) {
      try {
        await $fetch('/api/teams/add-player', {
          method: 'POST',
          body: { teamId, playerId },
        })
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error stor function')
      }
    },
    async removeTeamPlayer(teamId: number, playerId: number) {
      try {
        await $fetch('/api/teams/remove-player', {
          method: 'DELETE',
          body: { teamId, playerId },
        })
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error removing player from team')
      }
    },
    async getTeamPlayers(teamId: number): Promise<Player[]> {
      try {
        const players = await $fetch<Player[]>(`/api/teams/${teamId}/players`)
        this.selectedTeamId = teamId
        this.teamPlayers = players
        return players
      } catch (err: any) {
        console.error('Failed to fetch players:', err)
        throw new Error(err?.data?.message || 'Failed to fetch players for team')
      }
    }
  },
  persist: true, 
})