import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
    process.exit(1);
  }
});

function listTables() {
  return new Promise((resolve, reject) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map(r => r.name));
    });
  });
}

async function showCounts() {
  try {
    const tables = await listTables();
    if (tables.length === 0) {
      console.log('No tables found in database.');
      db.close();
      return;
    }

    console.log(`Database file: ${dbPath}`);
    console.log('Tables and row counts:');

    for (const t of tables) {
      const count = await new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(*) AS cnt FROM ${t}`, (err, row) => {
          if (err) return reject(err);
          resolve(row.cnt);
        });
      });
      console.log(` - ${t}: ${count}`);
    }

    // Also show the first 5 rows of contacts (if present)
    if (tables.includes('contacts')) {
      console.log('\nSample rows from `contacts` (up to 5):');
      db.all('SELECT id, fullName, email, mobile, city, createdAt FROM contacts ORDER BY createdAt DESC LIMIT 5', (err, rows) => {
        if (err) {
          console.error('Failed to query contacts:', err.message);
        } else if (rows.length === 0) {
          console.log(' (no rows)');
        } else {
          console.table(rows);
        }
        db.close();
      });
    } else {
      db.close();
    }
  } catch (err) {
    console.error('Error inspecting DB:', err.message || err);
    db.close();
  }
}

showCounts();
