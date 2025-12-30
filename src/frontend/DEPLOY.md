# Guia de Deploy para Vercel

Este guia explica como fazer o deploy do sistema de gerenciamento de notas para a Vercel.

## 📋 Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Conta no [Neon](https://neon.tech) (ou outro banco PostgreSQL)
3. Repositório Git (GitHub, GitLab ou Bitbucket)

## 🚀 Passo a Passo

### 1. Preparar o Repositório

Certifique-se de que seu código está em um repositório Git:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <seu-repositorio>
git push -u origin main
```

### 2. Configurar Variáveis de Ambiente na Vercel

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Clique em "Add New Project"
3. Importe seu repositório
4. Antes de fazer o deploy, configure as variáveis de ambiente:

**Variáveis Obrigatórias:**
- `DATABASE_URL`: URL de conexão do seu banco Neon PostgreSQL
  - Formato: `postgresql://user:password@host/database?sslmode=require`
- `JWT_SECRET`: Chave secreta para assinatura de tokens JWT
  - Use uma string aleatória forte (ex: `openssl rand -base64 32`)

**Variáveis Opcionais:**
- `JWT_EXPIRES_IN`: Tempo de expiração do token (padrão: `7d`)
- `NEXT_PUBLIC_APP_URL`: URL da aplicação (será definida automaticamente pela Vercel)
- `NODE_ENV`: Ambiente (será definido automaticamente como `production`)

### 3. Configurar o Projeto na Vercel

1. **Framework Preset**: Next.js (detectado automaticamente)
2. **Root Directory**: `src/frontend` (se o projeto estiver em subpasta)
3. **Build Command**: `npm run build` (padrão)
4. **Output Directory**: `.next` (padrão)
5. **Install Command**: `npm install` (padrão)

### 4. Executar o Script SQL

Antes do primeiro deploy, execute o script SQL no seu banco de dados Neon:

1. Acesse o [Neon Console](https://console.neon.tech)
2. Abra o SQL Editor
3. Execute o conteúdo do arquivo `src/frontend/database/schema.sql`

### 5. Fazer o Deploy

1. Clique em "Deploy" na Vercel
2. Aguarde o build completar
3. Verifique os logs para garantir que não há erros

## 🔧 Configurações Adicionais

### Configurar Domínio Personalizado (Opcional)

1. No dashboard do projeto na Vercel
2. Vá em "Settings" > "Domains"
3. Adicione seu domínio personalizado

### Configurar Variáveis de Ambiente por Ambiente

Você pode ter diferentes variáveis para:
- **Production**: Produção
- **Preview**: Branches de preview
- **Development**: Ambiente de desenvolvimento local

## ✅ Verificação Pós-Deploy

Após o deploy, verifique:

1. ✅ A aplicação está acessível
2. ✅ Página de login carrega corretamente
3. ✅ É possível criar uma conta
4. ✅ É possível fazer login
5. ✅ Dashboard carrega corretamente
6. ✅ É possível criar marcadores, sub-marcadores e notas

## 🐛 Troubleshooting

### Erro: "DATABASE_URL is not set"

- Verifique se a variável de ambiente `DATABASE_URL` está configurada na Vercel
- Certifique-se de que o formato está correto

### Erro: "JWT_SECRET is not set"

- Adicione a variável `JWT_SECRET` nas configurações do projeto na Vercel

### Erro de Build

- Verifique os logs de build na Vercel
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se não há erros de TypeScript

### Erro de Conexão com Banco de Dados

- Verifique se a URL do banco está correta
- Certifique-se de que o banco permite conexões da Vercel (whitelist de IPs)
- Verifique se o SSL está habilitado (`sslmode=require`)

## 📝 Notas Importantes

- A Vercel automaticamente detecta o Next.js e configura o build
- O arquivo `vercel.json` contém configurações adicionais se necessário
- Variáveis de ambiente são criptografadas e seguras na Vercel
- O deploy é automático a cada push na branch principal (se configurado)

## 🔗 Links Úteis

- [Documentação da Vercel](https://vercel.com/docs)
- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Neon](https://neon.tech/docs)

