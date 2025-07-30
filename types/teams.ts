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
    updateTeam: (id: number, data: { name: string }) => void
    deleteTeam: (id: number) => void
    createTeam: (data:any) => void
    getAllTeams: any
    getTeamById: (id: number) => Promise<Team>
  }