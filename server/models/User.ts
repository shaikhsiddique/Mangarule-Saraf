import mongoose, { Schema, models, model } from 'mongoose';

const CartItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
}, { _id: false });

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  cart: { type: [CartItemSchema], default: [] },
}, { timestamps: true });

const User = models.User || model('User', UserSchema);
export default User;


