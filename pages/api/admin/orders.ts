import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../server/db/connectMongo';
import Order from '../../../server/models/Order';
import { requireAdmin } from '../../../server/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectMongo();
    requireAdmin(req);

    const orders = await Order.find({ status: 'active' }).populate('user', 'name email').sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (e: any) {
    if (e.message === 'Admin access required') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    return res.status(500).json({ message: 'Server error', error: e?.message || 'unknown' });
  }
}
