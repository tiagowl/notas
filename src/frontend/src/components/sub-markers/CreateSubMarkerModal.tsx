'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSubMarkerSchema, CreateSubMarkerInput } from '@/lib/validators/sub-marker.validator';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useSubMarkers } from '@/hooks/useSubMarkers';
import { Toast } from '@/components/ui/Toast';

interface CreateSubMarkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  markerId: string;
}

export function CreateSubMarkerModal({
  isOpen,
  onClose,
  onSuccess,
  markerId,
}: CreateSubMarkerModalProps) {
  const { createSubMarker, fetchSubMarkers } = useSubMarkers();
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
    setValue,
  } = useForm<CreateSubMarkerInput>({
    resolver: zodResolver(createSubMarkerSchema),
    defaultValues: {
      marker_id: markerId,
    },
  });

  // Atualizar marker_id quando markerId mudar ou modal abrir
  useEffect(() => {
    if (isOpen && markerId) {
      setValue('marker_id', markerId);
      reset({
        marker_id: markerId,
        name: '',
      });
    }
  }, [isOpen, markerId, setValue, reset]);

  const onSubmit = async (data: CreateSubMarkerInput) => {
    setIsLoading(true);
    try {
      await createSubMarker(data);
      await fetchSubMarkers(markerId);
      reset();
      onSuccess();
      setToast({
        message: 'Sub-marcador criado com sucesso!',
        type: 'success',
        isVisible: true,
      });
    } catch (error) {
      setToast({
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao criar sub-marcador',
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
        title="Criar Novo Sub-marcador"
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nome do Sub-marcador"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Ex: Projetos 2024, Clientes, etc."
          />

          <input type="hidden" {...register('marker_id')} value={markerId} />

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


