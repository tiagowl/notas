import { sql } from '../db/client';
import { Note, CreateNoteInput, UpdateNoteInput } from '@/types/note';
import { NotFoundError, ValidationError } from '../utils/errors';
import { sanitizeHtml } from '../utils/sanitize';

export class NoteService {
  /**
   * Busca notas de um sub-marcador
   */
  static async getBySubMarker(
    subMarkerId: string,
    userId: string
  ): Promise<Note[]> {
    try {
      const result = await sql`
        SELECT * FROM notes
        WHERE sub_marker_id = ${subMarkerId} AND user_id = ${userId}
        ORDER BY created_at DESC
      `;

      // Garantir que sempre retornamos um array
      const notes = Array.isArray(result) ? result : [];
      console.log(`NoteService.getBySubMarker - Found ${notes.length} notes for sub_marker_id: ${subMarkerId}, user_id: ${userId}`);
      
      return notes as Note[];
    } catch (error) {
      console.error('NoteService.getBySubMarker - Error:', error);
      throw error;
    }
  }

  /**
   * Busca uma nota por ID
   */
  static async getById(noteId: string, userId: string): Promise<Note> {
    const result = await sql`
      SELECT * FROM notes
      WHERE id = ${noteId} AND user_id = ${userId}
    `;

    if (result.length === 0) {
      throw new NotFoundError('Nota não encontrada');
    }

    return result[0] as Note;
  }

  /**
   * Cria uma nova nota
   */
  static async create(input: CreateNoteInput, userId: string): Promise<Note> {
    // Verificar se sub-marcador existe e pertence ao usuário
    const subMarkerResult = await sql`
      SELECT id FROM sub_markers WHERE id = ${input.sub_marker_id} AND user_id = ${userId}
    `;

    if (subMarkerResult.length === 0) {
      throw new NotFoundError('Sub-marcador não encontrado');
    }

    // Verificar se conteúdo não está vazio após remover HTML
    const textOnly = input.content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/gi, '')
      .trim();

    if (!textOnly) {
      throw new ValidationError('O conteúdo da nota não pode estar vazio');
    }

    // Sanitizar conteúdo HTML
    const sanitizedContent = sanitizeHtml(input.content);

    const result = await sql`
      INSERT INTO notes (sub_marker_id, user_id, title, content)
      VALUES (${input.sub_marker_id}, ${userId}, ${input.title}, ${sanitizedContent})
      RETURNING *
    `;

    return result[0] as Note;
  }

  /**
   * Atualiza uma nota
   */
  static async update(
    noteId: string,
    input: UpdateNoteInput,
    userId: string
  ): Promise<Note> {
    // Verificar se nota existe e pertence ao usuário
    const existingNote = await this.getById(noteId, userId);

    // Preparar dados para atualização
    const title = input.title ?? existingNote.title;
    let content = existingNote.content;

    if (input.content !== undefined) {
      // Sanitizar conteúdo HTML
      content = sanitizeHtml(input.content);
    }

    const result = await sql`
      UPDATE notes
      SET title = ${title}, content = ${content}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${noteId} AND user_id = ${userId}
      RETURNING *
    `;

    return result[0] as Note;
  }

  /**
   * Exclui uma nota
   */
  static async delete(noteId: string, userId: string): Promise<void> {
    // Verificar se nota existe e pertence ao usuário
    await this.getById(noteId, userId);

    await sql`
      DELETE FROM notes WHERE id = ${noteId} AND user_id = ${userId}
    `;
  }
}
