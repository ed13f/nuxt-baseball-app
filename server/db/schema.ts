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
    age: int().notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const teams = sqliteTable("teams", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updatedAt', { mode: 'timestamp' }).notNull(),
});