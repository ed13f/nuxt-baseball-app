import { db, teamPlayers } from '../../db'
import { eq, and  } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ teamId: number; playerId: number }>(event)
  if (!body.teamId || !body.playerId) {
    throw createError({ statusCode: 400, message: "Missing fields" })
  }

  
  const existing = await db.select()
  .from(teamPlayers)
  .where(
    and(
      eq(teamPlayers.teamId, body.teamId),
      eq(teamPlayers.playerId, body.playerId)
    )
  )
  .get()

  
if (existing) {
  throw createError({ statusCode: 409, message: "Player is already on this team" })
  return { success: true }
}

const now = new Date()

try{
  await db.insert(teamPlayers).values({
    teamId: body.teamId,
    playerId: body.playerId,
    createdAt: now,
    updatedAt: now,
  })
} catch (err: any) {
  throw new Error(err?.data?.message || 'Error getting teams')
}

  return { success: true }
})
