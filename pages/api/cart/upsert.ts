import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../server/db/connectMongo';
import User from '../../../server/models/User';
import { getUserFromRequest } from '../../../server/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const authUser = getUserFromRequest(req);
  if (!authUser) return res.status(401).json({ message: 'Unauthorized' });

  const { id, name, image, price, type, quantity } = req.body || {};
  if (!id || !name || !image || !price || !type) return res.status(400).json({ message: 'Missing fields' });
  const qty = Math.max(1, parseInt(String(quantity || 1), 10));

  try {
    await connectMongo();
    const user = await User.findById(authUser.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const idx = user.cart.findIndex((it: any) => it.id === id);
    if (idx >= 0) {
      user.cart[idx].quantity = (user.cart[idx].quantity || 1) + qty;
    } else {
      user.cart.push({ id, name, image, price, type, quantity: qty });
    }
    await user.save();
    return res.status(200).json({ cart: user.cart });
  } catch (e: any) {
    return res.status(500).json({ message: 'Server error', error: e?.message || 'unknown' });
  }
}


