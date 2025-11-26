import mongoose, { Schema, models, model } from 'mongoose';

const OrderItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const OrderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Order = models.Order || model('Order', OrderSchema);
export default Order;
