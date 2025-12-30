import { sql } from '../db/client';
import {
  SubMarker,
  CreateSubMarkerInput,
  UpdateSubMarkerInput,
} from '@/types/sub-marker';
import { NotFoundError, BusinessError } from '../utils/errors';

export class SubMarkerService {
  /**
   * Busca sub-marcadores de um marcador
   */
  static async getByMarker(
    markerId: string,
    userId: string
  ): Promise<SubMarker[]> {
    const result = await sql`
      SELECT * FROM sub_markers
      WHERE marker_id = ${markerId} AND user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return result as SubMarker[];
  }

  /**
   * Busca um sub-marcador por ID
   */
  static async getById(
    subMarkerId: string,
    userId: string
  ): Promise<SubMarker> {
    const result = await sql`
      SELECT * FROM sub_markers
      WHERE id = ${subMarkerId} AND user_id = ${userId}
    `;

    if (result.length === 0) {
      throw new NotFoundError('Sub-marcador não encontrado');
    }

    return result[0] as SubMarker;
  }

  /**
   * Cria um novo sub-marcador
   */
  static async create(
    input: CreateSubMarkerInput,
    userId: string
  ): Promise<SubMarker> {
    // Verificar se marcador pai existe e pertence ao usuário
    const markerResult = await sql`
      SELECT id FROM markers WHERE id = ${input.marker_id} AND user_id = ${userId}
    `;

    if (markerResult.length === 0) {
      throw new NotFoundError('Marcador pai não encontrado');
    }

    const result = await sql`
      INSERT INTO sub_markers (marker_id, user_id, name)
      VALUES (${input.marker_id}, ${userId}, ${input.name})
      RETURNING *
    `;

    return result[0] as SubMarker;
  }

  /**
   * Atualiza um sub-marcador
   */
  static async update(
    subMarkerId: string,
    input: UpdateSubMarkerInput,
    userId: string
  ): Promise<SubMarker> {
    // Verificar se sub-marcador existe e pertence ao usuário
    await this.getById(subMarkerId, userId);

    const result = await sql`
      UPDATE sub_markers
      SET name = ${input.name}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${subMarkerId} AND user_id = ${userId}
      RETURNING *
    `;

    return result[0] as SubMarker;
  }

  /**
   * Exclui um sub-marcador
   */
  static async delete(subMarkerId: string, userId: string): Promise<void> {
    // Verificar se sub-marcador existe e pertence ao usuário
    await this.getById(subMarkerId, userId);

    // Verificar se há notas vinculadas
    const notesResult = await sql`
      SELECT id FROM notes WHERE sub_marker_id = ${subMarkerId}
    `;

    if (notesResult.length > 0) {
      throw new BusinessError(
        'Não é possível excluir sub-marcador com notas vinculadas. Exclua as notas primeiro.'
      );
    }

    await sql`
      DELETE FROM sub_markers WHERE id = ${subMarkerId} AND user_id = ${userId}
    `;
  }
}
