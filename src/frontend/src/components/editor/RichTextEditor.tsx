'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Heading1, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Digite seu texto aqui...',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Verificar se há conteúdo de texto real
      const textContent = editor.getText().trim();
      // Sempre enviar o HTML, mesmo que vazio (será validado no backend)
      onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4',
        'data-placeholder': placeholder,
      },
    },
  });

  // Atualizar conteúdo quando mudar externamente (reset do formulário)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '<p></p>');
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-md min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const addLink = () => {
    const url = window.prompt('Digite a URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden relative">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2 flex-wrap">
        <Button
          type="button"
          variant={editor.isActive('bold') ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('italic') ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Button>

        <div className="w-px bg-gray-300 mx-1" />

        <Button
          type="button"
          variant={editor.isActive('heading', { level: 1 }) ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('bulletList') ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('orderedList') ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <div className="w-px bg-gray-300 mx-1" />

        <Button
          type="button"
          variant={editor.isActive('link') ? 'primary' : 'secondary'}
          size="sm"
          onClick={addLink}
        >
          <Link2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <EditorContent
          editor={editor}
          className="min-h-[300px] max-h-[500px] overflow-y-auto"
        />
        {!editor.getText().trim() && (
          <div className="absolute top-4 left-4 pointer-events-none text-gray-400 text-sm">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
