import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';
import { registerSchema } from '@/lib/validators/auth.validator';
import { handleApiError } from '@/lib/utils/responses';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);

    const result = await AuthService.register(
      validated.email,
      validated.password
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}


