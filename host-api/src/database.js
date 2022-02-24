const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database(path.join(__dirname, '..', 'database.sqlite'));

async function startDatabase() {
  return new Promise((resolve) => {
    database.serialize(() => {
      database.run(
        `
        CREATE TABLE IF NOT EXISTS pets (id TEXT, name TEXT, birth_date TEXT)
      `,
        (...params) => {
          console.log(params);
          resolve();
        }
      );
    });
  });
}

database.startDatabase = startDatabase;

module.exports = database;
