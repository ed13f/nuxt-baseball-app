import { db, players } from '../../db'

export default defineEventHandler(async () => {
  const allPlayers = await db.select().from(players)
  return allPlayers
})