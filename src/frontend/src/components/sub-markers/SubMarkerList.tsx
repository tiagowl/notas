'use client';

import { useState } from 'react';
import { SubMarker } from '@/types/sub-marker';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FolderOpen, Trash2 } from 'lucide-react';

interface SubMarkerListProps {
  subMarkers: SubMarker[];
  selectedSubMarkerId: string | null;
  onSelect: (subMarkerId: string | null) => void;
  onDelete: (subMarkerId: string) => Promise<void>;
}

export function SubMarkerList({
  subMarkers,
  selectedSubMarkerId,
  onSelect,
  onDelete,
}: SubMarkerListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, subMarkerId: string) => {
    e.stopPropagation(); // Prevenir que o onClick do Card seja disparado
    
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este sub-marcador? Todas as notas associadas também serão excluídas.'
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(subMarkerId);
      await onDelete(subMarkerId);
      // Se o sub-marcador excluído estava selecionado, deselecionar
      if (selectedSubMarkerId === subMarkerId) {
        onSelect(null);
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Erro ao excluir sub-marcador'
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (subMarkers.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-8">
        Nenhum sub-marcador criado ainda
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {subMarkers.map((subMarker) => (
        <Card
          key={subMarker.id}
          interactive
          onClick={() =>
            onSelect(
              selectedSubMarkerId === subMarker.id ? null : subMarker.id
            )
          }
          className={`p-3 ${
            selectedSubMarkerId === subMarker.id
              ? 'bg-primary-50 border-2 border-primary-500'
              : ''
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FolderOpen className="w-5 h-5 text-primary-400 flex-shrink-0" />
              <span className="font-medium text-gray-900 truncate">
                {subMarker.name}
              </span>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(e) => handleDelete(e, subMarker.id)}
              disabled={deletingId === subMarker.id}
              className="flex-shrink-0"
              title="Excluir sub-marcador"
            >
              {deletingId === subMarker.id ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              ) : (
                <Trash2 className="w-4 h-4 text-error" />
              )}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}


