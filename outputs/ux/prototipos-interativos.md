# Protótipos Interativos - Sistema de Gerenciamento de Notas

## 1. Visão Geral

Este documento descreve os protótipos interativos do sistema de gerenciamento de notas, focando em interações funcionais, estados da interface, transições e feedback visual.

**Fidelidade**: Protótipos de média a alta fidelidade com interações funcionais.

**Ferramenta Sugerida**: Figma, Adobe XD, ou similar para protótipos clicáveis.

---

## 2. Protótipos por Funcionalidade

### 2.1 Protótipo: Fluxo de Autenticação

#### Tela 1: Login
**Interações**:
- Campo de email: Foco automático ao carregar
- Validação em tempo real: Verifica formato de email
- Campo de senha: Mostra/oculta senha (ícone de olho)
- Botão "Entrar": Habilita apenas quando campos válidos
- Link "Esqueceu senha?": Abre modal de recuperação (futuro)

**Estados**:
- **Inicial**: Campos vazios, botão desabilitado
- **Digitando**: Validação em tempo real, botão habilita quando válido
- **Loading**: Botão mostra spinner, campos desabilitados
- **Erro**: Mensagem abaixo dos campos, campo com borda vermelha
- **Sucesso**: Redireciona para dashboard

**Transições**:
- Fade in da tela: 300ms
- Validação: Feedback imediato (< 100ms)
- Loading: Spinner suave, 200ms fade

**Feedback Visual**:
- ✅ Campo válido: Borda verde sutil
- ❌ Campo inválido: Borda vermelha, mensagem de erro
- ⏳ Loading: Spinner no botão, opacidade reduzida

---

#### Tela 2: Dashboard Após Login
**Interações**:
- Carregamento automático de estrutura
- Animações de entrada: Fade in dos elementos
- Hover em itens: Destaque sutil
- Click em marcador: Expande sub-marcadores
- Click em sub-marcador: Carrega notas

**Estados**:
- **Loading**: Skeleton screens
- **Vazio**: Mensagem motivacional
- **Com dados**: Lista hierárquica completa
- **Selecionado**: Item destacado visualmente

**Transições**:
- Expansão de sub-marcadores: Slide down 200ms
- Carregamento de notas: Fade in 300ms
- Seleção: Mudança de cor 150ms

---

### 2.2 Protótipo: Criação de Estrutura

#### Modal: Criar Marcador
**Interações**:
- Abre com animação: Fade in + scale (300ms)
- Foco automático no campo de texto
- Validação em tempo real: Nome obrigatório, máximo 100 caracteres
- Contador de caracteres: Mostra "X/100"
- Botão "Criar": Habilita quando válido
- Fechar: Click fora, ESC, ou botão X

**Estados**:
- **Inicial**: Campo vazio, botão desabilitado
- **Digitando**: Validação ativa, contador atualiza
- **Válido**: Botão habilitado, campo com borda verde
- **Inválido**: Mensagem de erro, campo com borda vermelha
- **Submitting**: Botão com spinner, campos desabilitados
- **Sucesso**: Modal fecha, toast de sucesso, estrutura atualiza

**Transições**:
- Abertura: Fade in + scale up (300ms ease-out)
- Fechamento: Fade out + scale down (200ms ease-in)
- Validação: Feedback imediato
- Sucesso: Toast aparece (slide up 300ms)

**Feedback Visual**:
- Overlay escuro (backdrop) com opacidade 0.5
- Modal centralizado com sombra
- Ícone de sucesso (check verde) no toast
- Animação de confetti (opcional) ao criar

---

#### Modal: Criar Sub-marcador
**Interações**:
- Dropdown de marcador pai: Abre lista de marcadores
- Seleção de marcador: Atualiza visualmente
- Campo de nome: Validação igual ao marcador
- Criação: Cria sub-marcador e fecha modal

**Estados**:
- **Inicial**: Dropdown vazio, campo vazio
- **Marcador selecionado**: Dropdown mostra seleção
- **Digitando nome**: Validação ativa
- **Pronto**: Botão habilitado

**Transições**:
- Dropdown: Slide down 200ms
- Seleção: Mudança de cor 150ms
- Criação: Fade out modal, atualização da lista

---

### 2.3 Protótipo: Editor de Notas

#### Tela: Criar/Editar Nota
**Interações**:
- **Campo de título**:
  - Foco automático ao abrir
  - Validação: Obrigatório, máximo 200 caracteres
  - Contador de caracteres
  
- **Editor Rich Text**:
  - Barra de ferramentas fixa no topo
  - Botões de formatação: Negrito, Itálico, Sublinhado
  - Botões de estrutura: H1, H2, H3
  - Botões de lista: Lista ordenada, não ordenada
  - Botão de link: Abre modal para inserir URL
  - Botão de citação: Aplica formatação de citação
  
- **Formatação**:
  - Seleção de texto: Barra de ferramentas flutuante aparece
  - Aplicar formatação: Feedback visual imediato
  - Estado ativo: Botão destacado quando formatação aplicada
  
- **Salvamento**:
  - Botão "Salvar": Valida antes de salvar
  - Auto-save (futuro): Indicador de salvamento automático
  - Feedback: Toast de sucesso

**Estados**:
- **Inicial**: Campos vazios, editor em modo inserção
- **Editando**: Cursor ativo, formatações disponíveis
- **Texto selecionado**: Barra flutuante aparece
- **Formatação ativa**: Botão destacado na barra
- **Salvando**: Loading no botão, campos desabilitados
- **Salvo**: Toast de confirmação, botão volta ao normal

**Transições**:
- Abertura do editor: Fade in 300ms
- Barra flutuante: Slide up 200ms
- Formatação: Aplicação imediata com highlight
- Salvamento: Spinner suave, toast slide up

**Feedback Visual**:
- Barra de ferramentas: Fundo branco, sombra sutil
- Botões ativos: Cor de destaque, fundo levemente colorido
- Texto formatado: Visual imediato (negrito, itálico, etc.)
- Indicador de salvamento: Badge "Salvo" ou spinner

---

#### Componente: Barra de Ferramentas Flutuante
**Interações**:
- Aparece ao selecionar texto
- Posiciona acima da seleção
- Botões aplicam formatação ao texto selecionado
- Desaparece ao deselecionar

**Estados**:
- **Oculto**: Não visível
- **Visível**: Aparece acima da seleção
- **Hover**: Destaque sutil nos botões

**Transições**:
- Aparição: Fade in + slide up (200ms)
- Desaparecimento: Fade out (150ms)
- Movimento: Segue a seleção suavemente

---

### 2.4 Protótipo: Visualização de Nota

#### Tela: Detalhes da Nota
**Interações**:
- **Header**:
  - Botão "Voltar": Retorna à lista
  - Botão "Editar": Abre editor com conteúdo
  - Botão "Excluir": Abre modal de confirmação
  
- **Conteúdo**:
  - Título: Grande e destacado
  - Data: Formato legível
  - Conteúdo: Renderizado com formatação preservada
  - Links: Clicáveis, abrem em nova aba
  
- **Navegação** (futuro):
  - Setas para próxima/anterior nota
  - Atalhos de teclado (← →)

**Estados**:
- **Carregando**: Skeleton do conteúdo
- **Carregado**: Conteúdo completo renderizado
- **Erro**: Mensagem de erro, botão para retry

**Transições**:
- Carregamento: Fade in do conteúdo (300ms)
- Navegação: Slide horizontal (300ms)
- Ações: Feedback imediato

**Feedback Visual**:
- Título: Tipografia grande, peso bold
- Data: Cor secundária, tamanho menor
- Conteúdo: Espaçamento adequado, formatação preservada
- Botões de ação: Hover states claros

---

### 2.5 Protótipo: Exclusão com Confirmação

#### Modal: Confirmar Exclusão
**Interações**:
- Abre ao clicar em "Excluir"
- Mostra nome do item a ser excluído
- Botão "Cancelar": Fecha modal
- Botão "Excluir": Confirma e executa exclusão
- ESC: Fecha modal

**Estados**:
- **Aberto**: Modal visível, overlay escuro
- **Confirmando**: Loading no botão Excluir
- **Sucesso**: Modal fecha, item desaparece da lista
- **Erro**: Mensagem de erro no modal

**Transições**:
- Abertura: Fade in + scale (300ms)
- Fechamento: Fade out (200ms)
- Exclusão: Item desaparece com fade out (300ms)
- Lista atualiza: Reorganização suave

**Feedback Visual**:
- Ícone de aviso: ⚠️ em amarelo/laranja
- Botão Excluir: Cor vermelha para indicar ação destrutiva
- Overlay: Escurece fundo (opacidade 0.5)
- Toast de sucesso: "Nota excluída com sucesso"

---

## 3. Microinterações

### 3.1 Feedback de Ações

#### Botões
- **Hover**: Mudança de cor/opacidade (150ms)
- **Click**: Press effect (scale 0.98, 100ms)
- **Loading**: Spinner suave, opacidade reduzida
- **Sucesso**: Check animado (scale + fade, 400ms)

#### Inputs
- **Foco**: Borda muda de cor, sombra sutil
- **Validação**: Borda verde (válido) ou vermelha (inválido)
- **Erro**: Shake animation (100ms, 3 vezes)
- **Sucesso**: Check verde aparece (fade in 200ms)

#### Listas
- **Hover**: Fundo muda levemente (150ms)
- **Seleção**: Destaque mais forte, ícone de check
- **Loading**: Skeleton screens com shimmer
- **Atualização**: Fade in dos novos itens (300ms)

---

### 3.2 Animações de Transição

#### Navegação entre Telas
- **Slide**: Desliza horizontalmente (300ms ease-in-out)
- **Fade**: Fade in/out (300ms)
- **Scale**: Zoom in/out (300ms ease-out)

#### Modais
- **Abertura**: Fade in + scale up (300ms ease-out)
- **Fechamento**: Fade out + scale down (200ms ease-in)
- **Backdrop**: Fade in/out (200ms)

#### Listas
- **Expansão**: Slide down (200ms ease-out)
- **Colapso**: Slide up (200ms ease-in)
- **Reordenação**: Smooth transition (300ms)

---

### 3.3 Estados de Loading

#### Loading Inicial
- Spinner centralizado
- Mensagem "Carregando..."
- Fade in suave

#### Loading de Lista
- Skeleton screens
- Shimmer effect
- Fade in ao carregar

#### Loading de Ação
- Spinner no botão
- Texto muda para "Salvando..."
- Campos desabilitados

---

## 4. Protótipos Responsivos

### 4.1 Desktop (> 1024px)

**Características**:
- Layout de 3 colunas
- Hover states ativos
- Atalhos de teclado
- Modais centralizados

**Interações Especiais**:
- Hover em itens de lista
- Tooltips em hover
- Drag and drop (futuro)

---

### 4.2 Tablet (768px - 1024px)

**Características**:
- Layout de 2 colunas
- Sidebar colapsável
- Touch-friendly
- Gestos de swipe

**Interações Especiais**:
- Swipe para abrir/fechar sidebar
- Touch targets maiores (44x44px mínimo)
- Modais em tela cheia

---

### 4.3 Mobile (< 768px)

**Características**:
- Layout de 1 coluna
- Drawer lateral
- Botões maiores
- Gestos principais

**Interações Especiais**:
- Swipe para abrir drawer
- Pull to refresh (futuro)
- Bottom sheet para ações
- Editor adaptado (toolbar fixa no topo)

**Protótipo Mobile - Drawer**:
```
Estado Fechado:
┌─────────────┐
│ [☰] Logo   │
└─────────────┘

Estado Aberto:
┌─────────────┐
│ [✕] Fechar │
├─────────────┤
│ Marcadores  │
│ Sub-marc.   │
│ Notas       │
└─────────────┘
```

---

## 5. Protótipos de Estados Especiais

### 5.1 Estado Vazio

#### Dashboard Vazio
**Interações**:
- Mensagem motivacional animada
- Botão destacado pulsa levemente
- Exemplos aparecem com fade in

**Animações**:
- Mensagem: Fade in (400ms)
- Botão: Pulse sutil (2s loop)
- Exemplos: Stagger fade in (100ms delay entre itens)

---

#### Lista Vazia
**Interações**:
- Mensagem "Nenhuma nota ainda"
- Botão "Criar primeira nota"
- Ilustração (opcional)

**Animações**:
- Conteúdo: Fade in (300ms)
- Botão: Hover com scale (150ms)

---

### 5.2 Estados de Erro

#### Erro de Validação
**Interações**:
- Campo com borda vermelha
- Mensagem de erro abaixo
- Shake animation no campo
- Foco no campo com erro

**Animações**:
- Shake: 100ms, 3 oscilações
- Mensagem: Slide down (200ms)
- Borda: Mudança de cor (150ms)

---

#### Erro de Servidor
**Interações**:
- Modal de erro
- Mensagem clara
- Botão "Tentar Novamente"
- Opção de reportar problema

**Animações**:
- Modal: Fade in + scale (300ms)
- Ícone de erro: Pulse (1s)
- Botão: Hover state normal

---

## 6. Protótipos de Acessibilidade

### 6.1 Navegação por Teclado

**Interações**:
- Tab: Navega entre elementos focáveis
- Enter/Space: Ativa botão/link focado
- ESC: Fecha modais
- Setas: Navega em listas (futuro)

**Feedback Visual**:
- Foco: Outline claro e visível
- Estado ativo: Destaque adicional
- Indicador de foco: Não apenas cor

---

### 6.2 Screen Readers

**Interações**:
- Labels descritivos
- ARIA live regions para mudanças
- Anúncios de ações (ex: "Nota salva")

**Estados**:
- Elementos ocultos visualmente mas acessíveis
- Ordem lógica de leitura

---

## 7. Protótipos de Performance

### 7.1 Otimizações Visuais

#### Lazy Loading
- Placeholders enquanto carrega
- Fade in ao carregar
- Skeleton screens

#### Virtual Scrolling
- Listas longas renderizam apenas visíveis
- Scroll suave
- Loading de mais itens ao scroll

---

## 8. Ferramentas e Especificações

### 8.1 Ferramentas Recomendadas
- **Figma**: Protótipos clicáveis, design system
- **Adobe XD**: Protótipos interativos, animações
- **InVision**: Protótipos de alta fidelidade
- **Framer**: Protótipos com código

### 8.2 Especificações Técnicas

#### Durações de Animação
- Microinterações: 100-200ms
- Transições: 200-300ms
- Animações complexas: 300-500ms

#### Easing Functions
- Ease-out: Abertura, entrada
- Ease-in: Fechamento, saída
- Ease-in-out: Transições suaves

#### Performance
- 60fps em animações
- Debounce em interações frequentes
- Throttle em scroll events

---

## 9. Testes de Protótipos

### 9.1 Testes de Interação
- [ ] Todos os botões são clicáveis
- [ ] Modais abrem e fecham corretamente
- [ ] Validações funcionam
- [ ] Transições são suaves
- [ ] Feedback visual é claro

### 9.2 Testes de Usabilidade
- [ ] Usuários conseguem completar tarefas
- [ ] Fluxos são intuitivos
- [ ] Erros são claros
- [ ] Ajuda está disponível quando necessário

---

## 10. Próximos Passos

1. **Criar Protótipos em Ferramenta**
   - Usar Figma ou similar
   - Implementar todas as interações
   - Testar com usuários

2. **Validar com Usuários**
   - Testes de usabilidade
   - Coletar feedback
   - Iterar baseado em resultados

3. **Refinar Animações**
   - Ajustar durações
   - Melhorar easing
   - Otimizar performance

---

**Documento gerado por UX Designer - Protótipos Interativos**

