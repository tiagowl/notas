# Decisões Arquiteturais (ADRs) - Sistema de Gerenciamento de Notas

## 1. Visão Geral

Este documento registra as decisões arquiteturais importantes (Architecture Decision Records - ADRs) tomadas durante o desenvolvimento do sistema de gerenciamento de notas.

**Formato**: Cada ADR segue o padrão:
- **Status**: Proposta, Aceita, Depreciada, Substituída
- **Contexto**: Situação que levou à decisão
- **Decisão**: Decisão tomada
- **Consequências**: Impactos positivos e negativos

---

## ADR-001: Uso do Next.js como Framework Full-Stack

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
O sistema precisa de uma aplicação web full-stack com:
- Frontend React moderno
- Backend API para operações CRUD
- SSR/SSG para performance
- Deploy simplificado
- Integração com banco de dados serverless

### Decisão
Utilizar **Next.js 14+ com App Router** como framework principal, aproveitando:
- API Routes para backend
- Server Components para SSR
- TypeScript nativo
- Otimizações automáticas

### Consequências

**Positivas**:
- ✅ Desenvolvimento rápido com stack unificado
- ✅ Deploy simplificado (Vercel)
- ✅ Performance otimizada automaticamente
- ✅ TypeScript nativo
- ✅ Comunidade grande e ativa

**Negativas**:
- ⚠️ Curva de aprendizado para App Router (novo)
- ⚠️ Acoplamento com ecossistema Next.js
- ⚠️ Menos flexibilidade que stack separada

**Alternativas Consideradas**:
- Remix (menor ecossistema)
- Express + React separado (mais complexo)
- SvelteKit (menor comunidade)

---

## ADR-002: Neon PostgreSQL como Banco de Dados

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Requisito explícito de usar Neon SDK para interação direta com banco de dados PostgreSQL serverless. Necessidade de:
- Banco relacional para estrutura hierárquica
- Serverless para escalabilidade automática
- SDK nativo para integração

### Decisão
Utilizar **Neon PostgreSQL** com **@neondatabase/serverless** SDK para:
- Conexões serverless
- Auto-scaling
- Backups automáticos
- Integração direta via SDK

### Consequências

**Positivas**:
- ✅ Serverless = sem gerenciamento de servidor
- ✅ Auto-scaling automático
- ✅ Backups automáticos
- ✅ SDK otimizado para serverless
- ✅ Compatível com PostgreSQL padrão

**Negativas**:
- ⚠️ Vendor lock-in com Neon
- ⚠️ Limites de conexões simultâneas (serverless)
- ⚠️ Cold starts possíveis

**Alternativas Consideradas**:
- Supabase (mais features, mas não era requisito)
- PlanetScale (MySQL, não PostgreSQL)
- Self-hosted PostgreSQL (mais complexo)

---

## ADR-003: Autenticação com JWT ao invés de Sessions

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Sistema precisa de autenticação simples e stateless. Opções:
- JWT (stateless, escalável)
- Sessions (stateful, requer storage)

### Decisão
Implementar autenticação com **JWT tokens**:
- Tokens armazenados em httpOnly cookies ou localStorage
- Expiração configurável (7 dias padrão)
- Refresh tokens (futuro)

### Consequências

**Positivas**:
- ✅ Stateless = escalável
- ✅ Funciona bem com serverless
- ✅ Não requer storage de sessões
- ✅ Fácil de implementar

**Negativas**:
- ⚠️ Tokens não podem ser revogados facilmente
- ⚠️ Tamanho maior que session IDs
- ⚠️ Requer cuidado com segurança (XSS)

**Alternativas Consideradas**:
- NextAuth.js (mais complexo, mas mais features)
- Sessions com Redis (requer infraestrutura adicional)

---

## ADR-004: Editor Rich Text - TipTap

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Requisito de editor rich text para conteúdo das notas. Opções principais:
- TipTap (moderno, extensível)
- Quill (maduro, simples)
- Slate (flexível, complexo)
- Draft.js (Facebook, menos mantido)

### Decisão
Utilizar **TipTap** como editor rich text:
- Framework moderno e ativo
- Extensível e customizável
- Boa integração com React
- Suporte a formatações necessárias

### Consequências

**Positivas**:
- ✅ API moderna e intuitiva
- ✅ Extensível para futuras features
- ✅ Boa performance
- ✅ Comunidade ativa
- ✅ TypeScript nativo

**Negativas**:
- ⚠️ Curva de aprendizado inicial
- ⚠️ Bundle size maior que Quill
- ⚠️ Menos maduro que Quill

**Alternativas Consideradas**:
- Quill (mais simples, menos extensível)
- Slate (muito flexível, muito complexo)

---

## ADR-005: Estrutura de Código - App Router do Next.js

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Next.js oferece dois sistemas de roteamento:
- Pages Router (legado, estável)
- App Router (novo, mais features)

### Decisão
Utilizar **App Router** do Next.js:
- Server Components por padrão
- Layouts aninhados
- Loading e Error states nativos
- Melhor performance

### Consequências

**Positivas**:
- ✅ Server Components = melhor performance
- ✅ Layouts aninhados = melhor organização
- ✅ Features modernas do React
- ✅ Futuro do Next.js

**Negativas**:
- ⚠️ Mais novo, menos documentação
- ⚠️ Algumas features ainda em beta
- ⚠️ Migração futura se mudar de ideia é complexa

**Alternativas Consideradas**:
- Pages Router (mais estável, menos features)

---

## ADR-006: Validação com Zod ao invés de Yup

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Necessidade de validação de schemas para:
- Validação de API requests
- Validação de formulários
- Type safety com TypeScript

### Decisão
Utilizar **Zod** para validação:
- TypeScript-first
- Inferência de tipos automática
- API simples e intuitiva
- Boa integração com React Hook Form

### Consequências

**Positivas**:
- ✅ Type safety completo
- ✅ Inferência de tipos automática
- ✅ API moderna e limpa
- ✅ Boa performance

**Negativas**:
- ⚠️ Bundle size maior que Yup
- ⚠️ Menos maduro que Yup

**Alternativas Consideradas**:
- Yup (mais maduro, menos type-safe)
- Joi (mais pesado)

---

## ADR-007: Sem ORM - Queries SQL Diretas

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Requisito de usar Neon SDK diretamente. Opções:
- ORM (Prisma, Drizzle) - abstração
- SQL direto - controle total

### Decisão
Utilizar **queries SQL diretas** com Neon SDK:
- Controle total sobre queries
- Performance otimizada
- Menos abstração = menos problemas
- Alinhado com requisito de usar SDK diretamente

### Consequências

**Positivas**:
- ✅ Performance otimizada
- ✅ Controle total
- ✅ Sem dependências extras
- ✅ Queries explícitas e claras

**Negativas**:
- ⚠️ Mais código manual
- ⚠️ Sem type safety automático
- ⚠️ Migrations manuais (ou sem ORM)

**Alternativas Consideradas**:
- Prisma (type-safe, mas mais complexo)
- Drizzle (leve, mas ainda abstração)

---

## ADR-008: Estrutura de Pastas - Feature-based

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Organização do código pode ser:
- Por tipo (components/, services/, etc.)
- Por feature (markers/, notes/, etc.)

### Decisão
Utilizar estrutura **híbrida**:
- Componentes por feature quando específicos
- Componentes UI genéricos em ui/
- Services e validators por feature
- Types centralizados

### Consequências

**Positivas**:
- ✅ Fácil encontrar código relacionado
- ✅ Escalável para novas features
- ✅ Separação clara de responsabilidades

**Negativas**:
- ⚠️ Pode haver duplicação
- ⚠️ Requer disciplina para manter organização

**Alternativas Consideradas**:
- Estrutura totalmente por tipo (mais difícil navegar)
- Estrutura totalmente por feature (mais duplicação)

---

## ADR-009: Deploy - Vercel

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Next.js precisa de hosting compatível. Opções:
- Vercel (criado pelo Next.js)
- Netlify (alternativa)
- Self-hosted (mais complexo)

### Decisão
Utilizar **Vercel** para deploy:
- Otimizado para Next.js
- Deploy automático
- Edge Functions
- Analytics integrado

### Consequências

**Positivas**:
- ✅ Deploy automático do GitHub
- ✅ Otimizações automáticas
- ✅ Edge Functions disponíveis
- ✅ Analytics integrado
- ✅ SSL automático

**Negativas**:
- ⚠️ Vendor lock-in
- ⚠️ Limites no plano gratuito
- ⚠️ Menos controle que self-hosted

**Alternativas Consideradas**:
- Netlify (similar, mas menos otimizado para Next.js)
- Railway (mais flexível, menos otimizado)
- Self-hosted (mais controle, mais complexo)

---

## ADR-010: Política de Exclusão - Restrição ao invés de Cascata

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Ao excluir marcador/sub-marcador, opções:
- **Cascata**: Exclui tudo automaticamente
- **Restrição**: Impede exclusão se houver dependências
- **Mover**: Move dependências antes de excluir

### Decisão
Implementar **Restrição** como política padrão:
- Impede exclusão de marcador se houver sub-marcadores
- Impede exclusão de sub-marcador se houver notas
- Retorna erro claro explicando o motivo
- Usuário deve excluir dependências primeiro

### Consequências

**Positivas**:
- ✅ Previne perda acidental de dados
- ✅ Usuário tem controle explícito
- ✅ Mais seguro

**Negativas**:
- ⚠️ Requer múltiplas operações para excluir estrutura completa
- ⚠️ Pode ser frustrante para usuários

**Alternativas Consideradas**:
- Cascata (mais rápido, mas perigoso)
- Mover para marcador padrão (mais complexo)

**Nota**: Pode ser configurável no futuro ou oferecer opção de cascata com confirmação.

---

## ADR-011: Formato de Conteúdo Rich Text - HTML

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Conteúdo rich text pode ser armazenado como:
- HTML (padrão web)
- Markdown (mais simples)
- JSON (TipTap Document)

### Decisão
Armazenar como **HTML** no banco de dados:
- Formato padrão da web
- Fácil de renderizar
- Compatível com TipTap
- Simples de sanitizar

### Consequências

**Positivas**:
- ✅ Fácil de renderizar (dangerouslySetInnerHTML)
- ✅ Formato padrão
- ✅ Compatível com TipTap
- ✅ Fácil de exportar

**Negativas**:
- ⚠️ Requer sanitização rigorosa (XSS)
- ⚠️ Tamanho maior que Markdown
- ⚠️ Menos legível em raw

**Alternativas Consideradas**:
- JSON (TipTap Document) - mais estruturado, mas requer parser
- Markdown - mais simples, mas menos formatação

**Nota**: Sanitização com DOMPurify ou similar é obrigatória.

---

## ADR-012: TypeScript Strict Mode

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
TypeScript pode ser usado em modo:
- Loose (mais permissivo)
- Strict (mais rigoroso)

### Decisão
Habilitar **TypeScript Strict Mode**:
- `strict: true` no tsconfig.json
- Type safety máximo
- Previne bugs em tempo de compilação

### Consequências

**Positivas**:
- ✅ Type safety máximo
- ✅ Previne muitos bugs
- ✅ Melhor autocomplete
- ✅ Refatoração mais segura

**Negativas**:
- ⚠️ Mais código necessário (type annotations)
- ⚠️ Pode ser frustrante inicialmente
- ⚠️ Requer disciplina da equipe

**Alternativas Consideradas**:
- Loose mode (mais rápido desenvolver, menos seguro)

---

## ADR-013: Sem State Management Global Inicial

**Status**: ✅ Aceita  
**Data**: 2024-01-01  
**Autor**: Arquiteto de Software

### Contexto
Estado da aplicação pode ser gerenciado com:
- Context API + useState (simples)
- Zustand/Redux (global state)
- React Query (server state)

### Decisão
Começar com **Context API + useState** e **React Hooks customizados**:
- Simples para começar
- Evita over-engineering
- Pode evoluir para Zustand/React Query se necessário

### Consequências

**Positivas**:
- ✅ Simples de implementar
- ✅ Sem dependências extras
- ✅ Fácil de entender
- ✅ Pode evoluir depois

**Negativas**:
- ⚠️ Pode ficar complexo com muitos estados
- ⚠️ Re-renders podem ser ineficientes

**Alternativas Consideradas**:
- Zustand (leve, mas desnecessário inicialmente)
- React Query (ótimo para server state, mas complexo)

**Nota**: Reavaliar quando aplicação crescer. React Query pode ser útil para cache de dados do servidor.

---

## 14. Resumo das Decisões

| ADR | Decisão | Status |
|-----|---------|--------|
| ADR-001 | Next.js Full-Stack | ✅ Aceita |
| ADR-002 | Neon PostgreSQL | ✅ Aceita |
| ADR-003 | JWT Authentication | ✅ Aceita |
| ADR-004 | TipTap Editor | ✅ Aceita |
| ADR-005 | App Router | ✅ Aceita |
| ADR-006 | Zod Validation | ✅ Aceita |
| ADR-007 | SQL Direto (sem ORM) | ✅ Aceita |
| ADR-008 | Estrutura Híbrida | ✅ Aceita |
| ADR-009 | Vercel Deploy | ✅ Aceita |
| ADR-010 | Restrição de Exclusão | ✅ Aceita |
| ADR-011 | HTML para Rich Text | ✅ Aceita |
| ADR-012 | TypeScript Strict | ✅ Aceita |
| ADR-013 | Context API (sem Redux) | ✅ Aceita |

---

**Documento gerado por Arquiteto de Software - Decisões Arquiteturais (ADRs)**



