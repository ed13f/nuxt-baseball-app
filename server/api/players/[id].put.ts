import { db, players } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
  
    if (isNaN(id)) {
      throw createError({ statusCode: 400, message: 'Invalid ID' })
    }
  
    if (event.method !== 'PUT') {
      throw createError({ statusCode: 405, message: 'Method Not Allowed' })
    }
  
    const body = await readBody<{ name: string; email: string; primaryPositionId: number; age: number; height: string; weight: string  }>(event)
  
    if (!body.name) {
      throw createError({ statusCode: 400, message: 'Name is required' })
    }
  
    const updated = await db
      .update(players)
      .set({ name: body.name, email: body.email, primaryPositionId: body.primaryPositionId, age: body.age, height: body.height, weight: body.weight })
      .where(eq(players.id, id))
      .returning()
      .get()
    return updated
  })