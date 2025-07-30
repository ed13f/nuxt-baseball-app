import { db, teams } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
  
    if (isNaN(id)) {
      throw createError({ statusCode: 400, message: 'Invalid ID' })
    }
  
    if (event.method !== 'PUT') {
      throw createError({ statusCode: 405, message: 'Method Not Allowed' })
    }
  
    const body = await readBody<{ name: string }>(event)
  
    if (!body.name) {
      throw createError({ statusCode: 400, message: 'Name is required' })
    }
  
    const updated = await db
      .update(teams)
      .set({ name: body.name })
      .where(eq(teams.id, id))
      .returning()
      .get()
  
    return updated
  })