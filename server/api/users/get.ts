import { db, users } from '../../db'

export default defineEventHandler(async () => {
  const allUsers = await db.select().from(users)
  return allUsers[0]
})