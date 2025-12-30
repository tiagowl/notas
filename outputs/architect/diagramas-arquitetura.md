# Diagramas de Arquitetura - Sistema de Gerenciamento de Notas

## 1. Visão Geral

Este documento apresenta os diagramas de arquitetura do sistema de gerenciamento de notas, mostrando a estrutura geral, componentes principais, fluxos de dados e integrações.

**Arquitetura**: Next.js Full-Stack com API Routes e Neon PostgreSQL

---

## 2. Arquitetura Geral do Sistema

### 2.1 Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Next.js Frontend (React)                 │   │
│  │  - Pages (App Router)                                │   │
│  │  - Components                                         │   │
│  │  - Hooks & State Management                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Routes (Backend)                     │   │
│  │  - /api/auth/*        (Autenticação)                  │   │
│  │  - /api/markers/*     (Marcadores)                    │   │
│  │  - /api/sub-markers/* (Sub-marcadores)                │   │
│  │  - /api/notes/*       (Notas)                         │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Business Logic Layer                      │   │
│  │  - Services                                           │   │
│  │  - Validators                                         │   │
│  │  - Auth Middleware                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ Neon SDK
┌─────────────────────────────────────────────────────────────┐
│                    NEON POSTGRESQL                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Database (Serverless)                     │   │
│  │  - users                                              │   │
│  │  - markers                                            │   │
│  │  - sub_markers                                        │   │
│  │  - notes                                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes Principais

#### Frontend (Next.js App Router)
- **Pages**: Rotas da aplicação
- **Components**: Componentes React reutilizáveis
- **Hooks**: Lógica de estado e efeitos
- **Utils**: Funções utilitárias do frontend

#### Backend (API Routes)
- **Auth Routes**: Autenticação e autorização
- **Marker Routes**: CRUD de marcadores
- **SubMarker Routes**: CRUD de sub-marcadores
- **Note Routes**: CRUD de notas

#### Data Layer
- **Neon SDK**: Conexão com banco de dados
- **Database Schema**: Estrutura de tabelas
- **Queries**: Operações de banco de dados

---

## 3. Arquitetura de Camadas

### 3.1 Diagrama de Camadas

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                      │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  React Components                                    │ │
│  │  - UI Components                                     │ │
│  │  - Forms                                            │ │
│  │  - Rich Text Editor                                 │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                      │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Next.js Pages & API Routes                          │ │
│  │  - Page Components                                   │ │
│  │  - API Handlers                                      │ │
│  │  - Route Handlers                                    │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Services                                           │ │
│  │  - AuthService                                      │ │
│  │  - MarkerService                                    │ │
│  │  - SubMarkerService                                 │ │
│  │  - NoteService                                      │ │
│  │                                                     │ │
│  │  Validators                                         │ │
│  │  - Input Validation                                 │ │
│  │  - Business Rules                                    │ │
│  │                                                     │ │
│  │  Middleware                                         │ │
│  │  - Auth Middleware                                  │ │
│  │  - Error Handling                                   │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                     │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Database Layer                                      │ │
│  │  - Neon SDK Client                                  │ │
│  │  - Query Builders                                   │ │
│  │  - Data Mappers                                     │ │
│  │  - Connection Pool                                  │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    DATA STORAGE LAYER                     │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Neon PostgreSQL                                    │ │
│  │  - Tables                                           │ │
│  │  - Indexes                                          │ │
│  │  - Constraints                                      │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Fluxo de Dados

### 4.1 Fluxo: Criar Nota

```
┌──────────┐
│  Cliente │
│ (Browser)│
└────┬─────┘
     │ 1. POST /api/notes
     │    { title, content, sub_marker_id }
     ▼
┌─────────────────────┐
│  Next.js API Route  │
│  /api/notes         │
└────┬────────────────┘
     │ 2. Valida Request
     │    - Auth Middleware
     │    - Input Validation
     ▼
┌─────────────────────┐
│  NoteService        │
│  createNote()       │
└────┬────────────────┘
     │ 3. Business Logic
     │    - Valida sub_marker
     │    - Sanitiza conteúdo
     ▼
┌─────────────────────┐
│  Database Layer     │
│  Neon SDK            │
└────┬────────────────┘
     │ 4. INSERT INTO notes
     │    (title, content, sub_marker_id, user_id)
     ▼
┌─────────────────────┐
│  Neon PostgreSQL    │
│  Database           │
└────┬────────────────┘
     │ 5. Retorna nota criada
     ▼
┌─────────────────────┐
│  Response           │
│  { id, title, ... } │
└────┬────────────────┘
     │ 6. JSON Response
     ▼
┌──────────┐
│  Cliente │
│ (Browser)│
└──────────┘
```

### 4.2 Fluxo: Autenticação

```
┌──────────┐
│  Cliente │
└────┬─────┘
     │ 1. POST /api/auth/login
     │    { email, password }
     ▼
┌─────────────────────┐
│  Auth API Route      │
│  /api/auth/login     │
└────┬────────────────┘
     │ 2. Valida Input
     ▼
┌─────────────────────┐
│  AuthService        │
│  authenticate()      │
└────┬────────────────┘
     │ 3. Busca usuário
     │    SELECT * FROM users
     │    WHERE email = ?
     ▼
┌─────────────────────┐
│  Neon PostgreSQL    │
└────┬────────────────┘
     │ 4. Retorna user
     ▼
┌─────────────────────┐
│  AuthService        │
│  - Verifica senha   │
│  - Gera JWT token   │
└────┬────────────────┘
     │ 5. Cria sessão
     ▼
┌─────────────────────┐
│  Response            │
│  { token, user }     │
└────┬────────────────┘
     │ 6. Set Cookie/Storage
     ▼
┌──────────┐
│  Cliente │
│ (Browser)│
└──────────┘
```

---

## 5. Arquitetura de Banco de Dados

### 5.1 Diagrama Entidade-Relacionamento (ER)

```
┌─────────────┐
│    User     │
├─────────────┤
│ id (PK)     │
│ email       │
│ password    │
│ created_at  │
│ updated_at  │
└──────┬──────┘
       │ 1
       │
       │ N
┌──────▼──────┐      ┌──────────────┐
│   Marker    │      │ SubMarker    │
├─────────────┤      ├──────────────┤
│ id (PK)     │ 1    │ id (PK)      │
│ user_id (FK)│◄─────┤ marker_id(FK)│
│ name        │  N    │ user_id (FK) │
│ created_at  │      │ name         │
│ updated_at  │      │ created_at   │
└─────────────┘      │ updated_at   │
                     └──────┬───────┘
                            │ 1
                            │
                            │ N
                     ┌──────▼──────┐
                     │    Note     │
                     ├─────────────┤
                     │ id (PK)     │
                     │ sub_marker  │
                     │   _id (FK)  │
                     │ user_id(FK) │
                     │ title       │
                     │ content     │
                     │ created_at  │
                     │ updated_at  │
                     └────────────┘
```

### 5.2 Relacionamentos

- **User 1:N Marker**: Um usuário tem muitos marcadores
- **User 1:N SubMarker**: Um usuário tem muitos sub-marcadores
- **User 1:N Note**: Um usuário tem muitas notas
- **Marker 1:N SubMarker**: Um marcador tem muitos sub-marcadores
- **SubMarker 1:N Note**: Um sub-marcador tem muitas notas

---

## 6. Arquitetura de Segurança

### 6.1 Camadas de Segurança

```
┌─────────────────────────────────────────┐
│         SECURITY LAYERS                 │
├─────────────────────────────────────────┤
│                                         │
│  Layer 1: Transport Security           │
│  ┌───────────────────────────────────┐ │
│  │  HTTPS/TLS                       │ │
│  │  - Certificado SSL               │ │
│  │  - Criptografia em trânsito      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Layer 2: Authentication                │
│  ┌───────────────────────────────────┐ │
│  │  JWT Tokens / Sessions            │ │
│  │  - Login/Logout                   │ │
│  │  - Token Validation               │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Layer 3: Authorization                 │
│  ┌───────────────────────────────────┐ │
│  │  Middleware                       │ │
│  │  - Verifica ownership             │ │
│  │  - Role-based access (futuro)    │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Layer 4: Input Validation             │
│  ┌───────────────────────────────────┐ │
│  │  Validators                        │ │
│  │  - Sanitização                    │ │
│  │  - XSS Prevention                  │ │
│  │  - SQL Injection Prevention        │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Layer 5: Data Security                 │
│  ┌───────────────────────────────────┐ │
│  │  Database                          │ │
│  │  - Row-level security              │ │
│  │  - Parameterized queries           │ │
│  │  - Encrypted passwords             │ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 6.2 Fluxo de Autenticação e Autorização

```
Request
   │
   ▼
┌─────────────────┐
│  Auth Middleware│
│  - Verifica JWT │
│  - Extrai user  │
└──────┬──────────┘
       │
       ├─ Token Inválido → 401 Unauthorized
       │
       ├─ Token Válido
       │
       ▼
┌─────────────────┐
│  Authorization  │
│  - Verifica     │
│    ownership    │
└──────┬──────────┘
       │
       ├─ Sem permissão → 403 Forbidden
       │
       ├─ Com permissão
       │
       ▼
┌─────────────────┐
│  Business Logic │
└─────────────────┘
```

---

## 7. Arquitetura de Deploy

### 7.1 Diagrama de Deploy

```
┌─────────────────────────────────────────────┐
│           PRODUCTION ENVIRONMENT            │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │      Vercel / Next.js Hosting        │ │
│  │                                       │ │
│  │  ┌─────────────────────────────────┐ │ │
│  │  │  Next.js Application           │ │ │
│  │  │  - Frontend (SSR/SSG)          │ │ │
│  │  │  - API Routes                  │ │ │
│  │  │  - Edge Functions              │ │ │
│  │  └─────────────────────────────────┘ │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │      Neon PostgreSQL                 │ │
│  │                                       │ │
│  │  ┌─────────────────────────────────┐ │ │
│  │  │  Database Instance              │ │ │
│  │  │  - Serverless                   │ │ │
│  │  │  - Auto-scaling                 │ │ │
│  │  │  - Backups automáticos          │ │ │
│  │  └─────────────────────────────────┘ │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │      Environment Variables            │ │
│  │  - DATABASE_URL                       │ │
│  │  - JWT_SECRET                         │ │
│  │  - NODE_ENV=production                │ │
│  └───────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### 7.2 Fluxo de Deploy

```
┌─────────────┐
│  Git Repo   │
│  (main)     │
└──────┬──────┘
       │
       │ Push
       ▼
┌─────────────┐
│  CI/CD      │
│  - Build    │
│  - Test     │
│  - Deploy   │
└──────┬──────┘
       │
       ├─► Vercel (Next.js)
       │
       └─► Neon (Database Migrations)
```

---

## 8. Arquitetura de Componentes Frontend

### 8.1 Estrutura de Componentes

```
┌─────────────────────────────────────┐
│         App Layout                   │
│  ┌───────────────────────────────┐   │
│  │  Header                       │   │
│  │  - Logo                        │   │
│  │  - User Menu                   │   │
│  └───────────────────────────────┘   │
│  ┌───────────────────────────────┐   │
│  │  Sidebar                       │   │
│  │  - MarkerList                  │   │
│  │  - SubMarkerList               │   │
│  └───────────────────────────────┘   │
│  ┌───────────────────────────────┐   │
│  │  Main Content                 │   │
│  │  - NoteList / NoteEditor       │   │
│  │  - RichTextEditor              │   │
│  └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 8.2 Fluxo de Estado

```
┌─────────────────┐
│  User Action     │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  React Hook     │
│  (useState/     │
│   useReducer)   │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  API Call       │
│  (fetch/axios)  │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  API Route      │
│  (Next.js)      │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Database       │
│  (Neon)         │
└─────────────────┘
```

---

## 9. Diagrama de Sequência: Criar Nota Completo

```
Cliente    API Route    AuthService    NoteService    Database
   │            │            │             │            │
   │──POST──────>│            │             │            │
   │            │            │             │            │
   │            │──auth─────>│             │            │
   │            │<──user─────│             │            │
   │            │            │             │            │
   │            │──validate──>│            │            │
   │            │<──valid─────│            │            │
   │            │            │             │            │
   │            │─────────────createNote──>│            │
   │            │            │             │            │
   │            │            │             │──INSERT───>│
   │            │            │             │<──note─────│
   │            │            │             │            │
   │            │<───────────note──────────│            │
   │            │            │             │            │
   │<──201───────│            │             │            │
   │            │            │             │            │
```

---

## 10. Arquitetura de Performance

### 10.1 Estratégias de Otimização

```
┌─────────────────────────────────────┐
│    PERFORMANCE OPTIMIZATIONS        │
├─────────────────────────────────────┤
│                                     │
│  Frontend:                          │
│  - SSR/SSG (Next.js)                │
│  - Code Splitting                   │
│  - Lazy Loading                     │
│  - Image Optimization               │
│  - Caching (Browser)                │
│                                     │
│  Backend:                           │
│  - Connection Pooling (Neon)        │
│  - Query Optimization               │
│  - Indexes                          │
│  - Caching (Redis - futuro)         │
│                                     │
│  Database:                          │
│  - Indexes on user_id, foreign keys│
│  - Pagination                       │
│  - Virtual Scrolling (frontend)     │
│                                     │
└─────────────────────────────────────┘
```

---

## 11. Notações e Convenções

### 11.1 Símbolos Utilizados
- **→**: Fluxo de dados/direção
- **↕**: Comunicação bidirecional
- **┌─┐**: Container/Componente
- **├─┤**: Separação de seções
- **│**: Conexão vertical
- **─**: Conexão horizontal

### 11.2 Convenções de Nomenclatura
- **PascalCase**: Componentes React
- **camelCase**: Funções, variáveis
- **UPPER_SNAKE_CASE**: Constantes, env vars
- **kebab-case**: Arquivos, rotas

---

**Documento gerado por Arquiteto de Software - Diagramas de Arquitetura**



