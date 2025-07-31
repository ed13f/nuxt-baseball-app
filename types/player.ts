export interface Player {
    id: number
    name: string
    email:string
    age: string
    height: string
    weight: string
    createdAt: string
    updatedAt: string
  }
  
export  interface PlayerStoreState {
    managedTeams: Player[]
  }
  
export interface PlayerStoreActions {
    updatePlayer: (id: number, data: { name: string, email:string, age: number, height: string, weight: string }) => void
    deletePlayer: (id: number) => void
    createPlayer: (data:any) => void
    getAllPlayers: any
    getPlayerById: (id: number) => Promise<Player>
  }