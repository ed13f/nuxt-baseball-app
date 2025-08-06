import { db, games } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try{
    return await db.select().from(games)
  } catch {
    throw createError({ statusCode: 405, message: 'Method Not Allowed' })
  }
})
