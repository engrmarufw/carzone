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

  car.quantity -= quantity;
  if (car.quantity === 0) car.inStock = false;
  await car.save();

  return order;
};
export const calculateRevenueService = async () => {
  try {
    const result = await Order.aggregate([
      {
        $addFields: {
          revenue: { $multiply: ['$quantity', '$totalPrice'] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$revenue' },
        },
      },
    ]);

    if (result.length > 0) {
      return result[0].totalRevenue;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total revenue:', error);
    throw error;
  }
};
