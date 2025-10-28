import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../server/db/connectMongo';
import User from '../../../server/models/User';
import bcrypt from 'bcryptjs';
import { signToken, setAuthCookie } from '../../../server/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    await connectMongo();
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken({ id: user._id, email: user.email });
    setAuthCookie(res, token);
    return res.status(200).json({ id: user._id, name: user.name, email: user.email, phone: user.phone });
  } catch (e: any) {
    return res.status(500).json({ message: 'Server error', error: e?.message || 'unknown' });
  }
}


