import { db, teamPlayers } from '../../db'
import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    
  const body = await readBody<{ teamId: number; playerId: number }>(event)

  if (!body.teamId || !body.playerId) {
    throw createError({ statusCode: 400, message: "Missing teamId or playerId" })
  }

  await db.delete(teamPlayers).where(
    and(
      eq(teamPlayers.teamId, body.teamId),
      eq(teamPlayers.playerId, body.playerId)
    )
  )

  return { success: true }
})
