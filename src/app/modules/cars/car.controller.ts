import { Request, Response } from 'express';
import { CarServices } from './car.service';

// Controller to create a car
export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { car: carData } = req.body;
    const result = await CarServices.createCar(carData);
    res.status(201).json({
      message: 'Car created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to create car',
      success: false,
      err,
    });
  }
};

// Controller to get all cars
export const getAllCars = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { searchTerm } = req.query;
    // Pass searchTerm to the service
    const cars = await CarServices.getAllCars(searchTerm as string);
    res.status(200).json({
      message: 'Cars retrieved successfully',
      success: true,
      data: cars,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to retrieve cars',
      success: false,
      err,
    });
  }
};

// Controller to get a car by ID
export const getCarById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const car = await CarServices.getCarById(req.params.carId);
    if (!car) {
      res.status(404).json({
        message: 'Car not found',
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Car retrieved successfully',
      success: true,
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to retrieve car',
      success: false,
      err,
    });
  }
};

// Controller to update a car
export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await CarServices.updateCar(req.params.carId, req.body);
    if (!car) {
      res.status(404).json({
        message: 'Car not found',
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Car updated successfully',
      success: true,
      data: car,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to update car',
      success: false,
      err,
    });
  }
};

// Controller to delete a car
export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await CarServices.deleteCar(req.params.carId);
    if (!car) {
      res.status(404).json({
        message: 'Car not found',
        success: false,
        data: {},
      });
      return;
    }
    res.status(200).json({
      message: 'Car deleted successfully',
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete car',
      success: false,
      err,
    });
  }
};
