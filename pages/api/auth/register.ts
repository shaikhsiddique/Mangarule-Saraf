import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../server/db/connectMongo';
import User from '../../../server/models/User';
import bcrypt from 'bcryptjs';
import { createToken } from '../../../server/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { name, email, password, phone } = req.body || {};
  if (!name || !email || !password || !phone) return res.status(400).json({ message: 'Missing fields' });
  try {
    await connectMongo();
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, phone, cart: [] });
    const token = createToken(user);
    return res.status(201).json({ id: user._id, name: user.name, email: user.email, phone: user.phone });
  } catch (e: any) {
    return res.status(500).json({ message: 'Server error', error: e?.message || 'unknown' });
  }
}


