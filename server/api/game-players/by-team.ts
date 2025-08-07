import { db, gamePlayers, players } from '../../db'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const gameId = Number(body.gameId)
  const teamId = Number(body.teamId)

  if (isNaN(gameId) || isNaN(teamId)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid or missing gameId or teamId in body',
    })
  }

  const result = await db
    .select()
    .from(gamePlayers)
    .innerJoin(players, eq(gamePlayers.playerId, players.id))
    .where(and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.teamId, teamId)))
    .orderBy(gamePlayers.battingOrderNumber)

  return result.map((r) => r.players)
})