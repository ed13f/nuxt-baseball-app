import { db, gamePlayers } from '../../../server/db'
import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { playerId, gameId, teamId, newPositionId } = body

  if (!playerId || !gameId || !teamId || !newPositionId) {
    throw createError({
      statusCode: 400,
      message: 'Missing one or more required fields: playerId, gameId, teamId, newPositionId',
    })
  }

  try {
    const now = new Date()

    const updated = await db
      .update(gamePlayers)
      .set({
        battingOrderNumber: newPositionId,
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
    console.error('[game-players/update] Error:', err)
    throw createError({
      statusCode: 500,
      message: 'Failed to update player position',
    })
  }
})
