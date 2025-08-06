import { db, fieldPositions } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  try {
    const positions = await db.select().from(fieldPositions).all()
    return positions
  } catch (err) {
    console.error('Failed to fetch field positions:', err)
    throw createError({ statusCode: 500, message: 'Failed to fetch field positions' })
  }
})