# Wireframes - Sistema de Gerenciamento de Notas

## 1. Visão Geral

Este documento apresenta os wireframes do sistema de gerenciamento de notas, focando em fluxos de navegação, hierarquia de informação, interações do usuário e responsividade.

**Metodologia**: Wireframes de baixa fidelidade focados em estrutura e fluxo, não em design visual.

---

## 2. Princípios de Design dos Wireframes

### 2.1 Hierarquia de Informação
- **Primária**: Conteúdo atual (nota sendo visualizada/editada)
- **Secundária**: Navegação e estrutura (marcadores, sub-marcadores)
- **Terciária**: Ações e controles (botões, menus)

### 2.2 Fluxo de Navegação
- **Vertical**: Navegação hierárquica (Marcador > Sub-marcador > Notas)
- **Horizontal**: Navegação entre notas do mesmo sub-marcador
- **Breadcrumbs**: Indicação clara da localização atual

### 2.3 Responsividade
- **Desktop**: Layout de 3 colunas (sidebar, lista, conteúdo)
- **Tablet**: Layout de 2 colunas (sidebar colapsável, conteúdo)
- **Mobile**: Layout de 1 coluna (navegação por tabs/drawer)

---

## 3. Wireframes por Tela

### 3.1 Tela de Login

```
┌─────────────────────────────────────┐
│                                     │
│         [Logo do Sistema]           │
│                                     │
│    ┌─────────────────────────┐     │
│    │   Email                │     │
│    └─────────────────────────┘     │
│                                     │
│    ┌─────────────────────────┐     │
│    │   Senha                │     │
│    └─────────────────────────┘     │
│                                     │
│    [ ] Lembrar-me                   │
│                                     │
│    ┌─────────────────────────┐     │
│    │      Entrar            │     │
│    └─────────────────────────┘     │
│                                     │
│    Esqueceu a senha?                │
│                                     │
└─────────────────────────────────────┘
```

**Elementos**:
- Logo centralizado
- Campos de email e senha
- Checkbox "Lembrar-me"
- Botão de login
- Link "Esqueceu a senha?"

**Comportamento**:
- Validação em tempo real
- Mensagem de erro abaixo dos campos
- Loading no botão durante autenticação

---

### 3.2 Dashboard (Primeiro Acesso)

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]                    [Nome Usuário] [Logout]      │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│          │    👋 Bem-vindo ao Sistema de Notas!        │
│          │                                              │
│          │    Vamos começar criando sua primeira        │
│          │    estrutura de organização.                 │
│          │                                              │
│          │    ┌──────────────────────────────────┐     │
│          │    │  + Criar Primeiro Marcador      │     │
│          │    └──────────────────────────────────┘     │
│          │                                              │
│          │    💡 Dica: Crie marcadores para            │
│          │        organizar suas notas por tema        │
│          │                                              │
│          │    Exemplos:                                │
│          │    • Trabalho                               │
│          │    • Estudos                                │
│          │    • Pessoal                                │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

**Elementos**:
- Header com logo e informações do usuário
- Mensagem de boas-vindas
- Call-to-action destacado
- Dicas contextuais
- Exemplos de uso

**Comportamento**:
- Aparece apenas no primeiro acesso
- Botão leva para criação de marcador
- Pode ser fechado (mas aparece novamente se não houver estrutura)

---

### 3.3 Dashboard (Com Estrutura)

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]                    [Nome Usuário] [Logout]      │
├──────────┬──────────────┬───────────────────────────────┤
│          │              │                               │
│ Marcador │ Sub-marcador │  Lista de Notas              │
│          │              │                               │
│ 📁 Trabalho│            │  ┌─────────────────────┐     │
│   📂 Projetos│          │  │ 📄 Reunião 01/01    │     │
│   📂 Clientes│          │  │ 📄 Planejamento     │     │
│          │              │  │ 📄 Decisões         │     │
│ 📁 Estudos│            │  └─────────────────────┘     │
│   📂 Matemática│        │                               │
│   📂 História│          │  ┌─────────────────────┐     │
│          │              │  │   + Nova Nota       │     │
│ [+ Novo] │              │  └─────────────────────┘     │
│          │              │                               │
└──────────┴──────────────┴───────────────────────────────┘
```

**Elementos**:
- **Coluna 1**: Lista de marcadores (hierárquica)
- **Coluna 2**: Lista de sub-marcadores do marcador selecionado
- **Coluna 3**: Lista de notas do sub-marcador selecionado
- Botões de ação em cada coluna

**Comportamento**:
- Seleção de marcador mostra sub-marcadores
- Seleção de sub-marcador mostra notas
- Clique em nota abre visualização
- Botões "+ Novo" em cada nível

---

### 3.4 Criação de Marcador

```
┌─────────────────────────────────────┐
│  ✕                                  │
│                                     │
│  Criar Novo Marcador                │
│                                     │
│  Nome do Marcador                   │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  💡 Exemplos: Trabalho, Estudos,    │
│     Pessoal, Projetos               │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ Cancelar │  │  Criar    │       │
│  └──────────┘  └──────────┘       │
│                                     │
└─────────────────────────────────────┘
```

**Elementos**:
- Modal ou drawer
- Campo de texto para nome
- Dicas contextuais
- Botões de ação

**Comportamento**:
- Validação: nome obrigatório, máximo 100 caracteres
- Feedback visual de validação
- Fecha ao clicar fora ou em Cancelar

---

### 3.5 Criação de Sub-marcador

```
┌─────────────────────────────────────┐
│  ✕                                  │
│                                     │
│  Criar Novo Sub-marcador            │
│                                     │
│  Marcador Pai                       │
│  ┌─────────────────────────────┐   │
│  │ Trabalho            ▼       │   │
│  └─────────────────────────────┘   │
│                                     │
│  Nome do Sub-marcador               │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ Cancelar │  │  Criar    │       │
│  └──────────┘  └──────────┘       │
│                                     │
└─────────────────────────────────────┘
```

**Elementos**:
- Modal ou drawer
- Dropdown para selecionar marcador pai
- Campo de texto para nome
- Botões de ação

**Comportamento**:
- Validação: marcador pai obrigatório, nome obrigatório
- Dropdown mostra apenas marcadores do usuário
- Feedback visual

---

### 3.6 Criação de Nota

```
┌─────────────────────────────────────────────────────────┐
│ [← Voltar]                    [Salvar] [Cancelar]       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Título da Nota                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [B] [I] [U] [H1] [•] [1.] [🔗] ["]              │  │
│  ├──────────────────────────────────────────────────┤  │
│  │                                                  │  │
│  │  Digite o conteúdo da sua nota aqui...          │  │
│  │                                                  │  │
│  │  Você pode usar formatação rica de texto.        │  │
│  │                                                  │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Sub-marcador: Projetos 2024                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Elementos**:
- Header com ações (Voltar, Salvar, Cancelar)
- Campo de título
- Barra de ferramentas do editor
- Área de edição rich text
- Indicação do sub-marcador atual

**Comportamento**:
- Editor rich text com formatações
- Validação: título e conteúdo obrigatórios
- Auto-save (futuro)
- Preview de formatação em tempo real

---

### 3.7 Visualização de Nota

```
┌─────────────────────────────────────────────────────────┐
│ [← Voltar]                    [Editar] [Excluir]        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📄 Reunião de Planejamento                              │
│                                                          │
│  Criado em: 15/01/2024                                  │
│                                                          │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  Conteúdo da nota formatado:                            │
│                                                          │
│  • Ponto 1                                              │
│  • Ponto 2                                              │
│                                                          │
│  Texto em negrito e itálico.                            │
│                                                          │
│  [Link para documento]                                  │
│                                                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Elementos**:
- Header com ações (Voltar, Editar, Excluir)
- Título da nota
- Data de criação
- Conteúdo formatado (rich text renderizado)
- Separador visual

**Comportamento**:
- Conteúdo renderizado com formatação preservada
- Botão Editar leva para tela de edição
- Botão Excluir mostra confirmação
- Links clicáveis

---

### 3.8 Edição de Nota

```
┌─────────────────────────────────────────────────────────┐
│ [← Voltar]                    [Salvar] [Cancelar]       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Título da Nota                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Reunião de Planejamento                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [B] [I] [U] [H1] [•] [1.] [🔗] ["]              │  │
│  ├──────────────────────────────────────────────────┤  │
│  │                                                  │  │
│  │  Conteúdo existente sendo editado...            │  │
│  │                                                  │  │
│  │  • Ponto 1                                      │  │
│  │  • Ponto 2                                      │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Criado em: 15/01/2024                                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Elementos**:
- Similar à criação, mas com conteúdo pré-preenchido
- Data de criação preservada (não editável)
- Mesma barra de ferramentas

**Comportamento**:
- Carrega conteúdo existente
- Permite edição completa
- Validação antes de salvar
- Preserva data de criação

---

### 3.9 Confirmação de Exclusão

```
┌─────────────────────────────────────┐
│  ⚠️                                 │
│                                     │
│  Confirmar Exclusão                 │
│                                     │
│  Tem certeza que deseja excluir     │
│  esta nota?                         │
│                                     │
│  "Reunião de Planejamento"         │
│                                     │
│  Esta ação não pode ser desfeita.   │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ Cancelar │  │  Excluir  │       │
│  └──────────┘  └──────────┘       │
│                                     │
└─────────────────────────────────────┘
```

**Elementos**:
- Modal de confirmação
- Ícone de aviso
- Mensagem clara
- Nome do item a ser excluído
- Aviso sobre irreversibilidade
- Botões de ação

**Comportamento**:
- Modal bloqueia interação com fundo
- Botão Excluir em destaque (vermelho)
- Fecha ao clicar em Cancelar ou fora

---

## 4. Fluxos de Navegação

### 4.1 Fluxo: Criar Primeira Estrutura

```
Login
  ↓
Dashboard Vazio
  ↓
[Tutorial] → Criar Marcador
  ↓
Modal: Criar Marcador
  ↓
Dashboard com Marcador
  ↓
Criar Sub-marcador
  ↓
Modal: Criar Sub-marcador
  ↓
Dashboard Completo
  ↓
Criar Nota
```

**Decisões de Design**:
- Tutorial aparece apenas no primeiro uso
- Modais para criação rápida
- Feedback visual após cada criação

---

### 4.2 Fluxo: Criar e Visualizar Nota

```
Dashboard
  ↓
Selecionar Sub-marcador
  ↓
Lista de Notas
  ↓
[+ Nova Nota]
  ↓
Editor de Nota
  ↓
[Salvar]
  ↓
Visualização de Nota
  ↓
[Editar] ou [Voltar]
```

**Decisões de Design**:
- Transição suave entre estados
- Editor em tela cheia para foco
- Visualização imediata após salvar

---

### 4.3 Fluxo: Editar Nota

```
Visualização de Nota
  ↓
[Editar]
  ↓
Editor de Nota (com conteúdo)
  ↓
[Salvar]
  ↓
Visualização de Nota (atualizada)
```

**Decisões de Design**:
- Mesma interface de criação
- Conteúdo pré-carregado
- Feedback de salvamento

---

## 5. Responsividade

### 5.1 Desktop (> 1024px)

**Layout**: 3 colunas
- Sidebar: 250px (marcadores)
- Meio: 300px (sub-marcadores)
- Conteúdo: Flex (notas/editor)

**Características**:
- Todas as colunas visíveis
- Hover states
- Atalhos de teclado

---

### 5.2 Tablet (768px - 1024px)

**Layout**: 2 colunas
- Sidebar colapsável: 200px
- Conteúdo: Flex

**Características**:
- Sidebar pode ser ocultada
- Menu hambúrguer para navegação
- Touch-friendly

---

### 5.3 Mobile (< 768px)

**Layout**: 1 coluna
- Navegação por tabs ou drawer
- Conteúdo em tela cheia

**Características**:
- Drawer lateral para estrutura
- Botões maiores para touch
- Gestos de navegação
- Editor adaptado para mobile

**Wireframe Mobile - Dashboard**:
```
┌─────────────────────┐
│ [☰] [Logo] [User]   │
├─────────────────────┤
│                     │
│  [Marcadores ▼]    │
│  [Sub-marcadores ▼]│
│                     │
│  Lista de Notas:    │
│  ┌───────────────┐ │
│  │ 📄 Nota 1     │ │
│  └───────────────┘ │
│  ┌───────────────┐ │
│  │ 📄 Nota 2     │ │
│  └───────────────┘ │
│                     │
│  [+ Nova Nota]      │
│                     │
└─────────────────────┘
```

---

## 6. Estados da Interface

### 6.1 Estados de Loading

**Loading Inicial**:
```
┌─────────────────────┐
│                     │
│    [Spinner]        │
│                     │
│  Carregando...      │
│                     │
└─────────────────────┘
```

**Loading de Lista**:
```
┌─────────────────────┐
│  [Skeleton 1]      │
│  [Skeleton 2]      │
│  [Skeleton 3]      │
└─────────────────────┘
```

---

### 6.2 Estados Vazios

**Sem Marcadores**:
- Mensagem motivacional
- Botão de ação destacado
- Exemplos

**Sem Notas**:
- Mensagem "Nenhuma nota ainda"
- Botão "Criar primeira nota"
- Ícone ilustrativo

---

### 6.3 Estados de Erro

**Erro de Validação**:
```
┌─────────────────────┐
│  Campo obrigatório  │
│  [Campo com borda   │
│   vermelha]         │
└─────────────────────┘
```

**Erro de Servidor**:
```
┌─────────────────────┐
│  ⚠️ Erro            │
│                     │
│  Não foi possível   │
│  salvar a nota.     │
│                     │
│  [Tentar Novamente] │
└─────────────────────┘
```

---

## 7. Interações e Microinterações

### 7.1 Hover States
- Botões: Mudança de cor/opacidade
- Itens de lista: Destaque sutil
- Links: Sublinhado ou mudança de cor

### 7.2 Click/Tap States
- Feedback visual imediato
- Estados ativos claros
- Animações suaves

### 7.3 Transições
- Fade in/out para modais
- Slide para navegação
- Smooth scroll

---

## 8. Acessibilidade

### 8.1 Navegação por Teclado
- Tab order lógico
- Foco visível
- Atalhos de teclado documentados

### 8.2 Screen Readers
- Labels descritivos
- ARIA attributes
- Estrutura semântica

### 8.3 Contraste
- Contraste mínimo WCAG AA
- Estados visíveis sem cor apenas

---

## 9. Anotações Técnicas

### 9.1 Componentes Reutilizáveis
- Modal/Drawer
- Input com validação
- Botão com estados
- Lista com itens clicáveis
- Editor rich text

### 9.2 Performance
- Lazy loading de listas longas
- Virtual scrolling se necessário
- Debounce em buscas (futuro)

---

**Documento gerado por UX Designer - Wireframes de baixa fidelidade**

