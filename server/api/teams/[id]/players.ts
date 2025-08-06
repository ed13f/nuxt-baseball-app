import { db, teamPlayers, players } from '../../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, 'id'))

  const result = await db
    .select()
    .from(teamPlayers)
    .innerJoin(players, eq(teamPlayers.playerId, players.id))
    .where(eq(teamPlayers.teamId, teamId))

  return result.map((r) => r.players)
})
