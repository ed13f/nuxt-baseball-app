import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { Game } from '../types/game'

export const useGameStore = defineStore('game', {
  state: () => ({
    games: [] as Game[],
  }),

  actions: {
    async getAllGames() {
      try {
        const res = await $fetch<Game[]>('/api/games')
        this.games = res
        return res
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error fetching games')
      }
    },

    async getGameById(id: number) {
      try {
        return await $fetch<Game>(`/api/games/${id}`)
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error fetching game')
      }
    },

    async createGame(data: {
      date: number
      homeTeamId: number
      awayTeamId: number
      location: string
    }) {
      try {
        console.log('Game made!!!!')
        const newGame = await $fetch<Game>('/api/games/create', {
          method: 'POST',
          body: data,
        })
        this.games.push(newGame)
        // router.push(`/games/${newGame.id}`)
        return newGame
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error creating game')
      }
    },

    async updateGame(id: number, data: {
      date: number
      homeTeamId: number
      awayTeamId: number
      location: string
    }) {
      try {
        const updatedGame = await $fetch<Game>(`/api/games/${id}`, {
          method: 'PUT',
          body: data,
        })

        const index = this.games.findIndex((g) => g.id === id)
        if (index !== -1) this.games[index] = updatedGame

        return updatedGame
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error updating game')
      }
    },

    async deleteGame(id: number) {
      try {
        await $fetch(`/api/games/${id}`, { method: 'DELETE' })
        this.games = this.games.filter((g) => g.id !== id)
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error deleting game')
      }
    },
  },
})
