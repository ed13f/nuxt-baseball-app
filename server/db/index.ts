import { mkdirSync, existsSync } from 'fs'
import { dirname, resolve } from 'path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

// Get absolute path to DB file
const dbPath = resolve(process.env.DB_FILE_NAME || 'data/sqlite.db')
console.log('✅ Nuxt is using this DB:', dbPath)

// Ensure directory exists
const dbDir = dirname(dbPath)
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true })
}

// Now safely create the database
const sqlite = new Database(dbPath)
export const db = drizzle(sqlite, { schema })
export const { users } = schema
export const { players } = schema


