import { db, players } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  
  const body = await readBody<{ name: string; email: string; age: number, height:string, weight:string}>(event)

  if (!body.name || !body.email || !body.age) {
    throw createError({ statusCode: 400, message: 'All fields are required.' })
  }

  const existing = await db.select().from(players).where(eq(players.email, body.email)).get()
  if (existing) {
    throw createError({ statusCode: 409, message: 'Player with this email already exists.' })
  }

  const now = new Date()

  const inserted = await db.insert(players).values({
    ...body,
    createdAt: now,
    updatedAt: now,
  }).returning().get()
  return inserted
})
