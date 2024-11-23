import express from 'express';
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} from './car.controller';

const router = express.Router();

// Route to create a car
router.post('/cars', createCar);

// Route to get all cars
router.get('/cars', getAllCars);

// Route to get a car by ID
router.get('/cars/:carId', getCarById);

// Route to update a car by ID
router.put('/cars/:carId', updateCar);

// Route to delete a car by ID
router.delete('/cars/:carId', deleteCar);

export const carRoutes = router;
