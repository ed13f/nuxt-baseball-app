import { Team } from './types/teams'

export type Game = {
    id: number
    date: number // timestamp
    homeTeamId: number
    awayTeamId: number
    location: string
    createdAt: number
    updatedAt: number
  }


  export  interface GameStoreState {
    games: Game[]
    homeTeam: Team
    }
    
  export interface GameStoreActions {
    getGameById(id: number)
    setHomeTeamById:(id: number)
    getHomePlayersRoster(id: number)
    getAwayPlayersRoster(id: number)
  }
  