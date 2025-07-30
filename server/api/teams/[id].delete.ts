import { db, teams } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid team ID' })
  }

  await db.delete(teams).where(eq(teams.id, id))
  return { success: true }
})