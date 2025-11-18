import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../server/db/connectMongo';
import User from '../../../server/models/User';
import bcrypt from 'bcryptjs';
import { createToken } from '../../../server/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectMongo();
    console.log('Connected to MongoDB successfully.');

    console.log(`Looking for user with email: ${email}`);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found, comparing password...');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Password valid, creating token...');
    const token = createToken(user);
    console.log('Token created successfully');
    return res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
    });
  } catch (e: any) {
    console.error('Server error in login:', e);
    return res.status(500).json({ message: 'Server error', error: e?.message || 'unknown' });
  }
}
