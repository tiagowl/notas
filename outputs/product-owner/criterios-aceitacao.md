# Critérios de Aceitação - Sistema de Gerenciamento de Notas

## US-001: Login do Usuário

### Cenários de Sucesso ✅

1. **Login com credenciais válidas**
   - DADO que o usuário está na tela de login
   - QUANDO o usuário informa email e senha válidos
   - ENTÃO o sistema autentica o usuário
   - E redireciona para a página principal
   - E exibe mensagem de boas-vindas

2. **Persistência de sessão**
   - DADO que o usuário fez login
   - QUANDO o usuário fecha e reabre o navegador
   - ENTÃO a sessão permanece ativa (se token válido)
   - OU o usuário é redirecionado para login (se token expirado)

### Casos Extremos ⚠️

1. **Credenciais inválidas**
   - DADO que o usuário está na tela de login
   - QUANDO o usuário informa email ou senha incorretos
   - ENTÃO o sistema exibe mensagem de erro clara
   - E não permite acesso ao sistema
   - E mantém o campo de senha limpo (por segurança)

2. **Campos vazios**
   - DADO que o usuário está na tela de login
   - QUANDO o usuário tenta fazer login sem preencher campos
   - ENTÃO o sistema exibe validação indicando campos obrigatórios
   - E não permite submissão do formulário

3. **Múltiplas tentativas de login**
   - DADO que o usuário falhou no login 5 vezes
   - QUANDO o usuário tenta fazer login novamente
   - ENTÃO o sistema pode implementar rate limiting
   - E exibir mensagem apropriada

### Validações Necessárias ✓

- [ ] Email deve ter formato válido
- [ ] Senha deve ter no mínimo 8 caracteres (se aplicável)
- [ ] Token de autenticação é gerado corretamente
- [ ] Token é armazenado de forma segura (httpOnly cookie ou localStorage)
- [ ] Logout remove completamente a sessão

---

## US-002: Criar Marcador

### Cenários de Sucesso ✅

1. **Criar marcador com nome válido**
   - DADO que o usuário está autenticado
   - QUANDO o usuário cria um marcador com nome "Trabalho"
   - ENTÃO o marcador é criado com sucesso
   - E aparece na lista de marcadores
   - E o usuário pode selecioná-lo

2. **Múltiplos marcadores**
   - DADO que o usuário já tem marcadores criados
   - QUANDO o usuário cria um novo marcador
   - ENTÃO o novo marcador é adicionado à lista
   - E não interfere com marcadores existentes

### Casos Extremos ⚠️

1. **Nome vazio**
   - DADO que o usuário tenta criar um marcador
   - QUANDO o nome está vazio
   - ENTÃO o sistema exibe validação
   - E não permite criação

2. **Nome muito longo**
   - DADO que o usuário tenta criar um marcador
   - QUANDO o nome excede 100 caracteres (ou limite definido)
   - ENTÃO o sistema exibe validação
   - E sugere limite de caracteres

3. **Marcador duplicado**
   - DADO que já existe um marcador "Trabalho"
   - QUANDO o usuário tenta criar outro marcador "Trabalho"
   - ENTÃO o sistema pode permitir (se não houver restrição)
   - OU sugerir nome alternativo

### Validações Necessárias ✓

- [ ] Nome é obrigatório
- [ ] Nome tem limite de caracteres definido
- [ ] Marcador é salvo no banco de dados
- [ ] Marcador está vinculado ao usuário autenticado
- [ ] Data de criação é registrada automaticamente

---

## US-003: Criar Sub-marcador

### Cenários de Sucesso ✅

1. **Criar sub-marcador vinculado a marcador**
   - DADO que existe um marcador "Trabalho"
   - QUANDO o usuário cria um sub-marcador "Projetos 2024" vinculado a "Trabalho"
   - ENTÃO o sub-marcador é criado com sucesso
   - E aparece hierarquicamente abaixo do marcador "Trabalho"
   - E pode ser selecionado para criar notas

2. **Múltiplos sub-marcadores no mesmo marcador**
   - DADO que existe um marcador "Trabalho"
   - QUANDO o usuário cria vários sub-marcadores
   - ENTÃO todos aparecem organizados sob o marcador
   - E cada um pode ter suas próprias notas

### Casos Extremos ⚠️

1. **Tentar criar sub-marcador sem marcador pai**
   - DADO que o usuário tenta criar um sub-marcador
   - QUANDO nenhum marcador foi selecionado
   - ENTÃO o sistema exibe mensagem solicitando seleção de marcador
   - E não permite criação

2. **Marcador pai excluído**
   - DADO que um sub-marcador existe
   - QUANDO o marcador pai é excluído
   - ENTÃO o sistema deve definir política (excluir em cascata, mover, ou impedir exclusão)

### Validações Necessárias ✓

- [ ] Sub-marcador deve ter marcador pai válido
- [ ] Nome é obrigatório
- [ ] Sub-marcador é salvo no banco de dados
- [ ] Relacionamento pai-filho é mantido corretamente
- [ ] Sub-marcador está vinculado ao usuário autenticado

---

## US-007: Criar Nota

### Cenários de Sucesso ✅

1. **Criar nota completa**
   - DADO que existe um sub-marcador "Projetos 2024"
   - QUANDO o usuário cria uma nota com:
     - Título: "Reunião de Planejamento"
     - Conteúdo: Texto formatado em rich text
   - ENTÃO a nota é criada com sucesso
   - E a data de criação é registrada automaticamente
   - E a nota aparece na lista do sub-marcador
   - E o conteúdo rich text é preservado

2. **Nota com formatação completa**
   - DADO que o usuário está criando uma nota
   - QUANDO o usuário aplica formatações (negrito, listas, títulos)
   - ENTÃO todas as formatações são salvas corretamente
   - E são exibidas corretamente ao visualizar a nota

### Casos Extremos ⚠️

1. **Título vazio**
   - DADO que o usuário tenta criar uma nota
   - QUANDO o título está vazio
   - ENTÃO o sistema exibe validação
   - E não permite criação

2. **Conteúdo vazio**
   - DADO que o usuário tenta criar uma nota
   - QUANDO o conteúdo está vazio
   - ENTÃO o sistema exibe validação
   - E não permite criação

3. **Título muito longo**
   - DADO que o usuário tenta criar uma nota
   - QUANDO o título excede limite de caracteres
   - ENTÃO o sistema exibe validação
   - E sugere limite

4. **Conteúdo muito extenso**
   - DADO que o usuário cria uma nota
   - QUANDO o conteúdo tem mais de 10.000 caracteres (ou limite)
   - ENTÃO o sistema deve processar corretamente
   - E manter performance adequada

5. **Sub-marcador excluído**
   - DADO que uma nota existe vinculada a um sub-marcador
   - QUANDO o sub-marcador é excluído
   - ENTÃO o sistema deve definir política (excluir nota, mover, ou impedir exclusão)

### Validações Necessárias ✓

- [ ] Título é obrigatório
- [ ] Conteúdo é obrigatório
- [ ] Data de criação é registrada automaticamente
- [ ] Nota está vinculada a um sub-marcador válido
- [ ] Nota está vinculada ao usuário autenticado
- [ ] Conteúdo rich text é salvo corretamente no banco
- [ ] Conteúdo rich text é renderizado corretamente na visualização
- [ ] Limites de caracteres são respeitados

---

## US-008: Visualizar Lista de Notas

### Cenários de Sucesso ✅

1. **Listar notas de um sub-marcador**
   - DADO que existem 5 notas no sub-marcador "Projetos 2024"
   - QUANDO o usuário acessa o sub-marcador
   - ENTÃO todas as 5 notas são exibidas em lista
   - E cada nota mostra título e data de criação
   - E as notas estão ordenadas (por data ou alfabeticamente)

2. **Sub-marcador sem notas**
   - DADO que um sub-marcador não tem notas
   - QUANDO o usuário acessa o sub-marcador
   - ENTÃO é exibida mensagem "Nenhuma nota encontrada"
   - E é oferecida opção de criar primeira nota

### Casos Extremos ⚠️

1. **Muitas notas (paginação)**
   - DADO que existem 100+ notas em um sub-marcador
   - QUANDO o usuário acessa o sub-marcador
   - ENTÃO as notas são paginadas (ex: 20 por página)
   - E há controles de navegação entre páginas

2. **Notas de outro usuário**
   - DADO que existem notas de outros usuários no banco
   - QUANDO o usuário acessa seus sub-marcadores
   - ENTÃO apenas suas próprias notas são exibidas
   - E não há acesso a notas de outros usuários

### Validações Necessárias ✓

- [ ] Apenas notas do usuário autenticado são exibidas
- [ ] Apenas notas do sub-marcador selecionado são exibidas
- [ ] Lista está ordenada de forma consistente
- [ ] Performance é adequada mesmo com muitas notas
- [ ] Paginação funciona corretamente (se implementada)

---

## US-009: Visualizar Detalhes da Nota

### Cenários de Sucesso ✅

1. **Visualizar nota completa**
   - DADO que existe uma nota "Reunião de Planejamento"
   - QUANDO o usuário clica na nota
   - ENTÃO a nota é exibida com:
     - Título completo
     - Conteúdo formatado (rich text renderizado)
     - Data de criação
   - E todas as formatações são preservadas

2. **Navegação entre notas**
   - DADO que o usuário está visualizando uma nota
   - QUANDO o usuário quer ver outra nota
   - ENTÃO há opção de voltar à lista
   - OU navegar para próxima/anterior (se implementado)

### Casos Extremos ⚠️

1. **Nota não encontrada**
   - DADO que o usuário tenta acessar uma nota por ID
   - QUANDO a nota não existe ou foi excluída
   - ENTÃO o sistema exibe mensagem "Nota não encontrada"
   - E redireciona para lista de notas

2. **Nota de outro usuário**
   - DADO que existe uma nota de outro usuário
   - QUANDO o usuário tenta acessar por ID direto
   - ENTÃO o sistema retorna erro 403 (Forbidden)
   - E não exibe conteúdo da nota

3. **Conteúdo corrompido**
   - DADO que uma nota tem conteúdo rich text inválido
   - QUANDO o usuário tenta visualizar
   - ENTÃO o sistema exibe conteúdo de forma segura
   - E não quebra a interface

### Validações Necessárias ✓

- [ ] Apenas notas do usuário autenticado podem ser visualizadas
- [ ] Rich text é renderizado corretamente
- [ ] Data de criação é exibida no formato correto
- [ ] Performance é adequada mesmo com conteúdo extenso
- [ ] XSS (Cross-Site Scripting) é prevenido no conteúdo

---

## US-010: Editar Nota

### Cenários de Sucesso ✅

1. **Editar título e conteúdo**
   - DADO que existe uma nota "Reunião de Planejamento"
   - QUANDO o usuário edita o título para "Reunião de Planejamento - Atualizado"
   - E edita o conteúdo adicionando mais informações
   - ENTÃO as alterações são salvas com sucesso
   - E a data de criação original é mantida
   - E a nota atualizada é exibida corretamente

2. **Editar apenas título**
   - DADO que existe uma nota
   - QUANDO o usuário edita apenas o título
   - ENTÃO o conteúdo permanece inalterado
   - E apenas o título é atualizado

3. **Editar apenas conteúdo**
   - DADO que existe uma nota
   - QUANDO o usuário edita apenas o conteúdo
   - ENTÃO o título permanece inalterado
   - E apenas o conteúdo é atualizado

### Casos Extremos ⚠️

1. **Título vazio após edição**
   - DADO que o usuário está editando uma nota
   - QUANDO o usuário remove todo o título
   - ENTÃO o sistema exibe validação
   - E não permite salvar

2. **Conteúdo vazio após edição**
   - DADO que o usuário está editando uma nota
   - QUANDO o usuário remove todo o conteúdo
   - ENTÃO o sistema exibe validação
   - E não permite salvar

3. **Conflito de edição simultânea**
   - DADO que dois usuários tentam editar a mesma nota
   - QUANDO ambos salvam alterações
   - ENTÃO o sistema deve implementar política (último salvo vence, ou bloqueio)

4. **Nota excluída durante edição**
   - DADO que o usuário está editando uma nota
   - QUANDO a nota é excluída (por outro processo)
   - ENTÃO o sistema detecta e exibe mensagem apropriada
   - E não permite salvar

### Validações Necessárias ✓

- [ ] Apenas o dono da nota pode editá-la
- [ ] Título é obrigatório após edição
- [ ] Conteúdo é obrigatório após edição
- [ ] Data de criação original é preservada
- [ ] Rich text é preservado na edição
- [ ] Alterações são salvas corretamente no banco
- [ ] Feedback visual confirma salvamento

---

## US-011: Excluir Nota

### Cenários de Sucesso ✅

1. **Excluir nota com confirmação**
   - DADO que existe uma nota "Reunião de Planejamento"
   - QUANDO o usuário clica em excluir
   - ENTÃO o sistema exibe diálogo de confirmação
   - E quando o usuário confirma
   - ENTÃO a nota é excluída permanentemente
   - E desaparece da lista
   - E mensagem de sucesso é exibida

2. **Cancelar exclusão**
   - DADO que o usuário clicou em excluir
   - QUANDO o usuário cancela no diálogo de confirmação
   - ENTÃO a nota não é excluída
   - E o usuário retorna à visualização da nota

### Casos Extremos ⚠️

1. **Tentar excluir nota de outro usuário**
   - DADO que existe uma nota de outro usuário
   - QUANDO o usuário tenta excluir por ID direto
   - ENTÃO o sistema retorna erro 403 (Forbidden)
   - E não exclui a nota

2. **Nota já excluída**
   - DADO que uma nota foi excluída
   - QUANDO o usuário tenta excluir novamente
   - ENTÃO o sistema exibe mensagem apropriada
   - E não tenta excluir novamente

### Validações Necessárias ✓

- [ ] Apenas o dono da nota pode excluí-la
- [ ] Diálogo de confirmação é exibido
- [ ] Nota é removida do banco de dados
- [ ] Nota desaparece da lista imediatamente
- [ ] Exclusão é permanente (ou soft delete, conforme política)
- [ ] Feedback visual confirma exclusão

---

## US-012: Formatação de Texto (Rich Text)

### Cenários de Sucesso ✅

1. **Aplicar formatação básica**
   - DADO que o usuário está criando/editando uma nota
   - QUANDO o usuário seleciona texto e aplica negrito
   - ENTÃO o texto fica em negrito
   - E a formatação é salva corretamente
   - E é exibida corretamente na visualização

2. **Múltiplas formatações**
   - DADO que o usuário está editando uma nota
   - QUANDO o usuário aplica negrito, itálico e lista
   - ENTÃO todas as formatações são aplicadas
   - E são preservadas ao salvar

3. **Formatações suportadas**
   - Negrito, itálico, sublinhado
   - Listas ordenadas e não ordenadas
   - Títulos (H1, H2, H3)
   - Links
   - Citações

### Casos Extremos ⚠️

1. **Formatação em texto muito longo**
   - DADO que o usuário tem texto de 5000 caracteres
   - QUANDO o usuário aplica formatação
   - ENTÃO a performance permanece adequada
   - E a formatação é aplicada corretamente

2. **Formatação malformada**
   - DADO que o conteúdo rich text está corrompido
   - QUANDO o usuário tenta editar
   - ENTÃO o sistema sanitiza o conteúdo
   - E permite edição segura

3. **Copiar e colar de fontes externas**
   - DADO que o usuário cola texto de outro editor
   - QUANDO o texto tem formatação incompatível
   - ENTÃO o sistema converte ou remove formatação problemática
   - E mantém formatação compatível

### Validações Necessárias ✓

- [ ] Todas as formatações básicas funcionam
- [ ] Formatação é salva no formato correto (HTML, Markdown, ou JSON)
- [ ] Formatação é renderizada corretamente na visualização
- [ ] Performance é adequada com conteúdo formatado
- [ ] XSS é prevenido no conteúdo rich text
- [ ] Editor é responsivo e funciona em mobile (se aplicável)

---

## Critérios Gerais de Qualidade

### Performance
- [ ] Páginas carregam em menos de 2 segundos
- [ ] Operações CRUD respondem em menos de 1 segundo
- [ ] Sistema suporta pelo menos 1000 notas por usuário

### Segurança
- [ ] Todas as requisições são autenticadas
- [ ] Usuários só acessam seus próprios dados
- [ ] Dados sensíveis não são expostos
- [ ] XSS e SQL Injection são prevenidos

### Usabilidade
- [ ] Interface é intuitiva e fácil de usar
- [ ] Mensagens de erro são claras e acionáveis
- [ ] Feedback visual para todas as ações
- [ ] Sistema funciona em navegadores modernos

### Acessibilidade
- [ ] Navegação por teclado funciona
- [ ] Contraste de cores adequado
- [ ] Textos alternativos em imagens (se houver)
- [ ] Estrutura semântica HTML correta







