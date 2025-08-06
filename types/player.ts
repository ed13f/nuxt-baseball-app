export interface Player {
    id: number
    name: string
    email:string
    primaryPositionId:number | null
    age: string
    height: string
    weight: string
    createdAt: string
    updatedAt: string
  }
  
export  interface PlayerStoreState {
  players: Player[]
  }
  
export interface PlayerStoreActions {
    updatePlayer: (id: number, data: { name: string, email:string, age: number, height: string, weight: string }) => void
    deletePlayer: (id: number) => void
    createPlayer: (data:any) => void
    getAllPlayers: () Promise<Player>[]
    getPlayerById: (id: number) => Promise<Player>
  }