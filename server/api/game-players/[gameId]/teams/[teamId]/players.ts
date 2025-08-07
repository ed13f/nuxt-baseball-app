import { db, gamePlayers, players } from '../../../../../db'
import { eq, and } from 'drizzle-orm'
import { getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  const gameId = Number(getRouterParam(event, 'gameId'))
  const teamId = Number(getRouterParam(event, 'teamId'))

  if (isNaN(gameId) || isNaN(teamId)) {
    throw createError({ statusCode: 400, message: 'Invalid gameId or teamId' })
  }

  const result = await db
    .select({    // ← from join table
      id: players.id,                   // ↓ pick only the player fields you need
      name: players.name,
      email: players.email,
      primaryPositionId: gamePlayers.positionId,
      age: players.age,
      height: players.height,
      weight: players.weight,
    })
    .from(gamePlayers)
    .innerJoin(players, eq(gamePlayers.playerId, players.id))
    .where(and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.teamId, teamId)))
    .orderBy(gamePlayers.battingOrderNumber) // 👈 Add this line to sort
  return result
})
