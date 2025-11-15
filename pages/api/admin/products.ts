import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../server/db/connectMongo';
import Product from '../../../server/models/Product';
import { requireAdmin } from '../../../server/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();

    if (req.method === 'GET') {
      // Get all products or filter by type
      const { type } = req.query;
      const query = type ? { type, isActive: true } : { isActive: true };
      const products = await Product.find(query).sort({ createdAt: -1 });
      return res.status(200).json(products);
    }

    // Require admin for all other operations
    requireAdmin(req);

    if (req.method === 'POST') {
      // Create new product
      const { name, image, price, type, stock, description, tags } = req.body;
      if (!name || !image || !price || !type || stock === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const product = await Product.create({
        name, image, price, type, stock, description, tags
      });
      return res.status(201).json(product);
    }

    if (req.method === 'PUT') {
      // Update product
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ message: 'Product ID required' });
      const product = await Product.findByIdAndUpdate(id, updates, { new: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json(product);
    }

    if (req.method === 'DELETE') {
      // Delete product (soft delete by setting isActive to false)
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: 'Product ID required' });
      const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json({ message: 'Product deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (e: any) {
    if (e.message === 'Admin access required') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    return res.status(500).json({ message: 'Server error', error: e?.message || 'unknown' });
  }
}
