'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateNoteSchema, UpdateNoteInput } from '@/lib/validators/note.validator';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/types/note';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Toast } from '@/components/ui/Toast';

export default function EditNotePage() {
  const params = useParams();
  const router = useRouter();
  const { getNoteById, updateNote } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateNoteInput>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await getNoteById(params.id as string);
        setNote(noteData);
        setValue('title', noteData.title);
        setValue('content', noteData.content);
        setContent(noteData.content || '<p></p>');
      } catch (error) {
        setToast({
          message:
            error instanceof Error ? error.message : 'Erro ao carregar nota',
          type: 'error',
          isVisible: true,
        });
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNote();
    }
  }, [params.id, getNoteById, router, setValue]);

  // Sincronizar content do editor com o formulário
  useEffect(() => {
    if (content) {
      setValue('content', content, { shouldValidate: true });
    }
  }, [content, setValue]);

  const onSubmit = async (data: UpdateNoteInput) => {
    if (!note) return;

    setIsSaving(true);
    try {
      await updateNote(note.id, {
        title: data.title,
        content: data.content.trim(),
      });
      setToast({
        message: 'Nota atualizada com sucesso!',
        type: 'success',
        isVisible: true,
      });
      // Redirecionar para a página de detalhes após salvar
      setTimeout(() => {
        router.push(`/dashboard/notes/${note.id}`);
      }, 1000);
    } catch (error) {
      console.error('Error updating note:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao atualizar nota';
      setToast({
        message: errorMessage,
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nota não encontrada</p>
        <Button
          variant="secondary"
          onClick={() => router.push('/dashboard')}
          className="mt-4"
        >
          Voltar ao Dashboard
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => router.push(`/dashboard/notes/${note.id}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push(`/dashboard/notes/${note.id}`)}
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>

        {/* Edit Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                label="Título da Nota"
                {...register('title')}
                error={errors.title?.message}
                placeholder="Ex: Reunião de Planejamento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo
              </label>
              <RichTextEditor
                content={content}
                onChange={(newContent) => {
                  setContent(newContent);
                  setValue('content', newContent, { shouldValidate: true });
                }}
                placeholder="Digite o conteúdo da sua nota aqui..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-error">
                  {errors.content.message as string}
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push(`/dashboard/notes/${note.id}`)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit" variant="primary" isLoading={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}

