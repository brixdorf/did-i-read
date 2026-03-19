const Database = require('better-sqlite3')

const db = new Database('database.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        day INTEGER NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL
    )
    `)

module.exports = db