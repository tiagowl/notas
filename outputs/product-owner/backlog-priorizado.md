# Backlog Priorizado - Sistema de Gerenciamento de Notas

## Método de Priorização

Utilizamos uma matriz de priorização considerando:
- **Valor de Negócio**: Impacto no usuário e objetivos do produto
- **Esforço de Desenvolvimento**: Complexidade técnica e tempo estimado
- **Dependências**: Bloqueios e pré-requisitos técnicos
- **Riscos**: Impacto de falhas e complexidade de implementação

---

## Sprint 1 - Fundação (MVP Mínimo)

### Prioridade: CRÍTICA 🔴

#### 1. US-001: Login do Usuário
- **Valor de Negócio**: ⭐⭐⭐⭐⭐ (Crítico - segurança e privacidade)
- **Esforço**: ⭐⭐ (Médio - 3 pontos)
- **Dependências**: Nenhuma
- **Riscos**: ⭐⭐ (Médio - autenticação requer cuidado)
- **Justificativa**: Base para todas as outras funcionalidades. Sem autenticação, não há privacidade.

#### 2. US-002: Criar Marcador
- **Valor de Negócio**: ⭐⭐⭐⭐⭐ (Crítico - estrutura base)
- **Esforço**: ⭐ (Baixo - 2 pontos)
- **Dependências**: US-001
- **Riscos**: ⭐ (Baixo)
- **Justificativa**: Primeiro nível da hierarquia. Essencial para organização.

#### 3. US-003: Criar Sub-marcador
- **Valor de Negócio**: ⭐⭐⭐⭐⭐ (Crítico - completa a hierarquia)
- **Esforço**: ⭐ (Baixo - 2 pontos)
- **Dependências**: US-001, US-002
- **Riscos**: ⭐ (Baixo)
- **Justificativa**: Completa a estrutura hierárquica necessária.

---

## Sprint 2 - Funcionalidades Core

### Prioridade: ALTA 🟠

#### 4. US-007: Criar Nota
- **Valor de Negócio**: ⭐⭐⭐⭐⭐ (Crítico - funcionalidade principal)
- **Esforço**: ⭐⭐⭐ (Alto - 5 pontos)
- **Dependências**: US-001, US-002, US-003
- **Riscos**: ⭐⭐⭐ (Alto - integração com rich text)
- **Justificativa**: Funcionalidade central do produto. Usuário precisa criar notas.

#### 5. US-012: Formatação de Texto (Rich Text)
- **Valor de Negócio**: ⭐⭐⭐⭐ (Alto - diferenciação do produto)
- **Esforço**: ⭐⭐⭐⭐ (Muito Alto - 8 pontos)
- **Dependências**: US-007
- **Riscos**: ⭐⭐⭐⭐ (Muito Alto - complexidade do editor)
- **Justificativa**: Requisito explícito. Pode ser implementado em paralelo com US-007, mas integrado depois.

#### 6. US-008: Visualizar Lista de Notas
- **Valor de Negócio**: ⭐⭐⭐⭐ (Alto - navegação essencial)
- **Esforço**: ⭐⭐ (Médio - 3 pontos)
- **Dependências**: US-007
- **Riscos**: ⭐ (Baixo)
- **Justificativa**: Usuário precisa ver suas notas para encontrá-las.

#### 7. US-009: Visualizar Detalhes da Nota
- **Valor de Negócio**: ⭐⭐⭐⭐ (Alto - leitura essencial)
- **Esforço**: ⭐ (Baixo - 2 pontos)
- **Dependências**: US-007, US-012
- **Riscos**: ⭐ (Baixo)
- **Justificativa**: Usuário precisa ler o conteúdo das notas.

---

## Sprint 3 - Funcionalidades de Edição

### Prioridade: MÉDIA 🟡

#### 8. US-010: Editar Nota
- **Valor de Negócio**: ⭐⭐⭐⭐ (Alto - atualização de conteúdo)
- **Esforço**: ⭐⭐⭐ (Alto - 5 pontos)
- **Dependências**: US-007, US-009, US-012
- **Riscos**: ⭐⭐ (Médio - manter integridade dos dados)
- **Justificativa**: Usuários precisam atualizar informações. Funcionalidade essencial.

#### 9. US-004: Visualizar Estrutura de Marcadores
- **Valor de Negócio**: ⭐⭐⭐ (Médio - melhor UX)
- **Esforço**: ⭐⭐ (Médio - 3 pontos)
- **Dependências**: US-002, US-003
- **Riscos**: ⭐ (Baixo)
- **Justificativa**: Melhora a navegação e compreensão da estrutura.

---

## Sprint 4 - Funcionalidades de Gerenciamento

### Prioridade: MÉDIA 🟡

#### 10. US-011: Excluir Nota
- **Valor de Negócio**: ⭐⭐⭐ (Médio - limpeza de dados)
- **Esforço**: ⭐ (Baixo - 2 pontos)
- **Dependências**: US-007
- **Riscos**: ⭐⭐ (Médio - confirmação necessária)
- **Justificativa**: Usuários precisam remover notas antigas.

#### 11. US-005: Editar Marcador/Sub-marcador
- **Valor de Negócio**: ⭐⭐⭐ (Médio - ajustes de organização)
- **Esforço**: ⭐ (Baixo - 2 pontos)
- **Dependências**: US-002, US-003
- **Riscos**: ⭐ (Baixo)
- **Justificativa**: Permite ajustes na organização sem recriar estrutura.

#### 12. US-006: Excluir Marcador/Sub-marcador
- **Valor de Negócio**: ⭐⭐⭐ (Médio - limpeza de estrutura)
- **Esforço**: ⭐⭐ (Médio - 3 pontos)
- **Dependências**: US-002, US-003
- **Riscos**: ⭐⭐⭐ (Alto - impacto em notas vinculadas)
- **Justificativa**: Requer tratamento cuidadoso de notas órfãs. Implementar com cuidado.

---

## Resumo de Priorização

### Por Valor de Negócio
1. US-001, US-002, US-003, US-007 (⭐⭐⭐⭐⭐)
2. US-008, US-009, US-010, US-012 (⭐⭐⭐⭐)
3. US-004, US-005, US-006, US-011 (⭐⭐⭐)

### Por Esforço (Menor para Maior)
- **Baixo (2 pontos)**: US-002, US-003, US-009, US-011, US-005
- **Médio (3 pontos)**: US-001, US-004, US-008, US-006
- **Alto (5 pontos)**: US-007, US-010
- **Muito Alto (8 pontos)**: US-012

### Por Dependências (Ordem de Implementação)
1. **Sem dependências**: US-001
2. **Depende de US-001**: US-002, US-003
3. **Depende de estrutura**: US-007, US-004, US-005, US-006
4. **Depende de notas**: US-008, US-009, US-010, US-011
5. **Depende de editor**: US-012 (integração)

---

## Roadmap Sugerido

### Fase 1: MVP (Sprints 1-2)
**Objetivo**: Sistema funcional básico
- Autenticação
- Estrutura hierárquica (Marcador > Sub-marcador)
- Criar e visualizar notas com rich text

**Entregável**: Usuário pode criar estrutura, criar notas e visualizá-las.

### Fase 2: Funcionalidades Essenciais (Sprint 3)
**Objetivo**: Completar ciclo básico de uso
- Editar notas
- Melhorar navegação

**Entregável**: Usuário pode gerenciar completamente suas notas.

### Fase 3: Refinamento (Sprint 4)
**Objetivo**: Funcionalidades de manutenção
- Excluir notas e marcadores
- Editar estrutura

**Entregável**: Sistema completo com todas as funcionalidades básicas.

---

## Riscos e Mitigações

### Risco Alto: Editor Rich Text (US-012)
- **Mitigação**: Usar biblioteca madura (ex: TipTap, Quill, Slate)
- **Plano B**: Começar com markdown básico, evoluir para rich text

### Risco Médio: Exclusão de Marcadores (US-006)
- **Mitigação**: Definir política clara (mover notas, excluir em cascata, ou impedir exclusão)
- **Validação**: Testar cenários com usuários

### Risco Médio: Integração Neon SDK
- **Mitigação**: Criar POC (Proof of Concept) antes do desenvolvimento completo
- **Validação**: Validar queries e performance

---

## Métricas de Sucesso

- **Sprint 1**: 100% dos usuários conseguem fazer login e criar estrutura
- **Sprint 2**: 100% dos usuários conseguem criar e visualizar notas
- **Sprint 3**: 90% dos usuários conseguem editar notas sem problemas
- **Sprint 4**: 100% das operações de exclusão funcionam corretamente

