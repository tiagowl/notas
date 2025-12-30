# Design System - Sistema de Gerenciamento de Notas

## 1. Visão Geral

Este documento apresenta o Design System do sistema de gerenciamento de notas, definindo padrões de design, componentes reutilizáveis, tokens de design e diretrizes de uso para garantir consistência visual e de experiência em toda a aplicação.

**Objetivo**: Criar uma base sólida de design que permita desenvolvimento rápido, consistência visual e manutenibilidade.

---

## 2. Princípios de Design

### 2.1 Simplicidade
- Interface limpa e descomplicada
- Remover elementos desnecessários
- Foco no conteúdo e funcionalidade

### 2.2 Clareza
- Hierarquia visual clara
- Comunicação direta e objetiva
- Feedback imediato para ações do usuário

### 2.3 Consistência
- Padrões visuais uniformes
- Comportamentos previsíveis
- Linguagem visual coesa

### 2.4 Acessibilidade
- Contraste adequado (WCAG AA)
- Navegação por teclado
- Suporte a screen readers
- Tamanhos de toque adequados (44x44px mínimo)

### 2.5 Eficiência
- Ações rápidas e diretas
- Menos cliques possível
- Atalhos de teclado quando apropriado

---

## 3. Tokens de Design

### 3.1 Cores

#### Paleta Primária
```
--color-primary-50: #f0f9ff
--color-primary-100: #e0f2fe
--color-primary-200: #bae6fd
--color-primary-300: #7dd3fc
--color-primary-400: #38bdf8
--color-primary-500: #0ea5e9  (Cor principal)
--color-primary-600: #0284c7
--color-primary-700: #0369a1
--color-primary-800: #075985
--color-primary-900: #0c4a6e
```

#### Paleta Secundária
```
--color-secondary-50: #f8fafc
--color-secondary-100: #f1f5f9
--color-secondary-200: #e2e8f0
--color-secondary-300: #cbd5e1
--color-secondary-400: #94a3b8
--color-secondary-500: #64748b  (Cor secundária)
--color-secondary-600: #475569
--color-secondary-700: #334155
--color-secondary-800: #1e293b
--color-secondary-900: #0f172a
```

#### Cores Semânticas
```
--color-success: #10b981
--color-success-light: #d1fae5
--color-warning: #f59e0b
--color-warning-light: #fef3c7
--color-error: #ef4444
--color-error-light: #fee2e2
--color-info: #3b82f6
--color-info-light: #dbeafe
```

#### Cores Neutras
```
--color-white: #ffffff
--color-black: #000000
--color-gray-50: #f9fafb
--color-gray-100: #f3f4f6
--color-gray-200: #e5e7eb
--color-gray-300: #d1d5db
--color-gray-400: #9ca3af
--color-gray-500: #6b7280
--color-gray-600: #4b5563
--color-gray-700: #374151
--color-gray-800: #1f2937
--color-gray-900: #111827
```

#### Uso de Cores
- **Primária**: Ações principais, links, elementos de destaque
- **Secundária**: Texto secundário, bordas, fundos sutis
- **Sucesso**: Confirmações, mensagens positivas
- **Aviso**: Alertas, confirmações importantes
- **Erro**: Erros, ações destrutivas, validações
- **Info**: Informações, dicas, notificações

---

### 3.2 Tipografia

#### Família de Fontes
```
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-mono: 'Fira Code', 'Courier New', monospace
```

#### Tamanhos de Fonte
```
--font-size-xs: 0.75rem    (12px)
--font-size-sm: 0.875rem   (14px)
--font-size-base: 1rem     (16px)
--font-size-lg: 1.125rem   (18px)
--font-size-xl: 1.25rem    (20px)
--font-size-2xl: 1.5rem    (24px)
--font-size-3xl: 1.875rem  (30px)
--font-size-4xl: 2.25rem   (36px)
--font-size-5xl: 3rem      (48px)
```

#### Pesos de Fonte
```
--font-weight-light: 300
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
```

#### Altura de Linha
```
--line-height-tight: 1.25
--line-height-normal: 1.5
--line-height-relaxed: 1.75
```

#### Estilos de Texto

**Heading 1 (H1)**
- Tamanho: `--font-size-4xl` (36px)
- Peso: `--font-weight-bold` (700)
- Altura de linha: `--line-height-tight` (1.25)
- Uso: Títulos principais de página

**Heading 2 (H2)**
- Tamanho: `--font-size-3xl` (30px)
- Peso: `--font-weight-bold` (700)
- Altura de linha: `--line-height-tight` (1.25)
- Uso: Seções principais

**Heading 3 (H3)**
- Tamanho: `--font-size-2xl` (24px)
- Peso: `--font-weight-semibold` (600)
- Altura de linha: `--line-height-normal` (1.5)
- Uso: Subseções

**Body (Parágrafo)**
- Tamanho: `--font-size-base` (16px)
- Peso: `--font-weight-normal` (400)
- Altura de linha: `--line-height-relaxed` (1.75)
- Uso: Texto corrido, conteúdo

**Small (Pequeno)**
- Tamanho: `--font-size-sm` (14px)
- Peso: `--font-weight-normal` (400)
- Altura de linha: `--line-height-normal` (1.5)
- Uso: Texto secundário, legendas

**Caption (Legenda)**
- Tamanho: `--font-size-xs` (12px)
- Peso: `--font-weight-normal` (400)
- Altura de linha: `--line-height-normal` (1.5)
- Uso: Datas, metadados, informações auxiliares

---

### 3.3 Espaçamento

#### Escala de Espaçamento
```
--spacing-0: 0
--spacing-1: 0.25rem   (4px)
--spacing-2: 0.5rem     (8px)
--spacing-3: 0.75rem    (12px)
--spacing-4: 1rem       (16px)
--spacing-5: 1.25rem    (20px)
--spacing-6: 1.5rem     (24px)
--spacing-8: 2rem       (32px)
--spacing-10: 2.5rem    (40px)
--spacing-12: 3rem      (48px)
--spacing-16: 4rem      (64px)
--spacing-20: 5rem      (80px)
--spacing-24: 6rem      (96px)
```

#### Uso de Espaçamento
- **Entre elementos relacionados**: `--spacing-2` a `--spacing-4`
- **Entre seções**: `--spacing-8` a `--spacing-12`
- **Padding de componentes**: `--spacing-4` a `--spacing-6`
- **Margens de página**: `--spacing-6` a `--spacing-8`

---

### 3.4 Bordas e Raios

#### Raios de Borda
```
--radius-none: 0
--radius-sm: 0.125rem   (2px)
--radius-base: 0.25rem  (4px)
--radius-md: 0.375rem   (6px)
--radius-lg: 0.5rem     (8px)
--radius-xl: 0.75rem    (12px)
--radius-2xl: 1rem      (16px)
--radius-full: 9999px
```

#### Larguras de Borda
```
--border-width-0: 0
--border-width-1: 1px
--border-width-2: 2px
--border-width-4: 4px
```

#### Uso
- **Inputs, botões**: `--radius-md` (6px)
- **Cards, modais**: `--radius-lg` (8px)
- **Badges, tags**: `--radius-full` (circular)
- **Bordas padrão**: `--border-width-1` (1px)

---

### 3.5 Sombras

#### Sombras
```
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

#### Uso
- **Cards**: `--shadow-base`
- **Modais, dropdowns**: `--shadow-lg`
- **Hover states**: `--shadow-md`
- **Elevação alta**: `--shadow-xl`

---

### 3.6 Animações e Transições

#### Durações
```
--duration-fast: 100ms
--duration-base: 200ms
--duration-slow: 300ms
--duration-slower: 500ms
```

#### Easing Functions
```
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

#### Transições Padrão
```
--transition-fast: all var(--duration-fast) var(--ease-out)
--transition-base: all var(--duration-base) var(--ease-in-out)
--transition-slow: all var(--duration-slow) var(--ease-in-out)
```

#### Uso
- **Hover states**: `--transition-fast`
- **Modais, dropdowns**: `--transition-base`
- **Animações complexas**: `--transition-slow`

---

## 4. Componentes

### 4.1 Botões

#### Botão Primário
```css
.button-primary {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
}

.button-primary:hover {
  background-color: var(--color-primary-600);
  box-shadow: var(--shadow-md);
}

.button-primary:active {
  transform: scale(0.98);
}

.button-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Botão Secundário
```css
.button-secondary {
  background-color: var(--color-white);
  color: var(--color-primary-500);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  border: var(--border-width-1) solid var(--color-primary-500);
  cursor: pointer;
  transition: var(--transition-fast);
}

.button-secondary:hover {
  background-color: var(--color-primary-50);
}
```

#### Botão Destrutivo
```css
.button-destructive {
  background-color: var(--color-error);
  color: var(--color-white);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
}

.button-destructive:hover {
  background-color: #dc2626;
  box-shadow: var(--shadow-md);
}
```

#### Tamanhos de Botão
- **Small**: `padding: var(--spacing-2) var(--spacing-4)`, `font-size: var(--font-size-sm)`
- **Medium** (padrão): `padding: var(--spacing-3) var(--spacing-6)`, `font-size: var(--font-size-base)`
- **Large**: `padding: var(--spacing-4) var(--spacing-8)`, `font-size: var(--font-size-lg)`

---

### 4.2 Inputs

#### Input de Texto
```css
.input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: var(--border-width-1) solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input:disabled {
  background-color: var(--color-gray-100);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px var(--color-error-light);
}
```

#### Label
```css
.label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
}
```

#### Mensagem de Erro
```css
.error-message {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--spacing-1);
}
```

---

### 4.3 Cards

#### Card Básico
```css
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-base);
  transition: var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

#### Card Interativo
```css
.card-interactive {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-base);
  cursor: pointer;
  transition: var(--transition-base);
}

.card-interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

---

### 4.4 Modais

#### Modal Overlay
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn var(--duration-base) var(--ease-out);
}
```

#### Modal Content
```css
.modal-content {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-2xl);
  animation: slideUp var(--duration-slow) var(--ease-out);
}
```

---

### 4.5 Listas

#### Lista de Itens
```css
.list-item {
  padding: var(--spacing-4);
  border-bottom: var(--border-width-1) solid var(--color-gray-200);
  cursor: pointer;
  transition: var(--transition-fast);
}

.list-item:hover {
  background-color: var(--color-gray-50);
}

.list-item:last-child {
  border-bottom: none;
}
```

#### Lista Hierárquica
```css
.list-hierarchical {
  list-style: none;
  padding-left: var(--spacing-4);
}

.list-hierarchical-item {
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
  transition: var(--transition-fast);
}

.list-hierarchical-item:hover {
  background-color: var(--color-gray-50);
  border-radius: var(--radius-md);
}
```

---

### 4.6 Badges e Tags

#### Badge
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.badge-primary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.badge-success {
  background-color: var(--color-success-light);
  color: var(--color-success);
}
```

---

### 4.7 Toast/Notificações

#### Toast
```css
.toast {
  position: fixed;
  bottom: var(--spacing-6);
  right: var(--spacing-6);
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4) var(--spacing-6);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  animation: slideUp var(--duration-base) var(--ease-out);
  z-index: 1100;
}

.toast-success {
  border-left: 4px solid var(--color-success);
}

.toast-error {
  border-left: 4px solid var(--color-error);
}
```

---

### 4.8 Editor Rich Text

#### Container do Editor
```css
.editor-container {
  border: var(--border-width-1) solid var(--color-gray-300);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.editor-toolbar {
  background-color: var(--color-gray-50);
  padding: var(--spacing-2) var(--spacing-4);
  border-bottom: var(--border-width-1) solid var(--color-gray-200);
  display: flex;
  gap: var(--spacing-2);
}

.editor-content {
  padding: var(--spacing-4);
  min-height: 300px;
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}
```

---

## 5. Layout

### 5.1 Grid System

#### Container
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

.container-sm {
  max-width: 640px;
}

.container-md {
  max-width: 768px;
}

.container-lg {
  max-width: 1024px;
}
```

#### Grid
```css
.grid {
  display: grid;
  gap: var(--spacing-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
```

---

### 5.2 Breakpoints

```css
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1536px
```

#### Uso em Media Queries
```css
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

---

## 6. Estados e Feedback

### 6.1 Estados de Loading

#### Spinner
```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-gray-200);
  border-top-color: var(--color-primary-500);
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Skeleton
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 0%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

### 6.2 Estados de Erro

#### Mensagem de Erro
```css
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-8);
  text-align: center;
  color: var(--color-gray-600);
}

.error-icon {
  color: var(--color-error);
  margin-bottom: var(--spacing-4);
}
```

---

### 6.3 Estados Vazios

#### Empty State
```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-12);
  text-align: center;
  color: var(--color-gray-500);
}

.empty-icon {
  margin-bottom: var(--spacing-4);
  opacity: 0.5;
}
```

---

## 7. Acessibilidade

### 7.1 Contraste

#### Requisitos
- **Texto normal**: Contraste mínimo 4.5:1
- **Texto grande** (18px+): Contraste mínimo 3:1
- **Elementos interativos**: Contraste mínimo 3:1

#### Cores Aprovadas
- Texto escuro em fundo claro: ✅
- Texto claro em fundo escuro: ✅
- Links: Cor primária com sublinhado no hover

---

### 7.2 Foco

#### Estilo de Foco
```css
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

#### Ordem de Tab
- Ordem lógica e sequencial
- Elementos interativos acessíveis
- Skip links quando apropriado

---

### 7.3 Screen Readers

#### ARIA Labels
- Labels descritivos em todos os inputs
- ARIA live regions para mudanças dinâmicas
- Roles apropriados (button, link, etc.)

#### Estrutura Semântica
- Uso de HTML5 semântico (header, nav, main, footer)
- Headings em ordem hierárquica
- Listas para grupos de itens relacionados

---

## 8. Responsividade

### 8.1 Estratégia Mobile-First

- Desenvolver primeiro para mobile
- Expandir para telas maiores
- Breakpoints baseados em conteúdo

### 8.2 Adaptações por Breakpoint

#### Mobile (< 768px)
- Layout de coluna única
- Navegação por drawer
- Botões em tamanho touch-friendly (44x44px mínimo)
- Modais em tela cheia

#### Tablet (768px - 1024px)
- Layout de 2 colunas
- Sidebar colapsável
- Modais centralizados

#### Desktop (> 1024px)
- Layout de 3 colunas
- Todas as funcionalidades visíveis
- Hover states ativos

---

## 9. Animações

### 9.1 Animações Padrão

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide Up
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Slide Down
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 10. Ícones

### 10.1 Biblioteca de Ícones

**Recomendação**: Lucide Icons, Heroicons, ou similar

#### Ícones Principais
- 📁 Marcador
- 📂 Sub-marcador
- 📄 Nota
- ➕ Adicionar
- ✏️ Editar
- 🗑️ Excluir
- 🔍 Buscar
- ⚙️ Configurações
- 👤 Usuário
- 🚪 Logout

#### Tamanhos Padrão
- **Small**: 16px
- **Medium**: 20px
- **Large**: 24px
- **XLarge**: 32px

---

## 11. Guia de Uso

### 11.1 Quando Usar Cada Componente

#### Botões
- **Primário**: Ação principal da tela
- **Secundário**: Ações alternativas
- **Destrutivo**: Exclusões, ações irreversíveis

#### Modais
- Confirmações importantes
- Formulários complexos
- Informações adicionais

#### Cards
- Agrupamento de informações relacionadas
- Listas de itens
- Visualização de conteúdo

---

## 12. Implementação

### 12.1 CSS Variables

Usar CSS Variables para facilitar customização e temas:

```css
:root {
  /* Cores */
  --color-primary-500: #0ea5e9;
  /* ... outros tokens ... */
}
```

### 12.2 Componentes React (Exemplo)

```tsx
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled
}) => {
  return (
    <button
      className={`button button-${variant} button-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

---

## 13. Manutenção e Evolução

### 13.1 Versionamento
- Manter changelog de mudanças
- Versionar tokens e componentes
- Documentar breaking changes

### 13.2 Contribuição
- Padrões claros de contribuição
- Code review obrigatório
- Testes de componentes

### 13.3 Documentação
- Storybook ou similar para componentes
- Exemplos de uso
- Guias de acessibilidade

---

## 14. Referências

### 14.1 Ferramentas Recomendadas
- **CSS Variables**: Para tokens
- **Tailwind CSS**: Para utilitários (opcional)
- **Storybook**: Para documentação de componentes
- **Figma**: Para design e protótipos

### 14.2 Recursos
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design](https://material.io/design)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

**Documento gerado por UX Designer - Design System**

