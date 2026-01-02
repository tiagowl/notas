import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { SubMarkerService } from '@/lib/services/sub-marker.service';
import { createSubMarkerSchema } from '@/lib/validators/sub-marker.validator';
import { handleApiError } from '@/lib/utils/responses';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const markerId = searchParams.get('marker_id');

    if (!markerId) {
      return NextResponse.json(
        { error: 'marker_id é obrigatório' },
        { status: 400 }
      );
    }

    const subMarkers = await SubMarkerService.getByMarker(markerId, user.id);
    return NextResponse.json(subMarkers, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const validated = createSubMarkerSchema.parse(body);

    const subMarker = await SubMarkerService.create(validated, user.id);
    return NextResponse.json(subMarker, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}







