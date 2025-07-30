import { db, teams } from '../../db'

export default defineEventHandler(async () => {
  const allTeams = await db.select().from(teams)
  return allTeams
})