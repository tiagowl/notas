import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  BusinessError,
} from './errors';

export function handleApiError(error: unknown): NextResponse {
  // Erros de validação (Zod)
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation error',
        details: error.errors,
      },
      { status: 400 }
    );
  }

  // Erros de validação customizados
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Erros de autorização
  if (error instanceof UnauthorizedError) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }

  // Erros de não encontrado
  if (error instanceof NotFoundError) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  // Erros de negócio
  if (error instanceof BusinessError) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Erros genéricos
  console.error('Unexpected error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}


