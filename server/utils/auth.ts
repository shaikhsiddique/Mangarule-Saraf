import type { NextApiRequest, NextApiResponse } from 'next';

export function getUserFromRequest(req: NextApiRequest): { id: string; email: string; role?: string } | null {
  // For college project, we'll use a simple header-based auth
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  try {
    const token = authHeader.substring(7); // Remove 'Bearer '
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    return decoded;
  } catch {
    return null;
  }
}

export function requireAdmin(req: NextApiRequest): { id: string; email: string } {
  const user = getUserFromRequest(req);
  if (!user || user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
}

export function createToken(user: any): string {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role || 'user'
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}


