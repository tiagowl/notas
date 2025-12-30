import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { NoteService } from '@/lib/services/note.service';
import { updateNoteSchema } from '@/lib/validators/note.validator';
import { handleApiError } from '@/lib/utils/responses';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const note = await NoteService.getById(params.id, user.id);
    return NextResponse.json(note, { status: 200 });
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
    const validated = updateNoteSchema.parse(body);

    const note = await NoteService.update(params.id, validated, user.id);
    return NextResponse.json(note, { status: 200 });
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
    await NoteService.delete(params.id, user.id);
    return NextResponse.json(
      { message: 'Nota excluída com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}



