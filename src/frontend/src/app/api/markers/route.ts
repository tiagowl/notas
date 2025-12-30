import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { MarkerService } from '@/lib/services/marker.service';
import { createMarkerSchema } from '@/lib/validators/marker.validator';
import { handleApiError } from '@/lib/utils/responses';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const markers = await MarkerService.getByUser(user.id);
    return NextResponse.json(markers, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const validated = createMarkerSchema.parse(body);

    const marker = await MarkerService.create(validated, user.id);
    return NextResponse.json(marker, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}


