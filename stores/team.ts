import { defineStore } from 'pinia'
import type { Team, TeamStoreState, TeamStoreActions } from '../types/teams'

export const useTeamStore = defineStore<'team', TeamStoreState, {}, TeamStoreActions>('team', {
  state: (): TeamStoreState => ({
    managedTeams: [] as Team[],
  }),
  actions: {
    removeTeam(id: number) {
      console.log('clicked')
      this.managedTeams = this.managedTeams.filter(team => team.id !== id)
    },
      addTeam(team:Team) {
        const exists = this.managedTeams.find(t => t.id === team.id)
        if (!exists) {
          this.managedTeams.push(team)
        }
      }
    },
  persist: true, 
})