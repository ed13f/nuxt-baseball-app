export interface Team {
    id: number
    name: string
    createdAt: string
    updatedAt: string
  }
  
export  interface TeamStoreState {
    managedTeams: Team[]
  }
  
export interface TeamStoreActions {
    addTeam: (team: Team) => void
    removeTeam: (id: number) => void
  }