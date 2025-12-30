import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { SubMarkerService } from '@/lib/services/sub-marker.service';
import { updateSubMarkerSchema } from '@/lib/validators/sub-marker.validator';
import { handleApiError } from '@/lib/utils/responses';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const subMarker = await SubMarkerService.getById(params.id, user.id);
    return NextResponse.json(subMarker, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const validated = updateSubMarkerSchema.parse(body);

    const subMarker = await SubMarkerService.update(
      params.id,
      validated,
      user.id
    );
    return NextResponse.json(subMarker, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    await SubMarkerService.delete(params.id, user.id);
    return NextResponse.json(
      { message: 'Sub-marcador excluído com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}


