'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMarkerSchema, CreateMarkerInput } from '@/lib/validators/marker.validator';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useMarkers } from '@/hooks/useMarkers';
import { Toast } from '@/components/ui/Toast';

interface CreateMarkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateMarkerModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateMarkerModalProps) {
  const { createMarker, fetchMarkers } = useMarkers();
  const [isLoading, setIsLoading] = useState(false);
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
  } = useForm<CreateMarkerInput>({
    resolver: zodResolver(createMarkerSchema),
  });

  const onSubmit = async (data: CreateMarkerInput) => {
    setIsLoading(true);
    try {
      await createMarker(data);
      await fetchMarkers();
      reset();
      onSuccess();
      setToast({
        message: 'Marcador criado com sucesso!',
        type: 'success',
        isVisible: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao criar marcador';
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
        title="Criar Novo Marcador"
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nome do Marcador"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Ex: Trabalho, Estudos, Pessoal"
            helperText="💡 Exemplos: Trabalho, Estudos, Pessoal, Projetos"
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Criar
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


