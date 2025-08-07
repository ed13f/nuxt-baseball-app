import { db, fieldPositions } from './index'

const now = new Date()
const positions = [
  { name: 'Pitcher', number: 1, abbreviation: 'P' },
  { name: 'Catcher', number: 2, abbreviation: 'C' },
  { name: 'First Base', number: 3, abbreviation: '1B' },
  { name: 'Second Base', number: 4, abbreviation: '2B' },
  { name: 'Third Base', number: 5, abbreviation: '3B' },
  { name: 'Shortstop', number: 6, abbreviation: 'SS' },
  { name: 'Left Field', number: 7, abbreviation: 'LF' },
  { name: 'Center Field', number: 8, abbreviation: 'CF' },
  { name: 'Right Field', number: 9, abbreviation: 'RF' },
  { name: 'Designated Hitter', number: 10, abbreviation: 'DH' },
  { name: 'Bench', number: 11, abbreviation: 'B' },
].map(pos => ({
  ...pos,
  created_at: now,
  updated_at: now,
}))

async function seed() {
  try {
    await db.insert(fieldPositions).values(positions)
  } catch (error) {
    console.error('❌ Error seeding field positions:', error)
  }
}

seed().catch(console.error)
