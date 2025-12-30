# Guias de Desenvolvimento - Sistema de Gerenciamento de Notas

## 1. Visão Geral

Este documento apresenta guias e padrões de desenvolvimento para o sistema de gerenciamento de notas, incluindo estrutura de código, convenções, padrões de design e boas práticas.

**Objetivo**: Garantir consistência, qualidade e manutenibilidade do código.

---

## 2. Estrutura de Código

### 2.1 Organização de Arquivos

#### Convenção de Nomenclatura
- **Componentes React**: PascalCase (`Button.tsx`, `NoteEditor.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.ts`, `useNotes.ts`)
- **Services**: camelCase com sufixo `.service` (`auth.service.ts`)
- **Types**: camelCase com sufixo `.types` ou sem sufixo (`user.ts`, `note.ts`)
- **Utils**: camelCase (`errors.ts`, `sanitize.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_TITLE_LENGTH`)
- **Arquivos de configuração**: kebab-case (`next.config.js`)

#### Estrutura de Pastas
```
src/
├── app/              # Next.js App Router
├── components/       # Componentes React
├── lib/             # Lógica de negócio e utilitários
├── hooks/           # React Hooks customizados
├── types/           # TypeScript types
└── styles/          # Estilos globais
```

---

## 3. Convenções de Código

### 3.1 TypeScript

#### Tipos e Interfaces
```typescript
// ✅ BOM: Interface para objetos
interface User {
  id: string;
  email: string;
  created_at: Date;
}

// ✅ BOM: Type para unions
type Status = 'pending' | 'completed' | 'failed';

// ✅ BOM: Type para funções
type Handler = (req: Request, res: Response) => Promise<void>;
```

#### Nomenclatura de Types
- Interfaces: PascalCase sem prefixo (`User`, `Note`)
- Types: PascalCase (`ApiResponse`, `ErrorCode`)
- Props: Interface com sufixo `Props` (`ButtonProps`, `NoteEditorProps`)

---

### 3.2 React Components

#### Estrutura de Componente
```typescript
// ✅ BOM: Estrutura padrão
import React from 'react';
import { Button } from '@/components/ui/Button';

interface NoteItemProps {
  note: Note;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onEdit,
  onDelete,
}) => {
  // Hooks
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Handlers
  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(note.id);
    setIsDeleting(false);
  };

  // Render
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <Button onClick={() => onEdit(note.id)}>Editar</Button>
      <Button onClick={handleDelete} disabled={isDeleting}>
        Excluir
      </Button>
    </div>
  );
};
```

#### Ordem de Declarações
1. Imports (externos primeiro, depois internos)
2. Types/Interfaces
3. Componente
4. Hooks (useState, useEffect, etc.)
5. Handlers
6. Render/Return

---

### 3.3 API Routes (Next.js)

#### Estrutura de API Route
```typescript
// app/api/notes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth/middleware';
import { NoteService } from '@/lib/services/note.service';
import { createNoteSchema } from '@/lib/validators/note.validator';

export async function GET(request: NextRequest) {
  try {
    // 1. Autenticação
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Extrair parâmetros
    const { searchParams } = new URL(request.url);
    const subMarkerId = searchParams.get('sub_marker_id');

    if (!subMarkerId) {
      return NextResponse.json(
        { error: 'sub_marker_id is required' },
        { status: 400 }
      );
    }

    // 3. Business logic
    const notes = await NoteService.getBySubMarker(subMarkerId, user.id);

    // 4. Response
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Autenticação
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse e validação
    const body = await request.json();
    const validated = createNoteSchema.parse(body);

    // 3. Business logic
    const note = await NoteService.create({
      ...validated,
      user_id: user.id,
    });

    // 4. Response
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### Padrão de Tratamento de Erros
```typescript
try {
  // código
} catch (error) {
  // 1. Erros de validação (400)
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: 'Validation error', details: error.errors },
      { status: 400 }
    );
  }

  // 2. Erros de autorização (401/403)
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 3. Erros de negócio (400)
  if (error instanceof BusinessError) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // 4. Erros genéricos (500)
  console.error('Unexpected error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

---

## 4. Padrões de Design

### 4.1 Service Layer Pattern

#### Estrutura de Service
```typescript
// lib/services/note.service.ts
import { db } from '@/lib/db/client';
import { Note, CreateNoteInput, UpdateNoteInput } from '@/types/note';

export class NoteService {
  /**
   * Busca notas por sub-marcador
   */
  static async getBySubMarker(
    subMarkerId: string,
    userId: string
  ): Promise<Note[]> {
    const result = await db.query(
      `SELECT * FROM notes 
       WHERE sub_marker_id = $1 AND user_id = $2 
       ORDER BY created_at DESC`,
      [subMarkerId, userId]
    );
    return result.rows;
  }

  /**
   * Cria uma nova nota
   */
  static async create(input: CreateNoteInput): Promise<Note> {
    const { sub_marker_id, user_id, title, content } = input;

    // Validação de negócio
    await this.validateSubMarker(sub_marker_id, user_id);

    // Sanitização
    const sanitizedContent = sanitizeHtml(content);

    const result = await db.query(
      `INSERT INTO notes (sub_marker_id, user_id, title, content)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [sub_marker_id, user_id, title, sanitizedContent]
    );

    return result.rows[0];
  }

  /**
   * Valida se sub-marcador pertence ao usuário
   */
  private static async validateSubMarker(
    subMarkerId: string,
    userId: string
  ): Promise<void> {
    const result = await db.query(
      `SELECT user_id FROM sub_markers WHERE id = $1`,
      [subMarkerId]
    );

    if (result.rows.length === 0) {
      throw new Error('Sub-marker not found');
    }

    if (result.rows[0].user_id !== userId) {
      throw new Error('Unauthorized');
    }
  }
}
```

---

### 4.2 Repository Pattern (Opcional)

Para projetos maiores, pode-se usar Repository Pattern:

```typescript
// lib/repositories/note.repository.ts
export class NoteRepository {
  static async findBySubMarker(
    subMarkerId: string,
    userId: string
  ): Promise<Note[]> {
    // Queries SQL
  }

  static async create(data: CreateNoteInput): Promise<Note> {
    // Insert SQL
  }
}

// lib/services/note.service.ts
export class NoteService {
  static async getBySubMarker(...) {
    // Usa Repository
    return NoteRepository.findBySubMarker(...);
  }
}
```

---

### 4.3 Custom Hooks Pattern

#### Estrutura de Hook
```typescript
// hooks/useNotes.ts
import { useState, useEffect } from 'react';
import { Note } from '@/types/note';

interface UseNotesReturn {
  notes: Note[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createNote: (data: CreateNoteInput) => Promise<void>;
}

export function useNotes(subMarkerId: string | null): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    if (!subMarkerId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/notes?sub_marker_id=${subMarkerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (data: CreateNoteInput) => {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    await fetchNotes(); // Refetch
  };

  useEffect(() => {
    fetchNotes();
  }, [subMarkerId]);

  return {
    notes,
    loading,
    error,
    refetch: fetchNotes,
    createNote,
  };
}
```

---

## 5. Boas Práticas

### 5.1 Segurança

#### ✅ Sempre Validar Input
```typescript
// ✅ BOM
const validated = createNoteSchema.parse(body);

// ❌ RUIM
const note = await NoteService.create(body);
```

#### ✅ Sempre Verificar Ownership
```typescript
// ✅ BOM
const note = await NoteService.getById(noteId);
if (note.user_id !== user.id) {
  throw new UnauthorizedError();
}

// ❌ RUIM
const note = await db.query('SELECT * FROM notes WHERE id = $1', [noteId]);
```

#### ✅ Sempre Sanitizar HTML
```typescript
// ✅ BOM
import DOMPurify from 'isomorphic-dompurify';
const sanitized = DOMPurify.sanitize(content);

// ❌ RUIM
const note = { content: userInput }; // XSS risk!
```

---

### 5.2 Performance

#### ✅ Usar Connection Pooling
```typescript
// ✅ BOM: Neon SDK já faz pooling
import { neon } from '@neondatabase/serverless';
const db = neon(process.env.DATABASE_URL);
```

#### ✅ Usar Índices no Banco
```sql
-- ✅ BOM
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_sub_marker_id ON notes(sub_marker_id);
```

#### ✅ Paginação para Listas Grandes
```typescript
// ✅ BOM
const LIMIT = 20;
const OFFSET = (page - 1) * LIMIT;

const result = await db.query(
  `SELECT * FROM notes 
   WHERE user_id = $1 
   ORDER BY created_at DESC 
   LIMIT $2 OFFSET $3`,
  [userId, LIMIT, OFFSET]
);
```

---

### 5.3 Código Limpo

#### ✅ Nomes Descritivos
```typescript
// ✅ BOM
const userNotes = await NoteService.getByUser(userId);

// ❌ RUIM
const data = await NoteService.get(userId);
```

#### ✅ Funções Pequenas e Focadas
```typescript
// ✅ BOM
function validateNoteTitle(title: string): void {
  if (!title || title.trim().length === 0) {
    throw new ValidationError('Title is required');
  }
  if (title.length > 200) {
    throw new ValidationError('Title too long');
  }
}

// ❌ RUIM
function validateNote(note: any): void {
  // 100 linhas de validação...
}
```

#### ✅ Comentários Úteis
```typescript
// ✅ BOM: Explica "por quê", não "o quê"
// Usa connection pooling do Neon SDK para melhor performance
const db = neon(process.env.DATABASE_URL);

// ❌ RUIM: Comentário óbvio
// Cria conexão com banco
const db = neon(process.env.DATABASE_URL);
```

---

## 6. Convenções de Git

### 6.1 Commits

#### Formato
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção

#### Exemplos
```
feat(notes): adiciona criação de notas

Implementa endpoint POST /api/notes com validação
e sanitização de conteúdo rich text.

Closes #123
```

```
fix(auth): corrige validação de token expirado

Token expirado agora retorna 401 ao invés de 500.
```

---

### 6.2 Branches

#### Convenção
- `main`: Produção
- `develop`: Desenvolvimento
- `feature/nome-da-feature`: Nova feature
- `fix/nome-do-fix`: Correção de bug
- `hotfix/nome-do-hotfix`: Hotfix de produção

---

## 7. Testes

### 7.1 Estrutura de Testes

```
src/
├── __tests__/
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   └── api/
│   └── e2e/
│       └── flows/
```

### 7.2 Exemplo de Teste Unitário

```typescript
// __tests__/unit/services/note.service.test.ts
import { NoteService } from '@/lib/services/note.service';
import { db } from '@/lib/db/client';

jest.mock('@/lib/db/client');

describe('NoteService', () => {
  describe('getBySubMarker', () => {
    it('should return notes for a sub-marker', async () => {
      const mockNotes = [
        { id: '1', title: 'Note 1', content: 'Content 1' },
        { id: '2', title: 'Note 2', content: 'Content 2' },
      ];

      (db.query as jest.Mock).mockResolvedValue({
        rows: mockNotes,
      });

      const result = await NoteService.getBySubMarker('sub-1', 'user-1');

      expect(result).toEqual(mockNotes);
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT * FROM notes'),
        ['sub-1', 'user-1']
      );
    });
  });
});
```

---

## 8. Documentação de Código

### 8.1 JSDoc para Funções

```typescript
/**
 * Cria uma nova nota no sistema
 * 
 * @param input - Dados da nota a ser criada
 * @param input.sub_marker_id - ID do sub-marcador
 * @param input.user_id - ID do usuário
 * @param input.title - Título da nota (máx 200 caracteres)
 * @param input.content - Conteúdo em HTML
 * @returns Nota criada
 * @throws {ValidationError} Se dados inválidos
 * @throws {UnauthorizedError} Se usuário não autorizado
 */
static async create(input: CreateNoteInput): Promise<Note> {
  // ...
}
```

---

## 9. Checklist de Desenvolvimento

### 9.1 Antes de Commitar

- [ ] Código segue convenções de nomenclatura
- [ ] Types TypeScript definidos
- [ ] Validação de input implementada
- [ ] Tratamento de erros adequado
- [ ] Comentários em código complexo
- [ ] Testes passando (se houver)
- [ ] Linter sem erros
- [ ] Build sem erros

### 9.2 Antes de Fazer PR

- [ ] Código revisado
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Migrations criadas (se necessário)
- [ ] Variáveis de ambiente documentadas
- [ ] Breaking changes documentados

---

## 10. Recursos e Referências

### 10.1 Documentação
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Neon Docs](https://neon.tech/docs)
- [TipTap Docs](https://tiptap.dev/docs)

### 10.2 Ferramentas
- **ESLint**: Linting
- **Prettier**: Formatação
- **Husky**: Git hooks
- **Jest**: Testes
- **Playwright**: E2E tests

---

**Documento gerado por Arquiteto de Software - Guias de Desenvolvimento**


