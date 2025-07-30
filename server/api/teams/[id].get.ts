import { db, teams } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!

  const team = await db.select().from(teams).where(eq(teams.id, Number(id))).get()

  if (!team) {
    throw createError({
      statusCode: 404,
      message: `Team with id ${id} not found.`,
    })
  }

  return team
})