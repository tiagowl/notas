# ✅ Checklist de Deploy para Vercel

Use este checklist para garantir que tudo está configurado corretamente antes do deploy.

## 📋 Antes do Deploy

### 1. Configuração do Código
- [x] Arquivo `vercel.json` criado
- [x] Arquivo `.vercelignore` criado
- [x] Arquivo `.gitignore` configurado
- [x] `next.config.js` otimizado para produção
- [x] Todos os erros de TypeScript corrigidos
- [x] Build local funciona (`npm run build`)

### 2. Banco de Dados
- [ ] Banco de dados Neon PostgreSQL criado
- [ ] Script SQL executado (`database/schema.sql`)
- [ ] Tabelas criadas corretamente:
  - [ ] `users`
  - [ ] `markers`
  - [ ] `sub_markers`
  - [ ] `notes`
- [ ] URL de conexão anotada (formato: `postgresql://user:password@host/database?sslmode=require`)

### 3. Variáveis de Ambiente
- [ ] `DATABASE_URL` - URL completa do banco Neon
- [ ] `JWT_SECRET` - String aleatória forte (mínimo 32 caracteres)
- [ ] `JWT_EXPIRES_IN` - Tempo de expiração (opcional, padrão: `7d`)

### 4. Repositório Git
- [ ] Código commitado e enviado para o repositório
- [ ] Branch principal configurada (main/master)
- [ ] Repositório conectado à Vercel

## 🚀 Durante o Deploy

### 5. Configuração na Vercel
- [ ] Projeto criado na Vercel
- [ ] Repositório importado
- [ ] Framework detectado: Next.js
- [ ] Root Directory: `src/frontend` (se aplicável)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next` (padrão)
- [ ] Install Command: `npm install`

### 6. Variáveis de Ambiente na Vercel
- [ ] `DATABASE_URL` configurada
- [ ] `JWT_SECRET` configurada
- [ ] `JWT_EXPIRES_IN` configurada (opcional)
- [ ] Todas as variáveis marcadas como "Production"

### 7. Deploy
- [ ] Deploy iniciado
- [ ] Build completado sem erros
- [ ] Logs verificados
- [ ] URL de produção gerada

## ✅ Após o Deploy

### 8. Verificação Funcional
- [ ] Aplicação acessível na URL da Vercel
- [ ] Página de login carrega
- [ ] É possível criar uma conta
- [ ] É possível fazer login
- [ ] Dashboard carrega corretamente
- [ ] É possível criar marcador
- [ ] É possível criar sub-marcador
- [ ] É possível criar nota
- [ ] Editor rich text funciona
- [ ] É possível visualizar nota detalhada

### 9. Verificação de Segurança
- [ ] `JWT_SECRET` não está no código
- [ ] `DATABASE_URL` não está no código
- [ ] Variáveis de ambiente estão configuradas na Vercel
- [ ] HTTPS está habilitado (automático na Vercel)

### 10. Performance
- [ ] Páginas carregam rapidamente
- [ ] Sem erros no console do navegador
- [ ] API responses são rápidas
- [ ] Imagens/assets carregam corretamente

## 🐛 Troubleshooting

Se encontrar problemas:

1. **Erro de Build**
   - Verifique os logs na Vercel
   - Execute `npm run build` localmente
   - Verifique erros de TypeScript: `npm run type-check`

2. **Erro de Conexão com Banco**
   - Verifique se `DATABASE_URL` está correta
   - Verifique se o banco permite conexões externas
   - Teste a conexão localmente

3. **Erro de Autenticação**
   - Verifique se `JWT_SECRET` está configurada
   - Verifique se o formato está correto
   - Gere uma nova chave se necessário

4. **Páginas não carregam**
   - Verifique se o build completou
   - Verifique os logs de runtime
   - Verifique se há erros no console do navegador

## 📝 Notas

- A Vercel detecta automaticamente o Next.js
- O deploy é automático a cada push (se configurado)
- Variáveis de ambiente são criptografadas
- Logs estão disponíveis no dashboard da Vercel

## 🔗 Links Úteis

- [Dashboard Vercel](https://vercel.com/dashboard)
- [Documentação Vercel](https://vercel.com/docs)
- [Neon Console](https://console.neon.tech)

