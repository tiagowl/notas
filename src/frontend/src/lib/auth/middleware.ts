import { NextRequest } from 'next/server';
import { verifyToken, extractTokenFromHeader } from './jwt';
import { sql } from '../db/client';
import { User } from '@/types/user';
import { UnauthorizedError } from '../utils/errors';

export async function authenticate(request: NextRequest): Promise<User | null> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);

    // Buscar usuário no banco
    const result = await sql`
      SELECT id, email, created_at, updated_at 
      FROM users 
      WHERE id = ${payload.userId}
    `;

    if (result.length === 0) {
      return null;
    }

    return result[0] as User;
  } catch (error) {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<User> {
  const user = await authenticate(request);
  
  if (!user) {
    throw new UnauthorizedError('Não autenticado. Faça login novamente.');
  }
  
  return user;
}


