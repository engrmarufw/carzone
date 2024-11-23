import express from 'express';
import { createOrder, calculateRevenue } from './order.controller';

const router = express.Router();

// Endpoint to create an order
router.post('/orders', createOrder);

// Endpoint to calculate total revenue from all orders
router.get('/orders/revenue', calculateRevenue);

export const orderRoutes = router;
