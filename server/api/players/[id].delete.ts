import { db, players } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid Player ID' })
  }

  await db.delete(players).where(eq(players.id, id))
  return { success: true }
})