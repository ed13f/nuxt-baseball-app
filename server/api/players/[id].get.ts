import { db, players } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!


  const players = await db.select().from(players).where(eq(players.id, Number(id))).get()

  if (!players) {
    throw createError({
      statusCode: 404,
      message: `Player with id ${id} not found.`,
    })
  }

  return players
})