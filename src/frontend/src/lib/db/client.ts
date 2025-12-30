import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Neon SDK retorna uma função SQL template tag
export const sql = neon(process.env.DATABASE_URL);


