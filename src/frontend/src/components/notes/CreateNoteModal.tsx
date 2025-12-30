'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNoteSchema } from '@/lib/validators/note.validator';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { useNotes } from '@/hooks/useNotes';
import { Toast } from '@/components/ui/Toast';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subMarkerId: string;
}

export function CreateNoteModal({
  isOpen,
  onClose,
  onSuccess,
  subMarkerId,
}: CreateNoteModalProps) {
  const { createNote, fetchNotes } = useNotes();
  const [isLoading, setIsLoading] = useState(false);
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
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: '',
      content: '',
      sub_marker_id: subMarkerId,
    },
  });

  // Resetar formulário quando modal abrir
  useEffect(() => {
    if (isOpen) {
      reset({
        title: '',
        content: '',
        sub_marker_id: subMarkerId,
      });
      setContent('<p></p>');
      setValue('content', '<p></p>', { shouldValidate: false });
    }
  }, [isOpen, reset, subMarkerId, setValue]);

  // Sincronizar content do editor com o formulário
  useEffect(() => {
    if (content) {
      setValue('content', content, { shouldValidate: true });
    }
  }, [content, setValue]);

  const onSubmit = async (data: { title: string; content: string; sub_marker_id: string }) => {
    setIsLoading(true);
    try {
      console.log('Creating note with data:', { title: data.title, content: data.content, sub_marker_id: data.sub_marker_id });
      await createNote({
        title: data.title,
        content: data.content.trim(),
        sub_marker_id: data.sub_marker_id,
      });
      await fetchNotes(subMarkerId);
      reset({
        title: '',
        content: '<p></p>',
        sub_marker_id: subMarkerId,
      });
      setContent('<p></p>');
      onSuccess();
      setToast({
        message: 'Nota criada com sucesso!',
        type: 'success',
        isVisible: true,
      });
    } catch (error) {
      console.error('Error creating note:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao criar nota';
      setToast({
        message: errorMessage,
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Criar Nova Nota"
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Título da Nota"
            {...register('title')}
            error={errors.title?.message}
            placeholder="Ex: Reunião de Planejamento"
          />

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
          
          {/* Campo hidden para sub_marker_id */}
          <input type="hidden" {...register('sub_marker_id')} value={subMarkerId} />

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset({
                  title: '',
                  content: '<p></p>',
                  sub_marker_id: subMarkerId,
                });
                setContent('<p></p>');
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Criar Nota
            </Button>
          </div>
        </form>
      </Modal>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}


