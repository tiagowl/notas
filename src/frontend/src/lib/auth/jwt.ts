import jwt from 'jsonwebtoken';

// Em produção, JWT_SECRET deve estar definido
const JWT_SECRET: string = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'default-secret-change-in-production');
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: JWTPayload): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  // @ts-expect-error - expiresIn accepts string values like "7d", "1h" etc.
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): JWTPayload {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return null;
}



