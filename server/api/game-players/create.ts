import { db, gamePlayers } from '../../db'
import { int, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // const now = Math.floor(Date.now() / 1000) // UNIX timestamp

  const now = new Date()

  // Validate required fields
  const requiredFields = ['gameId', 'playerId', 'teamId', 'battingOrderNumber']
  for (const field of requiredFields) {
    if (body[field] === undefined) {
      throw createError({ statusCode: 400, message: `Missing field: ${field}` })
    }
  }

  try {
    const result = await db
      .insert(gamePlayers)
      .values({
        gameId: body.gameId,
        playerId: body.playerId,
        teamId: body.teamId,
        positionId: body.positionId || null, // Optional
        battingOrderNumber: body.battingOrderNumber,
        createdAt: now,
        updatedAt: now,
      })
      .returning()

    return result[0]
  } catch (error) {
    console.error('Error creating game player:', error)
    throw createError({ statusCode: 500, message: 'Failed to create game player' })
  }
})
