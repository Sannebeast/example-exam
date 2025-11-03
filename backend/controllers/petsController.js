import { JSONFilePreset } from "lowdb/node";

// Read or create db.json
const defaultData = { 
  meta: { "title": "List of animals", "date": "September 2024" }, 
  animals: [] 
};
const db = await JSONFilePreset('db.json', defaultData);

// returns all pets
export async function getAllPets(req, res) {
  await db.read();
  const pets = db.data.animals;

  res.status(200).json({
    meta: {
      success: true,
      count: pets.length,
      timestamp: new Date().toISOString()
    },
    data: pets
  });
}

// returns single pet
export async function getPet(req, res) {
  await db.read();
  const id = Number(req.params.id);
  const animal = db.data.animals.find(a => a.id === id);

  if (!animal) {
    return res.status(404).json({
      meta: { success: false, action: 'get' },
      error: `No animal found with id ${id}.`
    });
  }

  res.status(200).json({
    meta: { success: true, action: 'get', timestamp: new Date().toISOString() },
    data: animal
  });
}

// returns all spiders
export async function getAllSpiders(req, res) {
  await db.read();
  const spiders = db.data.animals.filter(
    a => a.type && a.type.toLowerCase() === "spider"
  );

  if (spiders.length === 0) {
    return res.status(404).json({
      meta: { success: false, action: 'get' },
      error: "No spiders found."
    });
  }

  res.status(200).json({
    meta: { 
      success: true, 
      count: spiders.length, 
      type: "spider",
      timestamp: new Date().toISOString() 
    },
    data: spiders
  });
}

// updates single pet
export async function updatePet(req, res) {
  const id = Number(req.params.id);
  const { name, type } = req.body;

  if (!name) {
    return res.status(400).json({
      meta: { success: false, action: 'update' },
      error: "Missing required field: 'name'."
    });
  }

  await db.read();
  const animal = db.data.animals.find(a => a.id === id);

  if (!animal) {
    return res.status(404).json({
      meta: { success: false, action: 'update' },
      error: `No animal found with id ${id}.`
    });
  }

  animal.name = name;
  if (type) animal.type = type;
  animal.time = new Date().toLocaleString();

  await db.write();

  res.status(200).json({
    meta: { success: true, action: 'update', timestamp: new Date().toISOString() },
    data: animal
  });
}

// deletes multiple pets
export async function deleteMultiplePets(req, res) {
  const idsParam = req.query.ids;

  if (!idsParam) {
    return res.status(400).json({
      meta: { success: false, action: 'delete' },
      error: "Please provide ids query parameter, e.g. ?ids=1,2,3"
    });
  }

  const ids = idsParam.split(',').map(Number);

  await db.read();
  const beforeCount = db.data.animals.length;
  db.data.animals = db.data.animals.filter(a => !ids.includes(a.id));
  const afterCount = db.data.animals.length;

  const deletedCount = beforeCount - afterCount;
  await db.write();

  if (deletedCount === 0) {
    return res.status(404).json({
      meta: { success: false, action: 'delete' },
      error: "No matching pets found to delete."
    });
  }

  res.status(200).json({
    meta: { 
      success: true, 
      action: 'delete', 
      deletedCount, 
      timestamp: new Date().toISOString() 
    },
    data: db.data.animals
  });
}

// creates a new pet
export async function createPet(req, res) {
  const { id, name, type, icon } = req.body;

  // Validate required fields
  if (!id || !name || !type) {
    return res.status(400).json({
      meta: { success: false, action: 'create' },
      error: "Missing required fields: 'id', 'name', or 'type'."
    });
  }

  await db.read();

  // Check if ID already exists
  const existingAnimal = db.data.animals.find(a => a.id === id);
  if (existingAnimal) {
    return res.status(400).json({
      meta: { success: false, action: 'create' },
      error: `Pet with id ${id} already exists.`
    });
  }

  // Create new animal object
  const newAnimal = {
    id,
    name,
    type,
    icon: icon || "🐾",
    time: new Date().toLocaleString()
  };

  // Save to DB
  db.data.animals.push(newAnimal);
  await db.write();

  // Respond success
  res.status(201).json({
    meta: { success: true, action: 'create', timestamp: new Date().toISOString() },
    data: newAnimal
  });
}

