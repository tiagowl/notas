# Documentação Técnica - Sistema de Gerenciamento de Notas

## 1. Visão Geral Técnica

Este documento apresenta a documentação técnica completa do sistema de gerenciamento de notas, incluindo stack tecnológica, estrutura de código, APIs, banco de dados e configurações.

**Versão**: 1.0  
**Última Atualização**: 2024

---

## 2. Stack Tecnológica

### 2.1 Frontend

#### Framework
- **Next.js 14+** (App Router)
  - React 18+
  - TypeScript
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - API Routes

#### Bibliotecas Principais
- **React**: Biblioteca de UI
- **TypeScript**: Tipagem estática
- **TipTap**: Editor rich text
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas

#### Estilização
- **Tailwind CSS**: Framework CSS utility-first
- **CSS Modules**: Estilos modulares (alternativa)

### 2.2 Backend

#### Runtime
- **Node.js 18+**: Runtime JavaScript
- **Next.js API Routes**: Endpoints backend

#### Autenticação
- **NextAuth.js** (opcional) ou implementação customizada
- **JWT**: Tokens de autenticação
- **bcrypt**: Hash de senhas

### 2.3 Banco de Dados

#### Database
- **Neon PostgreSQL**: Banco de dados serverless
- **PostgreSQL 16**: Versão do banco

#### SDK e Drivers
- **@neondatabase/serverless**: SDK oficial do Neon
- **Connection Pooling**: Gerenciamento de conexões

### 2.4 DevOps e Deploy

#### Hosting
- **Vercel**: Deploy do Next.js (recomendado)
- **Alternativas**: Netlify, Railway, AWS

#### CI/CD
- **GitHub Actions**: Automação de deploy
- **Vercel CLI**: Deploy via CLI

#### Monitoramento
- **Vercel Analytics**: Métricas de performance
- **Sentry** (opcional): Error tracking

---

## 3. Estrutura de Código

### 3.1 Estrutura de Diretórios

```
notas/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Grupo de rotas de autenticação
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/          # Rotas autenticadas
│   │   │   ├── layout.tsx       # Layout com sidebar
│   │   │   ├── page.tsx        # Dashboard principal
│   │   │   └── notes/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   └── api/                 # API Routes
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   │   └── route.ts
│   │       │   ├── logout/
│   │       │   │   └── route.ts
│   │       │   └── me/
│   │       │       └── route.ts
│   │       ├── markers/
│   │       │   ├── route.ts    # GET, POST
│   │       │   └── [id]/
│   │       │       └── route.ts # GET, PUT, DELETE
│   │       ├── sub-markers/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       └── notes/
│   │           ├── route.ts
│   │           └── [id]/
│   │               └── route.ts
│   ├── components/              # Componentes React
│   │   ├── ui/                  # Componentes de UI base
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Card.tsx
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── markers/             # Componentes específicos
│   │   │   ├── MarkerList.tsx
│   │   │   ├── MarkerItem.tsx
│   │   │   └── CreateMarkerModal.tsx
│   │   ├── sub-markers/
│   │   │   ├── SubMarkerList.tsx
│   │   │   └── CreateSubMarkerModal.tsx
│   │   ├── notes/
│   │   │   ├── NoteList.tsx
│   │   │   ├── NoteItem.tsx
│   │   │   ├── NoteEditor.tsx
│   │   │   └── NoteViewer.tsx
│   │   └── editor/              # Editor rich text
│   │       ├── RichTextEditor.tsx
│   │       └── Toolbar.tsx
│   ├── lib/                      # Bibliotecas e utilitários
│   │   ├── db/                   # Database
│   │   │   ├── client.ts        # Cliente Neon
│   │   │   ├── queries/          # Queries SQL
│   │   │   │   ├── markers.ts
│   │   │   │   ├── sub-markers.ts
│   │   │   │   └── notes.ts
│   │   │   └── migrations/      # Migrations (se usar)
│   │   ├── auth/                 # Autenticação
│   │   │   ├── middleware.ts
│   │   │   ├── jwt.ts
│   │   │   └── password.ts
│   │   ├── services/             # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── marker.service.ts
│   │   │   ├── sub-marker.service.ts
│   │   │   └── note.service.ts
│   │   ├── validators/           # Validações
│   │   │   ├── auth.validator.ts
│   │   │   ├── marker.validator.ts
│   │   │   └── note.validator.ts
│   │   └── utils/                # Utilitários
│   │       ├── errors.ts
│   │       ├── responses.ts
│   │       └── sanitize.ts
│   ├── hooks/                    # React Hooks customizados
│   │   ├── useAuth.ts
│   │   ├── useMarkers.ts
│   │   ├── useNotes.ts
│   │   └── useEditor.ts
│   ├── types/                    # TypeScript types
│   │   ├── user.ts
│   │   ├── marker.ts
│   │   ├── sub-marker.ts
│   │   ├── note.ts
│   │   └── api.ts
│   └── styles/                   # Estilos globais
│       └── globals.css
├── public/                       # Arquivos estáticos
│   ├── images/
│   └── icons/
├── .env.local                    # Variáveis de ambiente (local)
├── .env.example                  # Exemplo de variáveis
├── next.config.js                # Configuração Next.js
├── tailwind.config.js            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
├── package.json                  # Dependências
└── README.md                     # Documentação do projeto
```

---

## 4. API Documentation

### 4.1 Autenticação

#### POST /api/auth/login
**Descrição**: Autentica um usuário

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response 200**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

**Response 401**:
```json
{
  "error": "Invalid credentials"
}
```

---

#### POST /api/auth/logout
**Descrição**: Faz logout do usuário

**Headers**:
- `Authorization: Bearer <token>`

**Response 200**:
```json
{
  "message": "Logged out successfully"
}
```

---

#### GET /api/auth/me
**Descrição**: Retorna informações do usuário autenticado

**Headers**:
- `Authorization: Bearer <token>`

**Response 200**:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 4.2 Marcadores

#### GET /api/markers
**Descrição**: Lista todos os marcadores do usuário

**Headers**:
- `Authorization: Bearer <token>`

**Response 200**:
```json
[
  {
    "id": "uuid",
    "name": "Trabalho",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

---

#### POST /api/markers
**Descrição**: Cria um novo marcador

**Headers**:
- `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "Trabalho"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "name": "Trabalho",
  "user_id": "uuid",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### PUT /api/markers/[id]
**Descrição**: Atualiza um marcador

**Headers**:
- `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "Trabalho Atualizado"
}
```

**Response 200**:
```json
{
  "id": "uuid",
  "name": "Trabalho Atualizado",
  "updated_at": "2024-01-02T00:00:00Z"
}
```

---

#### DELETE /api/markers/[id]
**Descrição**: Exclui um marcador

**Headers**:
- `Authorization: Bearer <token>`

**Response 200**:
```json
{
  "message": "Marker deleted successfully"
}
```

**Response 400**:
```json
{
  "error": "Cannot delete marker with sub-markers"
}
```

---

### 4.3 Sub-marcadores

#### GET /api/sub-markers?marker_id=[id]
**Descrição**: Lista sub-marcadores de um marcador

**Headers**:
- `Authorization: Bearer <token>`

**Query Parameters**:
- `marker_id` (required): ID do marcador pai

**Response 200**:
```json
[
  {
    "id": "uuid",
    "name": "Projetos 2024",
    "marker_id": "uuid",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

#### POST /api/sub-markers
**Descrição**: Cria um novo sub-marcador

**Request Body**:
```json
{
  "name": "Projetos 2024",
  "marker_id": "uuid"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "name": "Projetos 2024",
  "marker_id": "uuid",
  "user_id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 4.4 Notas

#### GET /api/notes?sub_marker_id=[id]
**Descrição**: Lista notas de um sub-marcador

**Query Parameters**:
- `sub_marker_id` (required): ID do sub-marcador

**Response 200**:
```json
[
  {
    "id": "uuid",
    "title": "Reunião de Planejamento",
    "content": "<p>Conteúdo em HTML</p>",
    "sub_marker_id": "uuid",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

#### GET /api/notes/[id]
**Descrição**: Obtém uma nota específica

**Response 200**:
```json
{
  "id": "uuid",
  "title": "Reunião de Planejamento",
  "content": "<p>Conteúdo em HTML</p>",
  "sub_marker_id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

#### POST /api/notes
**Descrição**: Cria uma nova nota

**Request Body**:
```json
{
  "title": "Reunião de Planejamento",
  "content": "<p>Conteúdo em HTML</p>",
  "sub_marker_id": "uuid"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "title": "Reunião de Planejamento",
  "content": "<p>Conteúdo em HTML</p>",
  "sub_marker_id": "uuid",
  "user_id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

#### PUT /api/notes/[id]
**Descrição**: Atualiza uma nota

**Request Body**:
```json
{
  "title": "Reunião de Planejamento - Atualizado",
  "content": "<p>Conteúdo atualizado</p>"
}
```

**Response 200**:
```json
{
  "id": "uuid",
  "title": "Reunião de Planejamento - Atualizado",
  "content": "<p>Conteúdo atualizado</p>",
  "updated_at": "2024-01-02T00:00:00Z"
}
```

---

#### DELETE /api/notes/[id]
**Descrição**: Exclui uma nota

**Response 200**:
```json
{
  "message": "Note deleted successfully"
}
```

---

## 5. Banco de Dados

### 5.1 Schema do Banco de Dados

#### Tabela: users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

#### Tabela: markers
```sql
CREATE TABLE markers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_markers_user_id ON markers(user_id);
```

#### Tabela: sub_markers
```sql
CREATE TABLE sub_markers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marker_id UUID NOT NULL REFERENCES markers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sub_markers_marker_id ON sub_markers(marker_id);
CREATE INDEX idx_sub_markers_user_id ON sub_markers(user_id);
```

#### Tabela: notes
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sub_marker_id UUID NOT NULL REFERENCES sub_markers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notes_sub_marker_id ON notes(sub_marker_id);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_created_at ON notes(created_at DESC);
```

---

### 5.2 Queries Principais

#### Buscar Marcadores do Usuário
```sql
SELECT * FROM markers
WHERE user_id = $1
ORDER BY created_at DESC;
```

#### Buscar Sub-marcadores de um Marcador
```sql
SELECT * FROM sub_markers
WHERE marker_id = $1 AND user_id = $2
ORDER BY created_at DESC;
```

#### Buscar Notas de um Sub-marcador
```sql
SELECT * FROM notes
WHERE sub_marker_id = $1 AND user_id = $2
ORDER BY created_at DESC;
```

#### Criar Nota
```sql
INSERT INTO notes (sub_marker_id, user_id, title, content)
VALUES ($1, $2, $3, $4)
RETURNING *;
```

---

## 6. Configuração e Variáveis de Ambiente

### 6.1 Variáveis de Ambiente

#### .env.local
```env
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Neon
NEON_API_KEY=your-neon-api-key
```

### 6.2 Configuração Next.js

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
}

module.exports = nextConfig
```

---

## 7. Segurança

### 7.1 Autenticação
- JWT tokens com expiração
- Senhas hasheadas com bcrypt (salt rounds: 10)
- HTTPS obrigatório em produção

### 7.2 Validação
- Validação de input em todas as rotas
- Sanitização de conteúdo rich text
- Proteção contra XSS
- Proteção contra SQL Injection (parameterized queries)

### 7.3 Autorização
- Verificação de ownership em todas as operações
- Middleware de autenticação em rotas protegidas
- Row-level security no banco (futuro)

---

## 8. Performance

### 8.1 Otimizações Frontend
- Code splitting automático (Next.js)
- Lazy loading de componentes
- Image optimization
- Static generation quando possível

### 8.2 Otimizações Backend
- Connection pooling (Neon SDK)
- Índices no banco de dados
- Paginação para listas grandes
- Caching (futuro: Redis)

---

## 9. Testes

### 9.1 Estratégia de Testes
- **Unit Tests**: Services, validators, utils
- **Integration Tests**: API routes
- **E2E Tests**: Fluxos principais (Playwright)

### 9.2 Ferramentas
- **Jest**: Framework de testes
- **React Testing Library**: Testes de componentes
- **Playwright**: Testes E2E

---

## 10. Deploy

### 10.1 Vercel
1. Conectar repositório GitHub
2. Configurar variáveis de ambiente
3. Deploy automático em push para main

### 10.2 Neon
1. Criar projeto no Neon
2. Configurar DATABASE_URL
3. Executar migrations

---

**Documento gerado por Arquiteto de Software - Documentação Técnica**



