import { db, gamePlayers } from '../../../server/db'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { playerId, gameId, teamId, positionId } = body

  if (!playerId || !gameId || !teamId || positionId === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields: playerId, gameId, teamId, positionId',
    })
  }

  try {
    const now = new Date()

    const updated = await db
      .update(gamePlayers)
      .set({
        positionId,
        updatedAt: now,
      })
      .where(
        and(
          eq(gamePlayers.playerId, playerId),
          eq(gamePlayers.gameId, gameId),
          eq(gamePlayers.teamId, teamId)
        )
      )
      .returning()
      .get()
    return {
      success: true,
      updated,
    }
  } catch (err) {
    console.error('[game-players/update-position] Error:', err)
    throw createError({
      statusCode: 500,
      message: 'Failed to update player position',
    })
  }
})
