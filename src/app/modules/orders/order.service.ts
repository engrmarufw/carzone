import { Car } from '../cars/car.model';
import { Order } from './order.model';

import { IOrder } from './order.model';

// Service to create an order
export const createOrderService = async (
  email: string,
  carId: string,
  quantity: number,
  totalPrice: number,
): Promise<IOrder | null> => {
  // Check if car exists and is in stock
  const car = await Car.findById(carId);

  if (!car || !car.inStock || car.quantity < quantity) {
    throw new Error('Car not available or insufficient stock');
  }

  // Create the order
  const order = await Order.create({
    email,
    car: carId,
    quantity,
    totalPrice,
  });

  // Reduce car stock
  car.quantity -= quantity;
  if (car.quantity === 0) car.inStock = false;
  await car.save();

  return order;
};

// Service to calculate total revenue from all orders
export const calculateRevenueService = async () => {
  // Aggregate the total revenue from all orders
  const revenue = await Order.aggregate([
    {
      $lookup: {
        from: 'cars', // Referring to the 'Car' model
        localField: 'car',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    {
      $unwind: '$carDetails', // Flatten the carDetails array
    },
    {
      $project: {
        totalRevenue: { $multiply: ['$quantity', '$carDetails.price'] }, // Calculate total revenue for each order
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalRevenue' }, // Sum up the revenue from all orders
      },
    },
  ]);

  return revenue[0]?.totalRevenue || 0;
};
