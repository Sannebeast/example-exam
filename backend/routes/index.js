import express from 'express';
import { getAllPets, updatePet, getPet, getAllSpiders, deleteMultiplePets } from '../controllers/petsController.js';
import { checkName, logHostname } from '../middleware/exampleMiddleware.js';
import cors from 'cors';
const router = express.Router();

// routes
router.get('/', cors(), (req, res, next) => {
  res.json('hi');
});
router.get('/pets', cors(), checkName, getAllPets);
router.get('/pets/spiders', cors(), logHostname, getAllSpiders);
router.get('/pets/:id', cors(), checkName, getPet);
router.put('/pets/update', cors(), logHostname, updatePet);
router.delete('/pets/delete-multiple', cors(), logHostname, express.json(), deleteMultiplePets);
export default router;
