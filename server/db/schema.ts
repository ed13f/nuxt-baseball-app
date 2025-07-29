import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: int().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const players = sqliteTable("players", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull().unique(),
    age: int().notNull(),
    height: text().notNull(),
    weight: text().notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const teams = sqliteTable("teams", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updatedAt', { mode: 'timestamp' }).notNull(),
});

// Join Tables

export const usersToTeams = sqliteTable('users_to_teams', {
    userId: int('user_id').notNull().references(() => users.id),
    projectId: int('team_id').notNull().references(() => teams.id),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updatedAt', { mode: 'timestamp' }).notNull(),
})

export const playersToTeams = sqliteTable('players_to_teams', {
    userId: int('player_id').notNull().references(() => players.id),
    projectId: int('team_id').notNull().references(() => teams.id),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updatedAt', { mode: 'timestamp' }).notNull(),
})