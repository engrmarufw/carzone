import { Request, Response } from 'express';
import { createOrderService, calculateRevenueService } from './order.service';

// Helper function for validation
const validateOrderData = (orderData: OrderData): string | null => {
  const { email, car, quantity, totalPrice } = orderData;

  // Basic validation checks
  if (!email || !email.includes('@')) return 'Invalid email address';
  if (!car || typeof car !== 'string')
    return 'Car field must be a valid string';
  if (!quantity || quantity <= 0) return 'Quantity must be a positive number';
  if (!totalPrice || totalPrice <= 0)
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

    // Ensure the data matches the OrderData type
    if (!orderData || typeof orderData !== 'object') {
      res.status(400).json({
        message: 'Invalid order data format',
        status: false,
      });
      return;
    }

    // Validate order data
    const validationError = validateOrderData(orderData as OrderData);
    if (validationError) {
      res.status(400).json({
        message: validationError,
        status: false,
      });
      return;
    }

    const { email, car, quantity, totalPrice } = orderData as OrderData;

    // Call the service to create an order
    const order = await createOrderService(email, car, quantity, totalPrice);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message || 'Failed to create order',
        status: false,
        error: error.message,
      });
    } else {
      res.status(400).json({
        message: 'Unknown error occurred',
        status: false,
        error: String(error),
      });
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Failed to calculate revenue',
        status: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: 'Unknown error occurred',
        status: false,
        error: String(error),
      });
    }
  }
};
