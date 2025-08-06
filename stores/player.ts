import { defineStore } from 'pinia'
import type { Player, PlayerStoreState, PlayerStoreActions } from '../types/player'

export const usePlayerStore = defineStore<'player', PlayerStoreState, {}, PlayerStoreActions>('player', {
  state: (): PlayerStoreState => ({
    players: [] as Player[],
  }),
  actions: {
    async createPlayer(data:Player) {
      try {
        const newPlayer = await $fetch('/api/players/create', {
          method: 'POST',
          body: data,
      })
      const exists = this.players.find(t => t.id === newPlayer.id)
      if (!exists) {
        this.players.push(newPlayer)
      }
        return newPlayer
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error getting players')
      }
    },
    async getPlayerById(id: number): Promise<Player> {
      try {
        const player = await $fetch<Player>(`/api/players/${id}`)
    
        const existingIndex = this.players.findIndex(t => t.id === id)
        const existingPlayer = this.players[existingIndex]
    
        // Only update if the player is missing or changed
        if (
          existingIndex === -1 ||
          JSON.stringify(existingPlayer) !== JSON.stringify(player)
        ) {
          if (existingIndex !== -1) {
            this.players[existingIndex] = player
          } else {
            this.players.push(player)
          }
        }
    
        return player
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error fetching player')
      }
    },
    async getAllPlayers() {
      try {
        const players = await $fetch<Player[]>('/api/players/get-all')
        this.players = players
        return players
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error getting players')
      }
    },
    async updatePlayer(id: number, data: { name: string, email: string, age: number, height: string, weight: string }) {
      try {
        const player = await $fetch(`/api/players/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.players.findIndex(t => t.id === id)
        if (index !== -1) {
          this.players[index] = player // ✅ replace the existing player
        } 
        } catch (err: any) {
          throw new Error(err?.data?.message || 'Error getting players')
        }
    },
    async deletePlayer(id: number){
      try {
        await $fetch(`/api/players/${id}`, {
          method: 'DELETE'
        })
        this.players = this.players.filter(player => player.id !== id)
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error deleting player')
      }
    }
  },
  persist: true, 
})