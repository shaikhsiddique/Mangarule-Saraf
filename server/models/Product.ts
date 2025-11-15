import mongoose, { Schema, models, model } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true, enum: ['mangalsutra', 'bracelets', 'earrings', 'necklaces', 'party-wear', 'rings', 'daily-wear'] },
  stock: { type: Number, required: true, default: 0 },
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  tags: [{ type: String }],
}, { timestamps: true });

const Product = models.Product || model('Product', ProductSchema);
export default Product;
