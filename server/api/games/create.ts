import { db, games } from '../../db'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const now = new Date()

    const inserted = await db.insert(games).values({
      date: now,
      homeTeamId: body.homeTeamId,
      awayTeamId: body.awayTeamId,
      location: body.location,
      createdAt: now,
      updatedAt: now,
    }).returning().get()
    return inserted
  } catch (err) {
    console.error('Insert error:', err)
    throw createError({ statusCode: 500, message: 'Failed to insert game' })
  }
})
