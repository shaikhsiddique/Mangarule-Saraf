import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../server/db/connectMongo';
import User from '../../../server/models/User';
import { getUserFromRequest } from '../../../server/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await connectMongo();
    const authUser = getUserFromRequest(req);
    if (!authUser) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(authUser.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (e: any) {
    return res.status(500).json({ message: 'Server error', error: e?.message || 'unknown' });
  }
}


