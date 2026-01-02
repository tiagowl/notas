import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título deve ter no máximo 200 caracteres'),
  content: z
    .string()
    .min(1, 'Conteúdo é obrigatório')
    .refine(
      (val) => {
        if (!val || typeof val !== 'string') {
          return false;
        }
        
        const trimmed = val.trim();
        if (trimmed === '' || trimmed === '<p></p>' || trimmed === '<p><br></p>') {
          return false;
        }
        
        // Verificar se não é apenas HTML vazio (tags sem conteúdo)
        // Remove tags HTML e espaços para verificar se há texto real
        const textOnly = trimmed
          .replace(/<[^>]*>/g, '') // Remove tags HTML
          .replace(/&nbsp;/g, ' ') // Converte &nbsp; em espaço
          .replace(/&[a-z]+;/gi, '') // Remove outras entidades HTML
          .trim();
        
        return textOnly.length > 0;
      },
      { message: 'O conteúdo da nota deve ter texto' }
    ),
  sub_marker_id: z.string().uuid('ID do sub-marcador inválido'),
});

export const updateNoteSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título deve ter no máximo 200 caracteres')
    .optional(),
  content: z
    .string()
    .optional()
    .refine(
      (val) => {
        // Se content não foi fornecido, é válido (opcional)
        if (val === undefined) {
          return true;
        }
        
        // Se foi fornecido, deve ter conteúdo válido
        if (!val || typeof val !== 'string') {
          return false;
        }
        
        const trimmed = val.trim();
        if (trimmed === '' || trimmed === '<p></p>' || trimmed === '<p><br></p>') {
          return false;
        }
        
        // Verificar se não é apenas HTML vazio (tags sem conteúdo)
        const textOnly = trimmed
          .replace(/<[^>]*>/g, '') // Remove tags HTML
          .replace(/&nbsp;/g, ' ') // Converte &nbsp; em espaço
          .replace(/&[a-z]+;/gi, '') // Remove outras entidades HTML
          .trim();
        
        return textOnly.length > 0;
      },
      { message: 'O conteúdo da nota deve ter texto' }
    ),
}).refine(
  (data) => data.title !== undefined || data.content !== undefined,
  {
    message: 'Pelo menos título ou conteúdo deve ser fornecido',
  }
);

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;


