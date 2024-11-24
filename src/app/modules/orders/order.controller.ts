import { Request, Response } from 'express';
import { createOrderService, calculateRevenueService } from './order.service';

// Helper function for validation
const validateOrderData = (orderData: any): string | null => {
  const { email, car, quantity, totalPrice } = orderData;

  // Basic validation checks
  if (!email || !email.includes('@')) return 'Invalid email address';
  if (!car || typeof car !== 'string')
    return 'Car field must be a valid string';
  if (!quantity || typeof quantity !== 'number' || quantity <= 0)
    return 'Quantity must be a positive number';
  if (!totalPrice || typeof totalPrice !== 'number' || totalPrice <= 0)
    return 'Total price must be a positive number';

  return null; // Validation passed
};

// Controller to create an order
export const createOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { order: orderData } = req.body;

    // Validate order data
    const validationError = validateOrderData(orderData);
    if (validationError) {
      res.status(400).json({
        message: validationError,
        status: false,
      });
      return;
    }

    const { email, car, quantity, totalPrice } = orderData;

    // Call the service to create an order
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
      error: error instanceof Error ? error.message : error,
    });
  }
};
