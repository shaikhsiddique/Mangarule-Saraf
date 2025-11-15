import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../server/db/connectMongo';
import Product from '../../server/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectMongo();
    const { type } = req.query;

    let query = { isActive: true };
    if (type && typeof type === 'string') {
      query = { ...query, type };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (e: any) {
    return res.status(500).json({ message: 'Server error', error: e?.message || 'unknown' });
  }
}
