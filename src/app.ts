import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { carRoutes } from './app/modules/cars/car.routes';
import { orderRoutes } from './app/modules/orders/order.routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api', carRoutes);
app.use('/api', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my carzone');
});

export default app;
