import { sql } from '../db/client';
import { hashPassword, comparePassword } from '../auth/password';
import { generateToken } from '../auth/jwt';
import { User, LoginCredentials } from '@/types/user';
import { UnauthorizedError, ValidationError } from '../utils/errors';

export class AuthService {
  /**
   * Autentica um usuário
   */
  static async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const { email, password } = credentials;

    // Buscar usuário
    const result = await sql`
      SELECT id, email, password_hash, created_at, updated_at 
      FROM users 
      WHERE email = ${email}
    `;

    if (result.length === 0) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    const user = result[0];

    // Verificar senha
    const isValid = await comparePassword(password, user.password_hash);

    if (!isValid) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    // Gerar token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Retornar usuário (sem senha)
    const { password_hash, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword as User,
    };
  }

  /**
   * Registra um novo usuário
   */
  static async register(email: string, password: string): Promise<{ token: string; user: User }> {
    // Verificar se email já existe
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      throw new ValidationError('Email já está em uso');
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar usuário
    const result = await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING id, email, created_at, updated_at
    `;

    const user = result[0] as User;

    // Gerar token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user,
    };
  }

  /**
   * Busca usuário por ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    const result = await sql`
      SELECT id, email, created_at, updated_at 
      FROM users 
      WHERE id = ${userId}
    `;

    if (result.length === 0) {
      return null;
    }

    return result[0] as User;
  }
}


