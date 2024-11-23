import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  email: string;
  car: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
