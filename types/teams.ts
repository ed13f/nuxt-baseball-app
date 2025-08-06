export interface Team {
    id: number
    name: string
    createdAt: string
    updatedAt: string
  }
  
export  interface TeamStoreState {
  allTeams: Team[],
  teamPlayers:Player[]

  }
  
export interface TeamStoreActions {
    updateTeam: (id: number, data: { name: string }) => void
    deleteTeam: (id: number) => void
    createTeam: (data:any) => void
    getAllTeams: any
    getTeamById: (id: number) => Promise<Team>
    addTeamPlayer: (teamId: number, playerId: number) => void
    removeTeamPlayer: (teamId: number, playerId: number) => void
    getTeamPlayersList: (teamId: number) =>  Promise<Player[]>
    getTeamPlayers: (teamId: number) =>  Promise<Player[]>
  }