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
export const calculateRevenueService = async () => {
  try {
    // Fetch all orders with car details
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'cars', // Match the collection name exactly
          localField: 'car',
          foreignField: '_id',
          as: 'carDetails',
        },
      },
      {
        $unwind: {
          path: '$carDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          email: 1,
          car: 1,
          quantity: 1,
          totalPrice: 1,
          carPrice: '$carDetails.price',
          revenue: {
            $cond: {
              if: { $and: ['$quantity', '$carDetails.price'] },
              then: { $multiply: ['$quantity', '$carDetails.price'] },
              else: 0,
            },
          },
        },
      },
    ]);

    // Calculate the total revenue
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.revenue || 0),
      0,
    );

    return {
      totalRevenue,
    };
  } catch (error) {
    console.error('Error fetching orders or calculating revenue:', error);
    throw error;
  }
};
