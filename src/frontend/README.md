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
│   ├── (dashboard)/       # Rotas autenticadas
│   ├── dashboard/         # Dashboard principal
│   ├── api/               # API Routes
│   └── ...
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

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run type-check` - Verifica tipos TypeScript

## 🚀 Deploy

Para fazer deploy na Vercel, consulte o arquivo [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.

### Deploy Rápido

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN` (opcional)
3. Execute o deploy

## 🔧 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Neon PostgreSQL** - Banco de dados
- **TipTap** - Editor rich text
- **Zod** - Validação de schemas
- **React Hook Form** - Gerenciamento de formulários
- **JWT** - Autenticação

## 📝 Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE_URL` | Sim | URL de conexão do PostgreSQL |
| `JWT_SECRET` | Sim | Chave secreta para JWT |
| `JWT_EXPIRES_IN` | Não | Tempo de expiração do token (padrão: 7d) |
| `NEXT_PUBLIC_APP_URL` | Não | URL da aplicação |
| `NODE_ENV` | Não | Ambiente (development/production) |

## 🐛 Troubleshooting

### Erro: "DATABASE_URL is not set"
- Verifique se a variável está definida no `.env.local`
- Certifique-se de que o formato está correto

### Erro de Build
- Execute `npm run type-check` para verificar erros de TypeScript
- Verifique se todas as dependências estão instaladas

### Erro de Conexão com Banco
- Verifique se a URL do banco está correta
- Certifique-se de que o banco permite conexões externas
- Verifique se o SSL está habilitado

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Documentation](https://neon.tech/docs)
- [TipTap Documentation](https://tiptap.dev)

## 📄 Licença

Este projeto é privado.
