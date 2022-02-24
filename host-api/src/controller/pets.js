const { savePet, getAllPets, getPetById } = require('../data/pets');
const { Pet } = require('../modules/pets');

exports.postPet = async function (request, response) {
  try {
    const pet = new Pet(request.body);
    await savePet(pet);
    return response.json({ pet });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

exports.getPets = async function (request, response) {
  try {
    const limit = request.query.limit ? Number(request.query.limit) : 10;
    const skip = request.query.skip ? Number(request.query.skip) : 0;
    const pets = await getAllPets({ limit, skip });
    return response.json({ pets });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

exports.getOnePet = async function (request, response) {
  try {
    const id = request.params.id;
    const pet = await getPetById(id);
    if (!pet) return response.status(404).json({ message: `Pet with id ${id} not found` });
    return response.json({ pet });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
