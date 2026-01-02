import { z } from 'zod';

export const createSubMarkerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  marker_id: z.string().uuid('ID do marcador inválido'),
});

export const updateSubMarkerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
});

export type CreateSubMarkerInput = z.infer<typeof createSubMarkerSchema>;
export type UpdateSubMarkerInput = z.infer<typeof updateSubMarkerSchema>;





