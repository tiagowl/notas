import { sql } from '../db/client';
import { Marker, CreateMarkerInput, UpdateMarkerInput } from '@/types/marker';
import { NotFoundError, BusinessError } from '../utils/errors';

export class MarkerService {
  /**
   * Busca todos os marcadores de um usuário
   */
  static async getByUser(userId: string): Promise<Marker[]> {
    const result = await sql`
      SELECT * FROM markers
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return result as Marker[];
  }

  /**
   * Busca um marcador por ID
   */
  static async getById(markerId: string, userId: string): Promise<Marker> {
    const result = await sql`
      SELECT * FROM markers
      WHERE id = ${markerId} AND user_id = ${userId}
    `;

    if (result.length === 0) {
      throw new NotFoundError('Marcador não encontrado');
    }

    return result[0] as Marker;
  }

  /**
   * Cria um novo marcador
   */
  static async create(input: CreateMarkerInput, userId: string): Promise<Marker> {
    const result = await sql`
      INSERT INTO markers (user_id, name)
      VALUES (${userId}, ${input.name})
      RETURNING *
    `;

    return result[0] as Marker;
  }

  /**
   * Atualiza um marcador
   */
  static async update(
    markerId: string,
    input: UpdateMarkerInput,
    userId: string
  ): Promise<Marker> {
    // Verificar se marcador existe e pertence ao usuário
    await this.getById(markerId, userId);

    const result = await sql`
      UPDATE markers
      SET name = ${input.name}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${markerId} AND user_id = ${userId}
      RETURNING *
    `;

    return result[0] as Marker;
  }

  /**
   * Exclui um marcador
   */
  static async delete(markerId: string, userId: string): Promise<void> {
    // Verificar se marcador existe e pertence ao usuário
    await this.getById(markerId, userId);

    // Verificar se há sub-marcadores vinculados
    const subMarkersResult = await sql`
      SELECT id FROM sub_markers WHERE marker_id = ${markerId}
    `;

    if (subMarkersResult.length > 0) {
      throw new BusinessError(
        'Não é possível excluir marcador com sub-marcadores vinculados. Exclua os sub-marcadores primeiro.'
      );
    }

    await sql`
      DELETE FROM markers WHERE id = ${markerId} AND user_id = ${userId}
    `;
  }
}
