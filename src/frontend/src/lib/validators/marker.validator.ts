import { z } from 'zod';

export const createMarkerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
});

export const updateMarkerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
});

export type CreateMarkerInput = z.infer<typeof createMarkerSchema>;
export type UpdateMarkerInput = z.infer<typeof updateMarkerSchema>;


