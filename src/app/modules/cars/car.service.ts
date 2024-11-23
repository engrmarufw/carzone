import { Car, ICar } from './car.model';

// Service to create a car
const createCar = async (carData: Partial<ICar>) => {
  const result = await Car.create(carData);
  return result;
};

// Service to get all cars with an optional search term
const getAllCars = async (searchTerm?: string) => {
  const filter = searchTerm
    ? {
        $or: [
          { brand: { $regex: searchTerm, $options: 'i' } },
          { model: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};
  const result = await Car.find(filter);
  return result;
};

// Service to get a car by ID
const getCarById = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

// Service to update a car by ID
const updateCar = async (id: string, updateData: Partial<ICar>) => {
  const result = await Car.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Service to delete a car by ID
const deleteCar = async (id: string) => {
  const result = await Car.findByIdAndDelete(id);
  return result;
};

// Export all services as an object
export const CarServices = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
