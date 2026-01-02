# 🔧 Correção: Erro ao Buscar Notas em Produção

## ❌ Problema

Ao clicar em um sub-marcador em produção, as notas não aparecem e ocorre um erro.

## 🔍 Causas Identificadas

1. **Tratamento de erro insuficiente**: Erros não estavam sendo capturados e exibidos corretamente
2. **Falta de logs de debug**: Difícil identificar onde o problema estava ocorrendo
3. **Validação de parâmetros**: Não havia validação adequada do `sub_marker_id`
4. **Codificação de URL**: Pode haver problemas com caracteres especiais na URL

## ✅ Correções Aplicadas

### 1. Hook `useNotes` - Melhorias no `fetchNotes`

**Melhorias:**
- ✅ Logs detalhados em cada etapa da requisição
- ✅ Tratamento de erro mais robusto com mensagens específicas
- ✅ Codificação correta da URL com `encodeURIComponent`
- ✅ Validação de resposta (verifica se é array)
- ✅ Limpeza de estado de erro quando bem-sucedido

**Código:**
```typescript
const fetchNotes = useCallback(async (subMarkerId: string | null) => {
  setNotes([]);
  setError(null);
  
  if (!subMarkerId) {
    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    const headers = getAuthHeaders();
    const url = `/api/notes?sub_marker_id=${encodeURIComponent(subMarkerId)}`;
    
    console.log('useNotes.fetchNotes - URL:', url);
    console.log('useNotes.fetchNotes - Headers:', headers);

    const response = await fetch(url, {
      headers,
      method: 'GET',
    });

    if (!response.ok) {
      // Tratamento detalhado de erro
      let errorMessage = `Erro ao buscar notas (${response.status})`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        const text = await response.text().catch(() => 'Erro desconhecido');
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const notesArray = Array.isArray(data) ? data : [];
    setNotes(notesArray);
    setError(null);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('useNotes.fetchNotes - Error:', err);
    setError(errorMessage);
    setNotes([]);
  } finally {
    setLoading(false);
  }
}, []);
```

### 2. API Route `/api/notes` - Validações e Logs

**Melhorias:**
- ✅ Validação de `sub_marker_id` (não vazio)
- ✅ Validação de formato UUID
- ✅ Logs detalhados em cada etapa
- ✅ Headers de resposta explícitos
- ✅ Tratamento de erro melhorado

**Código:**
```typescript
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const subMarkerId = searchParams.get('sub_marker_id');

    // Validações
    if (!subMarkerId || subMarkerId.trim() === '') {
      return NextResponse.json(
        { error: 'sub_marker_id é obrigatório' },
        { status: 400 }
      );
    }

    // Validar formato UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(subMarkerId)) {
      return NextResponse.json(
        { error: 'sub_marker_id inválido' },
        { status: 400 }
      );
    }

    const notes = await NoteService.getBySubMarker(subMarkerId, user.id);
    
    return NextResponse.json(notes, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('GET /api/notes - Error:', error);
    return handleApiError(error);
  }
}
```

### 3. Componente Dashboard - Exibição de Erro

**Melhorias:**
- ✅ Exibição clara de erros com mensagem específica
- ✅ Botão "Tentar novamente" para retry
- ✅ Estado de erro visível para o usuário

## 🔍 Como Debugar em Produção

### 1. Verificar Console do Navegador

Abra o console (F12) e procure por:
- `useNotes.fetchNotes - URL:`
- `useNotes.fetchNotes - Response status:`
- `useNotes.fetchNotes - Error:`

### 2. Verificar Logs da Vercel

Na Vercel, vá em **Deployments** > **Logs** e procure por:
- `GET /api/notes - sub_marker_id:`
- `GET /api/notes - Error:`
- `NoteService.getBySubMarker - Found`

### 3. Verificar Autenticação

Certifique-se de que:
- O token JWT está sendo enviado no header `Authorization`
- O token não expirou
- O usuário está autenticado

### 4. Verificar Banco de Dados

Verifique se:
- O `sub_marker_id` existe no banco
- O `sub_marker_id` pertence ao usuário autenticado
- Há notas vinculadas ao sub-marcador

## 🚀 Próximos Passos

1. **Fazer commit das alterações:**
```bash
git add .
git commit -m "Corrigir erro ao buscar notas em produção com logs e validações"
git push
```

2. **Verificar logs após deploy:**
   - Acesse a aplicação em produção
   - Clique em um sub-marcador
   - Verifique os logs no console do navegador
   - Verifique os logs na Vercel

3. **Testar cenários:**
   - Sub-marcador com notas
   - Sub-marcador sem notas
   - Sub-marcador inválido
   - Erro de autenticação

## 📝 Notas Importantes

- Os logs foram adicionados para facilitar o debug em produção
- O tratamento de erro agora é mais robusto e informativo
- A validação de UUID garante que apenas IDs válidos sejam processados
- A codificação da URL previne problemas com caracteres especiais

## 🆘 Se o Problema Persistir

1. Verifique os logs no console do navegador
2. Verifique os logs na Vercel
3. Verifique se o token JWT está válido
4. Verifique se o `sub_marker_id` existe no banco de dados
5. Verifique se há problemas de CORS ou rede

