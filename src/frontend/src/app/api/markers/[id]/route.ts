import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { MarkerService } from '@/lib/services/marker.service';
import { updateMarkerSchema } from '@/lib/validators/marker.validator';
import { handleApiError } from '@/lib/utils/responses';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const marker = await MarkerService.getById(params.id, user.id);
    return NextResponse.json(marker, { status: 200 });
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
    const validated = updateMarkerSchema.parse(body);

    const marker = await MarkerService.update(params.id, validated, user.id);
    return NextResponse.json(marker, { status: 200 });
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
    await MarkerService.delete(params.id, user.id);
    return NextResponse.json(
      { message: 'Marcador excluído com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}





