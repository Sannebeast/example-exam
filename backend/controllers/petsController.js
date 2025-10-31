import { JSONFilePreset } from "lowdb/node";

// Read or create db.json
const defaultData = { meta: {"tile": "List of animals","date": "September 2024"}, animals : [] }
const db = await JSONFilePreset('db.json', defaultData)
const animals = db.data.animals

export async function getAllPets(req, res) {
  const animalUrls = animals.map(animal => `/pets/${animal.id}`);
  res.status(200).send(animalUrls);
}

export async function updatePet(req, res) {
  let id = Number(req.query.id);
  let name = req.query.name;
  let type = req.query.type;

  if (!id || !name) {
    return res.status(400).send({ error: "Missing required fields: id or name." });
  }

  // Check if id exists
  const existingAnimal = animals.find(animal => animal.id === id);
  if (!existingAnimal) {
    return res.status(404).send({ error: `No animal found with id ${id}.` });
  }

  // Update only provided fields
  if (name) existingAnimal.name = name;
  if (type) existingAnimal.type = type;
  existingAnimal.time = new Date().toLocaleString();

  await db.write();
  res.status(200).send({ message: "Pet updated successfully", pet: existingAnimal });
}

// Find all spiders and return IDs
export async function getAllSpiders(req, res) {
  await db.read();
  const animals = db.data.animals;
  const spiders = animals.filter(a => a.type && a.type.toLowerCase() === "spider");
  const ids = spiders.map(s => s.id);

  if (ids.length === 0) {
    return res.status(404).send({ error: "No spiders found." });
  }

  res.status(200).send({ spiderIds: ids });
}

// Delete multiple pets
export async function deleteMultiplePets(req, res) {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).send({ error: "Please provide a list of ids to delete." });
  }

  let deleted = 0;
  ids.forEach(id => {
    const index = animals.findIndex(a => a.id === id);
    if (index !== -1) {
      animals.splice(index, 1);
      deleted++;
    }
  });

  await db.write();

  if (deleted === 0) {
    return res.status(404).send({ error: "No matching pets found to delete." });
  }

  res.status(200).send({ message: `${deleted} pet(s) deleted.` });
}

export async function getPet(req, res) {
  let id = Number(req.params.id);
  let animal = animals.find(animal => animal.id === id);
  if (animal) {
    res.status(200).send(animal);
  } else {
    res.status(404).send('Animal not found');
  }
}
