# Documentação de Requisitos - Sistema de Gerenciamento de Notas

## 1. Visão Geral do Projeto

### 1.1 Objetivo do Sistema
Desenvolver um sistema web de gerenciamento de notas que permita aos usuários organizar informações de forma hierárquica através de marcadores, sub-marcadores e notas com conteúdo em rich text.

### 1.2 Escopo do Projeto
- Sistema de autenticação de usuários
- Gerenciamento hierárquico de organização (Marcador > Sub-marcador > Notas)
- Criação, edição, visualização e exclusão de notas
- Editor de texto rico (rich text) para conteúdo das notas
- Interface web responsiva desenvolvida com Next.js

### 1.3 Público-Alvo
- **Usuários Individuais**: Pessoas que precisam organizar notas pessoais, estudos, lembretes
- **Profissionais**: Trabalhadores que gerenciam múltiplos projetos e precisam de organização estruturada
- **Estudantes**: Alunos que organizam materiais de estudo por disciplinas e tópicos

---

## 2. Objetivos de Negócio

### 2.1 Objetivos Principais
1. **Organização Estruturada**: Permitir que usuários organizem informações em uma hierarquia clara e intuitiva
2. **Produtividade**: Facilitar o acesso rápido e eficiente às informações armazenadas
3. **Flexibilidade**: Oferecer formatação rica de texto para diferentes necessidades de documentação
4. **Privacidade**: Garantir que cada usuário tenha acesso apenas às suas próprias notas

### 2.2 Métricas de Sucesso
- Taxa de retenção de usuários: > 60% após 30 dias
- Tempo médio para criar primeira nota: < 2 minutos
- Satisfação do usuário: > 4.0/5.0
- Taxa de uso diário: > 40% dos usuários ativos

### 2.3 Valor Proposto
- **Para Usuários**: Sistema simples e eficiente para organização pessoal de informações
- **Para Negócio**: Base para futuras funcionalidades (compartilhamento, colaboração, etc.)

---

## 3. Usuários-Alvo e Personas

### 3.1 Persona 1: João Silva - Estudante
- **Idade**: 22 anos
- **Perfil**: Estudante universitário
- **Necessidades**:
  - Organizar notas de diferentes disciplinas
  - Separar materiais por semestre e matéria
  - Formatação rica para fórmulas e listas
- **Comportamento**: Acesso frequente, cria muitas notas rapidamente
- **Expectativas**: Interface simples, acesso rápido, organização clara

### 3.2 Persona 2: Maria Santos - Profissional
- **Idade**: 35 anos
- **Perfil**: Gerente de projetos
- **Necessidades**:
  - Organizar notas por projeto e cliente
  - Documentar reuniões e decisões
  - Acesso de qualquer dispositivo
- **Comportamento**: Acesso esporádico, notas mais elaboradas
- **Expectativas**: Confiabilidade, privacidade, formatação profissional

### 3.3 Persona 3: Carlos Oliveira - Usuário Casual
- **Idade**: 28 anos
- **Perfil**: Profissional que usa para lembretes pessoais
- **Necessidades**:
  - Organização básica de tarefas e ideias
  - Acesso rápido e simples
- **Comportamento**: Uso ocasional, poucas notas
- **Expectativas**: Simplicidade, sem complexidade desnecessária

---

## 4. Funcionalidades Principais

### 4.1 Autenticação e Segurança
- **Login de Usuário**
  - Autenticação com email e senha
  - Persistência de sessão
  - Logout seguro
  - Proteção de rotas autenticadas

### 4.2 Estrutura Hierárquica

#### 4.2.1 Marcadores (Nível 1)
- Criar marcador com nome personalizado
- Visualizar lista de marcadores
- Editar nome do marcador
- Excluir marcador (com política para notas vinculadas)

#### 4.2.2 Sub-marcadores (Nível 2)
- Criar sub-marcador vinculado a um marcador
- Visualizar sub-marcadores de um marcador
- Editar nome do sub-marcador
- Excluir sub-marcador (com política para notas vinculadas)

### 4.3 Gerenciamento de Notas

#### 4.3.1 Criação de Notas
- Criar nota vinculada a um sub-marcador
- Título obrigatório
- Conteúdo em rich text obrigatório
- Data de criação automática
- Editor rich text com formatações básicas

#### 4.3.2 Visualização de Notas
- Listar todas as notas de um sub-marcador
- Visualizar detalhes completos de uma nota
- Renderizar conteúdo rich text corretamente
- Exibir data de criação

#### 4.3.3 Edição de Notas
- Editar título da nota
- Editar conteúdo rich text
- Preservar data de criação original
- Salvar alterações

#### 4.3.4 Exclusão de Notas
- Excluir nota com confirmação
- Remoção permanente ou soft delete (conforme política)

### 4.4 Editor Rich Text
- **Formatações Suportadas**:
  - Negrito, itálico, sublinhado
  - Listas ordenadas e não ordenadas
  - Títulos (H1, H2, H3)
  - Links
  - Citações
- **Funcionalidades**:
  - Interface de edição intuitiva
  - Preview de formatação
  - Salvamento de formatação

---

## 5. Restrições e Limitações

### 5.1 Restrições Técnicas

#### 5.1.1 Tecnologias Obrigatórias
- **Frontend**: Next.js (React framework)
- **Backend**: Next.js API Routes
- **Banco de Dados**: Neon (PostgreSQL)
- **SDK**: Neon SDK para interação direta com banco
- **Editor Rich Text**: Biblioteca compatível com React (ex: TipTap, Quill, Slate)

#### 5.1.2 Arquitetura
- Aplicação Next.js full-stack
- API Routes para endpoints backend
- Conexão direta ao Neon via SDK (sem ORM obrigatório, mas pode ser usado)
- Autenticação via sessão ou JWT

#### 5.1.3 Limitações de Performance
- Sistema deve suportar pelo menos 1000 notas por usuário
- Tempo de resposta de operações CRUD: < 1 segundo
- Carregamento de páginas: < 2 segundos

### 5.2 Restrições de Negócio
- Sistema inicialmente para uso individual (sem compartilhamento)
- Sem limite de marcadores/sub-marcadores por usuário
- Sem limite de notas por sub-marcador (mas considerar paginação se necessário)

### 5.3 Restrições de Segurança
- Cada usuário só acessa suas próprias notas
- Autenticação obrigatória para todas as operações
- Proteção contra XSS no conteúdo rich text
- Proteção contra SQL Injection
- Dados sensíveis não devem ser expostos em logs

### 5.4 Restrições de Usabilidade
- Interface deve ser responsiva (mobile-friendly)
- Suporte para navegadores modernos (Chrome, Firefox, Safari, Edge)
- Acessibilidade básica (navegação por teclado, contraste)

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance
- **Tempo de Resposta**: < 1 segundo para operações CRUD
- **Tempo de Carregamento**: < 2 segundos para carregamento inicial
- **Escalabilidade**: Suportar 1000+ notas por usuário sem degradação
- **Otimização**: Lazy loading, paginação quando necessário

### 6.2 Segurança
- **Autenticação**: Sistema seguro de login/logout
- **Autorização**: Controle de acesso baseado em usuário
- **Proteção de Dados**: Sanitização de inputs, prevenção de XSS/SQL Injection
- **Sessão**: Gerenciamento seguro de sessões

### 6.3 Usabilidade
- **Interface Intuitiva**: Navegação clara e lógica
- **Feedback Visual**: Confirmações para ações importantes
- **Mensagens de Erro**: Claras e acionáveis
- **Responsividade**: Funciona bem em desktop e mobile

### 6.4 Confiabilidade
- **Disponibilidade**: Sistema disponível 99% do tempo
- **Integridade de Dados**: Garantir que dados não sejam perdidos
- **Tratamento de Erros**: Tratamento adequado de erros e exceções
- **Backup**: Estratégia de backup de dados (responsabilidade do Neon)

### 6.5 Manutenibilidade
- **Código Limpo**: Código bem estruturado e documentado
- **Testabilidade**: Código testável e com testes adequados
- **Documentação**: Documentação técnica atualizada

---

## 7. Modelo de Dados

### 7.1 Entidades Principais

#### 7.1.1 Usuário (User)
```
- id: UUID (Primary Key)
- email: String (Unique, Not Null)
- password_hash: String (Not Null)
- created_at: Timestamp
- updated_at: Timestamp
```

#### 7.1.2 Marcador (Marker)
```
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> User.id)
- name: String (Not Null, Max 100 chars)
- created_at: Timestamp
- updated_at: Timestamp
```

#### 7.1.3 Sub-marcador (SubMarker)
```
- id: UUID (Primary Key)
- marker_id: UUID (Foreign Key -> Marker.id)
- user_id: UUID (Foreign Key -> User.id)
- name: String (Not Null, Max 100 chars)
- created_at: Timestamp
- updated_at: Timestamp
```

#### 7.1.4 Nota (Note)
```
- id: UUID (Primary Key)
- sub_marker_id: UUID (Foreign Key -> SubMarker.id)
- user_id: UUID (Foreign Key -> User.id)
- title: String (Not Null, Max 200 chars)
- content: Text (Not Null) - Rich text formatado (HTML/JSON)
- created_at: Timestamp
- updated_at: Timestamp (opcional)
```

### 7.2 Relacionamentos
- **User** 1:N **Marker** (um usuário tem muitos marcadores)
- **User** 1:N **SubMarker** (um usuário tem muitos sub-marcadores)
- **User** 1:N **Note** (um usuário tem muitas notas)
- **Marker** 1:N **SubMarker** (um marcador tem muitos sub-marcadores)
- **SubMarker** 1:N **Note** (um sub-marcador tem muitas notas)

### 7.3 Índices Recomendados
- `user_id` em todas as tabelas (para queries por usuário)
- `marker_id` em SubMarker (para queries por marcador)
- `sub_marker_id` em Note (para queries por sub-marcador)
- `email` em User (único, já é índice)

### 7.4 Políticas de Exclusão
- **Cascata**: Ao excluir um marcador, excluir todos os sub-marcadores e notas vinculadas
- **OU Restrição**: Impedir exclusão se houver sub-marcadores/notas vinculadas
- **OU Mover**: Mover sub-marcadores/notas para um marcador padrão antes de excluir

**Decisão**: Definir durante desenvolvimento, mas recomenda-se **Restrição** para evitar perda acidental de dados.

---

## 8. Arquitetura Técnica

### 8.1 Stack Tecnológico
- **Frontend Framework**: Next.js 14+ (App Router recomendado)
- **Linguagem**: TypeScript
- **Estilização**: CSS Modules, Tailwind CSS, ou styled-components
- **Banco de Dados**: Neon (PostgreSQL)
- **SDK**: @neondatabase/serverless (Neon SDK)
- **Autenticação**: NextAuth.js ou implementação customizada
- **Editor Rich Text**: TipTap, Quill, ou Slate (recomendado TipTap)

### 8.2 Estrutura de Pastas Sugerida
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Rotas autenticadas
│   └── api/               # API Routes
│       ├── auth/          # Endpoints de autenticação
│       ├── markers/       # Endpoints de marcadores
│       ├── sub-markers/   # Endpoints de sub-marcadores
│       └── notes/         # Endpoints de notas
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI reutilizáveis
│   ├── editor/           # Componentes do editor rich text
│   └── layout/           # Componentes de layout
├── lib/                  # Utilitários e configurações
│   ├── db/              # Configuração do banco (Neon)
│   ├── auth/            # Lógica de autenticação
│   └── utils/           # Funções utilitárias
└── types/               # TypeScript types
```

### 8.3 API Routes (Next.js)

#### 8.3.1 Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Verificar usuário atual

#### 8.3.2 Marcadores
- `GET /api/markers` - Listar marcadores do usuário
- `POST /api/markers` - Criar marcador
- `PUT /api/markers/[id]` - Editar marcador
- `DELETE /api/markers/[id]` - Excluir marcador

#### 8.3.3 Sub-marcadores
- `GET /api/sub-markers?marker_id=[id]` - Listar sub-marcadores
- `POST /api/sub-markers` - Criar sub-marcador
- `PUT /api/sub-markers/[id]` - Editar sub-marcador
- `DELETE /api/sub-markers/[id]` - Excluir sub-marcador

#### 8.3.4 Notas
- `GET /api/notes?sub_marker_id=[id]` - Listar notas
- `GET /api/notes/[id]` - Obter nota específica
- `POST /api/notes` - Criar nota
- `PUT /api/notes/[id]` - Editar nota
- `DELETE /api/notes/[id]` - Excluir nota

### 8.4 Integração com Neon
- Usar `@neondatabase/serverless` para conexões serverless
- Configurar variáveis de ambiente para conexão
- Implementar pool de conexões adequado
- Tratamento de erros de conexão

---

## 9. Fluxos Principais

### 9.1 Fluxo de Autenticação
1. Usuário acessa sistema
2. Se não autenticado, redireciona para login
3. Usuário informa credenciais
4. Sistema valida e cria sessão
5. Redireciona para dashboard

### 9.2 Fluxo de Criação de Estrutura
1. Usuário autenticado acessa dashboard
2. Cria marcador (ex: "Trabalho")
3. Seleciona marcador e cria sub-marcador (ex: "Projetos 2024")
4. Estrutura está pronta para receber notas

### 9.3 Fluxo de Criação de Nota
1. Usuário seleciona sub-marcador
2. Clica em "Nova Nota"
3. Preenche título
4. Edita conteúdo no editor rich text
5. Salva nota
6. Nota aparece na lista do sub-marcador

### 9.4 Fluxo de Edição de Nota
1. Usuário visualiza lista de notas
2. Clica em uma nota para visualizar
3. Clica em "Editar"
4. Modifica título e/ou conteúdo
5. Salva alterações
6. Retorna para visualização atualizada

### 9.5 Fluxo de Exclusão
1. Usuário visualiza nota ou marcador/sub-marcador
2. Clica em "Excluir"
3. Sistema exibe confirmação
4. Usuário confirma
5. Item é excluído
6. Lista é atualizada

---

## 10. Regras de Negócio

### 10.1 Autenticação
- Email deve ser único no sistema
- Senha deve ter no mínimo 8 caracteres (recomendado)
- Sessão expira após período de inatividade (definir política)
- Usuário só acessa seus próprios dados

### 10.2 Estrutura Hierárquica
- Um marcador pode ter múltiplos sub-marcadores
- Um sub-marcador pertence a apenas um marcador
- Não é possível criar sub-marcador sem marcador pai
- Nomes de marcadores/sub-marcadores podem ser duplicados (se não houver restrição de negócio)

### 10.3 Notas
- Uma nota pertence a apenas um sub-marcador
- Título é obrigatório e tem limite de caracteres
- Conteúdo é obrigatório (mesmo que vazio, mas formato válido)
- Data de criação é automática e não pode ser alterada
- Data de atualização é opcional (pode ser implementada)

### 10.4 Exclusões
- Ao excluir marcador: definir política (cascata, restrição, ou mover)
- Ao excluir sub-marcador: definir política para notas vinculadas
- Exclusão de nota é permanente (ou soft delete conforme política)

---

## 11. Casos de Uso Especiais

### 11.1 Primeiro Uso do Sistema
- Usuário faz cadastro/login
- Sistema exibe tutorial ou mensagem de boas-vindas
- Sugere criar primeiro marcador
- Interface guiada para primeira criação

### 11.2 Usuário sem Estrutura
- Se usuário não tem marcadores, exibir mensagem motivacional
- Oferecer botão destacado para criar primeiro marcador
- Não exibir listas vazias sem contexto

### 11.3 Sub-marcador sem Notas
- Exibir mensagem "Nenhuma nota ainda"
- Oferecer botão para criar primeira nota
- Não exibir lista vazia sem contexto

### 11.4 Busca (Futuro)
- Funcionalidade de busca pode ser adicionada posteriormente
- Não é requisito inicial, mas considerar na arquitetura

---

## 12. Definições e Glossário

- **Marcador**: Categoria principal de organização (nível 1 da hierarquia)
- **Sub-marcador**: Subcategoria vinculada a um marcador (nível 2 da hierarquia)
- **Nota**: Item de conteúdo com título e texto rico, vinculado a um sub-marcador
- **Rich Text**: Texto formatado com formatações (negrito, itálico, listas, etc.)
- **Neon**: Serviço de banco de dados PostgreSQL serverless
- **API Routes**: Endpoints backend do Next.js
- **SDK**: Software Development Kit (kit de desenvolvimento)

---

## 13. Anexos e Referências

### 13.1 Documentação Técnica
- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Documentation](https://neon.tech/docs)
- [TipTap Editor](https://tiptap.dev/) (exemplo de editor rich text)

### 13.2 Decisões Pendentes
- Política de exclusão em cascata (marcador > sub-marcador > notas)
- Implementação de data de atualização em notas
- Estratégia de paginação para listas grandes
- Biblioteca específica de rich text editor

---

## 14. Histórico de Versões

| Data | Versão | Autor | Descrição |
|------|--------|-------|-----------|
| 2024-XX-XX | 1.0 | Product Owner | Documento inicial de requisitos |

---

**Documento gerado automaticamente baseado no template de Product Owner**



