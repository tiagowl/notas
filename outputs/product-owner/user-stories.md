# User Stories - Sistema de Gerenciamento de Notas

## Personas Identificadas

### Persona 1: Usuário Individual
- **Nome**: João Silva
- **Perfil**: Estudante/Profissional que precisa organizar suas notas pessoais
- **Necessidades**: Organizar informações de forma hierárquica, acesso rápido às notas

### Persona 2: Usuário Profissional
- **Nome**: Maria Santos
- **Perfil**: Profissional que gerencia múltiplos projetos
- **Necessidades**: Separar notas por contexto/projeto, formatação rica para documentos

---

## User Stories

### Epic 1: Autenticação e Segurança

#### US-001: Login do Usuário
**Como** um usuário do sistema  
**Eu quero** fazer login com minhas credenciais  
**Para que** eu possa acessar minhas notas de forma segura e privada

**Prioridade**: Alta  
**Estimativa**: 3 pontos

---

### Epic 2: Gerenciamento de Estrutura Hierárquica

#### US-002: Criar Marcador
**Como** um usuário autenticado  
**Eu quero** criar um marcador (categoria principal)  
**Para que** eu possa organizar minhas notas em grupos principais

**Prioridade**: Alta  
**Estimativa**: 2 pontos

#### US-003: Criar Sub-marcador
**Como** um usuário autenticado  
**Eu quero** criar um sub-marcador vinculado a um marcador existente  
**Para que** eu possa criar uma estrutura hierárquica de organização (Marcador > Sub-marcador)

**Prioridade**: Alta  
**Estimativa**: 2 pontos

#### US-004: Visualizar Estrutura de Marcadores
**Como** um usuário autenticado  
**Eu quero** visualizar a hierarquia de marcadores e sub-marcadores  
**Para que** eu possa navegar facilmente pela minha organização de notas

**Prioridade**: Média  
**Estimativa**: 3 pontos

#### US-005: Editar Marcador/Sub-marcador
**Como** um usuário autenticado  
**Eu quero** editar o nome de marcadores e sub-marcadores  
**Para que** eu possa ajustar minha organização conforme necessário

**Prioridade**: Média  
**Estimativa**: 2 pontos

#### US-006: Excluir Marcador/Sub-marcador
**Como** um usuário autenticado  
**Eu quero** excluir marcadores e sub-marcadores  
**Para que** eu possa remover categorias que não uso mais

**Prioridade**: Média  
**Estimativa**: 3 pontos (considerando impacto em notas vinculadas)

---

### Epic 3: Gerenciamento de Notas

#### US-007: Criar Nota
**Como** um usuário autenticado  
**Eu quero** criar uma nova nota vinculada a um sub-marcador  
**Para que** eu possa armazenar informações organizadas

**Prioridade**: Alta  
**Estimativa**: 5 pontos

**Detalhamento**:
- A nota deve ter um título (obrigatório)
- A nota deve ter conteúdo em rich text (obrigatório)
- A nota deve ter data de criação automática
- A nota deve estar vinculada a um sub-marcador

#### US-008: Visualizar Lista de Notas
**Como** um usuário autenticado  
**Eu quero** visualizar todas as notas de um sub-marcador  
**Para que** eu possa encontrar rapidamente a nota que procuro

**Prioridade**: Alta  
**Estimativa**: 3 pontos

#### US-009: Visualizar Detalhes da Nota
**Como** um usuário autenticado  
**Eu quero** visualizar o conteúdo completo de uma nota  
**Para que** eu possa ler e trabalhar com minhas informações

**Prioridade**: Alta  
**Estimativa**: 2 pontos

#### US-010: Editar Nota
**Como** um usuário autenticado  
**Eu quero** editar o título e conteúdo de uma nota existente  
**Para que** eu possa atualizar minhas informações

**Prioridade**: Alta  
**Estimativa**: 5 pontos

**Detalhamento**:
- Deve manter a data de criação original
- Deve atualizar data de modificação (se implementado)
- Editor rich text deve funcionar na edição

#### US-011: Excluir Nota
**Como** um usuário autenticado  
**Eu quero** excluir uma nota  
**Para que** eu possa remover informações que não são mais necessárias

**Prioridade**: Média  
**Estimativa**: 2 pontos

---

### Epic 4: Editor Rich Text

#### US-012: Formatação de Texto
**Como** um usuário autenticado  
**Eu quero** formatar o texto das minhas notas (negrito, itálico, listas, etc.)  
**Para que** eu possa criar documentos bem estruturados e legíveis

**Prioridade**: Alta  
**Estimativa**: 8 pontos

**Funcionalidades esperadas**:
- Negrito, itálico, sublinhado
- Listas ordenadas e não ordenadas
- Títulos e subtítulos
- Links
- Citações

---

## Jornada do Usuário

### Fluxo Principal: Criar e Organizar Notas

1. **Login** (US-001)
   - Usuário acessa o sistema
   - Faz login com credenciais

2. **Criar Estrutura** (US-002, US-003)
   - Cria um marcador (ex: "Trabalho")
   - Cria um sub-marcador (ex: "Projetos 2024" dentro de "Trabalho")

3. **Criar Nota** (US-007)
   - Seleciona o sub-marcador
   - Cria uma nova nota com título e conteúdo rich text

4. **Gerenciar Notas** (US-008, US-009, US-010, US-011)
   - Visualiza lista de notas
   - Abre nota para leitura
   - Edita nota quando necessário
   - Exclui nota quando não precisa mais

---

## Dependências entre User Stories

- **US-001** é pré-requisito para todas as outras
- **US-002** é pré-requisito para **US-003**
- **US-003** é pré-requisito para **US-007**
- **US-007** é pré-requisito para **US-008, US-009, US-010, US-011**
- **US-012** está integrado em **US-007** e **US-010**



