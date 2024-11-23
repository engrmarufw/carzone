import { Request, Response } from 'express';
import { createOrderService, calculateRevenueService } from './order.service';

// Controller to create an order
export const createOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { order: orderData } = req.body;
    const { email, car, quantity, totalPrice } = orderData;

    const order = await createOrderService(email, car, quantity, totalPrice);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'Failed to create order',
      status: false,
      error: error.message,
    });
  }
};

// Controller to calculate total revenue from all orders
export const calculateRevenue = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const revenue = await calculateRevenueService();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue: revenue },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      error,
    });
  }
};
