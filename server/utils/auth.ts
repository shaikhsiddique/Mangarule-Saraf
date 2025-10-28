import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const COOKIE_NAME = 'ms_token';

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function setAuthCookie(res: NextApiResponse, token: string) {
  const serialized = cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
  res.setHeader('Set-Cookie', serialized);
}

export function getUserFromRequest(req: NextApiRequest): { id: string; email: string } | null {
  try {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies[COOKIE_NAME];
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return { id: decoded.id, email: decoded.email };
  } catch {
    return null;
  }
}


