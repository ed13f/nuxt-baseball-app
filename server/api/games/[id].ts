import { db, games } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid game ID' })
  }

  if (method === 'GET') {
    const result = await db.select().from(games).where(eq(games.id, id))
    if (result.length === 0) {
      throw createError({ statusCode: 404, message: 'Game not found' })
    }
    return result[0]
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    const now = Math.floor(Date.now() / 1000)

    const updated = await db.update(games)
      .set({
        date: body.date,
        homeTeamId: body.homeTeamId,
        awayTeamId: body.awayTeamId,
        location: body.location,
        updatedAt: now,
      })
      .where(eq(games.id, id))
      .returning()

    return updated[0]
  }

  if (method === 'DELETE') {
    await db.delete(games).where(eq(games.id, id))
    return { success: true }
  }

  throw createError({ statusCode: 405, message: 'Method Not Allowed' })
})
