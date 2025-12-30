# Guia de Setup Rápido

## 1. Instalação de Dependências

```bash
cd src/frontend
npm install
```

## 2. Configuração do Banco de Dados

1. Crie um projeto no [Neon](https://neon.tech)
2. Copie a connection string do seu banco
3. Execute o script SQL:

```bash
# No painel do Neon, vá em SQL Editor e execute:
# O conteúdo do arquivo database/schema.sql
```

## 3. Configuração de Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp env.example .env.local
```

2. Edite `.env.local` com suas credenciais:

```env
DATABASE_URL=postgresql://neondb_owner:npg_d52WuDOtMBgP@ep-super-cell-adod3tqf-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=3b0bfef466ddb8a414877de0f310471a7bb3b5692541f8fa66626e759ab5d199
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**Importante**: Gere uma chave JWT_SECRET forte. Você pode usar:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Executar o Projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## 5. Primeiro Acesso

1. Acesse http://localhost:3000
2. Você será redirecionado para `/login`
3. Clique em "Criar conta"
4. Crie sua primeira conta
5. Você será redirecionado para o dashboard
6. Siga o tutorial para criar seu primeiro marcador

## Estrutura de Dados

O sistema usa uma hierarquia:
- **Marcador** (nível 1) - Ex: "Trabalho", "Estudos"
- **Sub-marcador** (nível 2) - Ex: "Projetos 2024", "Matemática"
- **Nota** (nível 3) - Notas individuais com título e conteúdo rich text

## Troubleshooting

### Erro de conexão com banco
- Verifique se o DATABASE_URL está correto
- Verifique se o banco está acessível
- Certifique-se de que executou o schema.sql

### Erro de autenticação
- Verifique se JWT_SECRET está configurado
- Certifique-se de que a chave é forte o suficiente

### Erro ao criar nota
- Verifique se criou um marcador e sub-marcador primeiro
- A hierarquia deve ser: Marcador → Sub-marcador → Nota



