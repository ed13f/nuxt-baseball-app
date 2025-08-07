import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { Game, GameStoreState, GameStoreActions } from '../types/games'

export const useGameStore = defineStore<'game', GameStoreState, {}, GameStoreActions>('game', {
  state: (): GameStoreState => ({
    games: [] as Game[],
    selectedGame: null as Game,
    homeTeam: null as Team,
    awayTeam: null as Team,
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
        const game  = await $fetch<Game>(`/api/games/${id}`)
        this.selectedGame = game
        return game
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error fetching game')
      }
    },

    async setHomeTeamById(id: number) {
      try {
        const team  = await $fetch<Game>(`/api/teams/${id}`)
        this.homeTeam = team
        return team
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error fetching home Team')
      }
    },
    async setHomeTeamById(id: number) {
      try {
        const team  = await $fetch<Game>(`/api/teams/${id}`)
        this.homeTeam = team
        return team
      } catch (err: any) {
        throw new Error(err?.data?.message || 'Error fetching home Team')
      }
    },
    async getHomePlayersRoster(teamId: number): Promise<Player[]> {
      try {
        const players = await $fetch<Player[]>(`/api/teams/${teamId}/players`)
        return players
      } catch (err: any) {
        console.error('Failed to fetch players:', err)
        throw new Error(err?.data?.message || 'Failed to fetch players for team')
      }
    },
    async getAwayPlayersRoster(teamId: number): Promise<Player[]> {
      try {
        const players = await $fetch<Player[]>(`/api/teams/${teamId}/players`)
        return players
      } catch (err: any) {
        console.error('Failed to fetch players:', err)
        throw new Error(err?.data?.message || 'Failed to fetch players for team')
      }
    },

    async createGame(data: {
      date: number
      homeTeamId: number
      awayTeamId: number
      location: string
    }) {
      try {
        const newGame = await $fetch<Game>('/api/games/create', {
          method: 'POST',
          body: data,
        })
        const homeRoster = await this.getHomePlayersRoster(data.homeTeamId)
        const awayRoster = await this.getAwayPlayersRoster(data.awayTeamId)
        for (const [index, player] of homeRoster.entries()) {
          try {
            await $fetch('/api/game-players/create', {
              method: 'POST',
              body: {
                gameId: newGame.id,
                playerId: player.id,
                teamId: data.homeTeamId,
                positionId: player.primaryPositionId, 
                battingOrderNumber: index + 1, 
              },
            })
          } catch (err) {
            console.error(`Failed to add player ${player.id}`, err)
          }
        }
        for (const [index, player] of awayRoster.entries()) {
          try {
            await $fetch('/api/game-players/create', {
              method: 'POST',
              body: {
                gameId: newGame.id,
                playerId: player.id,
                teamId: data.awayTeamId,
                positionId: player.primaryPositionId,
                battingOrderNumber: index + 1,
              },
            })
          } catch (err) {
            console.error(`Failed to add player ${player.id}`, err)
          }
        }
        this.games.push(newGame)
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
