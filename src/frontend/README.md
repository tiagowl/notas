# Sistema de Gerenciamento de Notas - Frontend

Aplicação Next.js para gerenciamento hierárquico de notas.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Banco de dados Neon PostgreSQL configurado

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais:
- `DATABASE_URL`: URL de conexão do Neon PostgreSQL
- `JWT_SECRET`: Chave secreta para JWT (use uma string aleatória forte)
- `JWT_EXPIRES_IN`: Tempo de expiração do token (padrão: 7d)

3. Execute o script SQL no banco de dados:
```bash
# Execute o arquivo database/schema.sql no seu banco Neon
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Rotas autenticadas
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── layout/           # Layout components
│   ├── markers/          # Componentes de marcadores
│   ├── sub-markers/      # Componentes de sub-marcadores
│   ├── notes/            # Componentes de notas
│   └── editor/           # Editor rich text
├── hooks/                 # React Hooks customizados
├── lib/                   # Bibliotecas e utilitários
│   ├── auth/            # Autenticação
│   ├── db/              # Database client
│   ├── services/        # Business logic
│   ├── validators/      # Validações Zod
│   └── utils/          # Utilitários
└── types/               # TypeScript types
```

## 🛠️ Tecnologias

- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**
- **Tailwind CSS**
- **TipTap** (Editor Rich Text)
- **Zod** (Validação)
- **Neon PostgreSQL** (Banco de dados)
- **JWT** (Autenticação)

## 📝 Funcionalidades

- ✅ Autenticação (Login/Registro)
- ✅ Gerenciamento de Marcadores
- ✅ Gerenciamento de Sub-marcadores
- ✅ Gerenciamento de Notas
- ✅ Editor Rich Text
- ✅ Interface Responsiva
- ✅ Validação de dados
- ✅ Sanitização de HTML (XSS prevention)

## 🔒 Segurança

- Autenticação JWT
- Senhas hasheadas com bcrypt
- Sanitização de conteúdo HTML
- Validação de inputs
- Proteção contra SQL Injection (parameterized queries)

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter
- `npm run type-check` - Verifica tipos TypeScript

## 🗄️ Banco de Dados

Execute o script `database/schema.sql` no seu banco Neon PostgreSQL para criar as tabelas necessárias.

## 📄 Licença

Este projeto é privado.


