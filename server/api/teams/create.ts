import { db, teams } from '../../db'

export default defineEventHandler(async (event) => {
  
  const body = await readBody<{ name: string; }>(event)

  if (!body.name) {
    throw createError({ statusCode: 400, message: 'All fields are required.' })
  }

  const now = new Date()

  const inserted = await db.insert(teams).values({
    ...body,
    createdAt: now,
    updatedAt: now,
  }).returning().get()
  return inserted
})
