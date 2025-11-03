import express from 'express';
import { getAllPets, getPet, getAllSpiders, updatePet, deleteMultiplePets, createPet } from '../controllers/petsController.js';
import { checkName, logHostname } from '../middleware/exampleMiddleware.js';
import cors from 'cors';

const router = express.Router();

// routes
router.get('/', cors(), (req, res) => {
  res.json({ message: '🐾 API is running' });
});

router.get('/pets', cors(), checkName, getAllPets);
router.get('/pets/spiders', cors(), logHostname, getAllSpiders);
router.get('/pets/:id', cors(), checkName, getPet);
router.put('/pets/:id', cors(), logHostname, express.json(), updatePet);
router.delete('/pets', cors(), logHostname, deleteMultiplePets);
router.post('/pets', cors(), logHostname, express.json(), createPet);

export default router;
