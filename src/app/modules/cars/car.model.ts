import { model } from 'mongoose';
import { carSchema, ICar } from './car.schema';
export const Car = model<ICar>('Car', carSchema);
