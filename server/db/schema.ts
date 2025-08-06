import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: int().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).notNull(),
});

export const players = sqliteTable("players", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull().unique(),
    primaryPositionId: int("position_id").references(() => fieldPositions.id),
    age: int().notNull(),
    height: text().notNull(),
    weight: text().notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).notNull(),
});

export const teams = sqliteTable("teams", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).notNull(),
});

// -------------------- Testing start
export const games = sqliteTable('games', {
    id: int('id').primaryKey({ autoIncrement: true }),
    date: int('date', { mode: 'timestamp' }).notNull(),
    homeTeamId: int("home_team_id").notNull().references(() => teams.id),
    awayTeamId: int("away_team_id").notNull().references(() => teams.id),
    location: text('location').notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).notNull()
  })
// Game Players (optional stats summary)
export const gamePlayers = sqliteTable('game_players', {
    id: int('id').primaryKey({ autoIncrement: true }),
    gameId: int('game_id').notNull(),
    playerId: int('player_id').notNull(),
    teamId: int('team_id').notNull(),
    positionId: int("position_id").references(() => fieldPositions.id),
    battingOrderNumber: int('batting_order_number').notNull(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).notNull(),
})
// At-Bats Table – Tracks each individual at-bat
export const atBats = sqliteTable('at_bats', {
    id: int('id').primaryKey({ autoIncrement: true }),
    gameId: int('game_id').notNull(),
    playerId: int('player_id').notNull(),
    teamId: int('team_id').notNull(),
    inning: int('inning').notNull(),
    result: text('result').notNull(), // e.g. 'single', 'strikeout', 'walk', 'home run'
    rbis: int('rbis').default(0),
    runsScored: int('runs_scored').default(0),
    pitchCount: int('pitch_count').default(0),
    balls: int('balls').default(0),
    strikes: int('strikes').default(0),
    basePosition: int('base_position').default(0),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).notNull(),
})

// -------------------- Testing end


export const fieldPositions = sqliteTable("field_positions", {
  id: int("id").primaryKey({ autoIncrement: true }),
  number: int("number"),
  name: text("name").notNull().unique(),  // e.g. "Catcher", "Shortstop"
  abbreviation: text("abbreviation").notNull().unique(), // e.g. "C", "SS"
  createdAt: int('created_at', { mode: 'timestamp' }),
  updatedAt: int('updated_at', { mode: 'timestamp' }),
});

// Join Tables

export const teamPlayers = sqliteTable("team_players", {
    id: int().primaryKey({ autoIncrement: true }),
    teamId: int("team_id").notNull().references(() => teams.id),
    playerId: int("player_id").notNull().references(() => players.id),
    playerFeildPosition: text(),
    playerBattingOrderNumber: text(),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).notNull(),
  })

  