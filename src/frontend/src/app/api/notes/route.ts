import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { NoteService } from '@/lib/services/note.service';
import { createNoteSchema } from '@/lib/validators/note.validator';
import { handleApiError } from '@/lib/utils/responses';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const subMarkerId = searchParams.get('sub_marker_id');

    if (!subMarkerId) {
      return NextResponse.json(
        { error: 'sub_marker_id é obrigatório' },
        { status: 400 }
      );
    }

    const notes = await NoteService.getBySubMarker(subMarkerId, user.id);
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    console.log('POST /api/notes - Request body:', JSON.stringify(body, null, 2));
    
    const validated = createNoteSchema.parse(body);
    console.log('POST /api/notes - Validated data:', JSON.stringify(validated, null, 2));

    const note = await NoteService.create(validated, user.id);
    console.log('POST /api/notes - Note created successfully:', note.id);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('POST /api/notes - Error:', error);
    return handleApiError(error);
  }
}


