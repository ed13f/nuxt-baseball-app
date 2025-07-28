// // import { db, users } from '@/server/db/client'
// import { db, users } from '../db'

// import { eq } from 'drizzle-orm'

// export default defineEventHandler(async (event) => {
//   const body = await readBody<{ email: string; password: string }>(event)

//   if (!body.email || !body.password) {
//     throw createError({ statusCode: 400, message: 'Email and password are required' })
//   }

//   // Example: check against database
//   const user = await db.select().from(users).where(eq(users.email, body.email)).get()

//   if (!user || user.password !== body.password) {
//     throw createError({ statusCode: 401, message: 'Invalid credentials' })
//   }

//   return {
//     user: {
//       name: user.name,
//       email: user.email,
//     },
//     token: 'mocked-token', // optional if using JWT or session
//   }
// })
