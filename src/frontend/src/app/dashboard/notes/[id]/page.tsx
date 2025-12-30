'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/types/note';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Edit, Trash2, Calendar } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Toast';
import DOMPurify from 'isomorphic-dompurify';

export const dynamic = 'force-dynamic';

export default function NoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getNoteById, deleteNote } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await getNoteById(params.id as string);
        setNote(noteData);
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
  }, [params.id, getNoteById, router]);

  const handleDelete = async () => {
    if (!note) return;

    setIsDeleting(true);
    try {
      await deleteNote(note.id);
      setToast({
        message: 'Nota excluída com sucesso!',
        type: 'success',
        isVisible: true,
      });
      router.push('/dashboard');
    } catch (error) {
      setToast({
        message:
          error instanceof Error ? error.message : 'Erro ao excluir nota',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  // Sanitizar conteúdo HTML
  const sanitizedContent = DOMPurify.sanitize(note.content);

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => router.push(`/dashboard/notes/${note.id}/edit`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>

        {/* Note Content */}
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{note.title}</h1>

          <div className="flex items-center gap-2 text-gray-500 mb-6">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              Criado em: {formatDate(note.created_at)}
            </span>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Tem certeza que deseja excluir esta nota?
          </p>
          <p className="font-semibold text-gray-900">&quot;{note.title}&quot;</p>
          <p className="text-sm text-gray-500">
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Excluir
            </Button>
          </div>
        </div>
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


