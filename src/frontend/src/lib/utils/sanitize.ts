/**
 * Sanitiza conteúdo HTML para prevenir XSS
 * No servidor, usa sanitização básica para evitar problemas com módulos ESM
 * No cliente, usa DOMPurify quando disponível
 */
export async function sanitizeHtml(html: string): Promise<string> {
  // No servidor, sempre usar sanitização básica (evita problemas com módulos ESM)
  if (typeof window === 'undefined') {
    return sanitizeHtmlServer(html);
  }
  
  // No cliente, tentar usar DOMPurify, mas com fallback para sanitização básica
  try {
    // Usar importação dinâmica para evitar problemas de build
    const DOMPurifyModule = await import('isomorphic-dompurify');
    const DOMPurify = DOMPurifyModule.default || DOMPurifyModule;
    
    if (DOMPurify && typeof DOMPurify.sanitize === 'function') {
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3',
          'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
        ALLOW_DATA_ATTR: false,
      });
    }
  } catch (error) {
    // Se houver erro ao carregar DOMPurify, usar sanitização básica
    console.warn('Error loading DOMPurify, using server sanitization:', error);
  }
  
  // Fallback para sanitização básica
  return sanitizeHtmlServer(html);
}

/**
 * Sanitização básica no servidor (sem DOMPurify)
 */
function sanitizeHtmlServer(html: string): string {
  // Lista de tags permitidas
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'];
  const allowedAttrs = ['href', 'target', 'rel'];
  
  // Remover scripts e eventos perigosos
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '');
  
  // Permitir apenas tags permitidas
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  sanitized = sanitized.replace(tagRegex, (match, tagName) => {
    const lowerTag = tagName.toLowerCase();
    if (!allowedTags.includes(lowerTag)) {
      return '';
    }
    
    // Remover atributos não permitidos
    let cleanMatch = match;
    const attrRegex = /(\w+)\s*=\s*["']([^"']*)["']/gi;
    cleanMatch = cleanMatch.replace(attrRegex, (attrMatch, attrName, attrValue) => {
      const lowerAttr = attrName.toLowerCase();
      if (allowedAttrs.includes(lowerAttr)) {
        // Validar href para links
        if (lowerAttr === 'href' && !attrValue.startsWith('http://') && !attrValue.startsWith('https://') && !attrValue.startsWith('/') && !attrValue.startsWith('#')) {
          return '';
        }
        return attrMatch;
      }
      return '';
    });
    
    return cleanMatch;
  });
  
  return sanitized;
}

/**
 * Sanitiza texto simples removendo HTML
 */
export function sanitizeText(text: string): string {
  // Remover todas as tags HTML e entidades
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, '')
    .trim();
}





