import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../server/db/connectMongo';
import Order from '../../../server/models/Order';
import { getUserFromRequest } from '../../../server/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectMongo();

    const user = getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0 || !total) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const order = new Order({
      user: user.id,
      items,
      total,
      status: 'active',
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
