const database = require('../database');
const { Pet } = require('../modules/pets');

function petRowToClass(row) {
  return new Pet({ id: row.id, birthDate: row.birth_date, name: row.name });
}

async function getPetById(petId) {
  return new Promise((resolve, reject) => {
    const stmt = database.prepare('SELECT * FROM pets WHERE id = ?');
    stmt.get(petId, (error, row) => {
      if (error) reject(error);
      else resolve(row ? petRowToClass(row) : null);
    });
    stmt.finalize();
  });
}

async function getAllPets({ limit = 10, skip = 0 } = {}) {
  return new Promise((resolve, reject) => {
    const stmt = database.prepare('SELECT * FROM pets LIMIT ? OFFSET ?');
    stmt.all([limit, skip], (error, rows) => {
      if (error) reject(error);
      else resolve(rows.map((r) => petRowToClass(r)));
    });
    stmt.finalize();
  });
}

async function insertPet(petInstance) {
  return new Promise((resolve, reject) => {
    const stmt = database.prepare('INSERT INTO pets (id, name, birth_date) VALUES (?, ?, ?)');
    stmt.run([petInstance.id, petInstance.name, petInstance.birthDate.toISOString()], (_, error) => {
      if (error) reject(error);
      else resolve();
    });
    stmt.finalize();
  });
}

async function updatePet(petInstance) {
  return new Promise((resolve, reject) => {
    const stmt = database.prepare('UPDATE pets SET name=?, birth_date=? WHERE id = ?');
    stmt.run([petInstance.name, petInstance.birthDate.toISOString(), petInstance.id], (_, error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

async function savePet(petInstance) {
  const pet = await getPetById(petInstance.id);
  if (pet) await updatePet(petInstance);
  else await insertPet(petInstance);
}

module.exports = {
  getPetById,
  savePet,
  getAllPets,
};
