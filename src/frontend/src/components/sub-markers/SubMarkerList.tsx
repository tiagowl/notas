'use client';

import { useState } from 'react';
import { SubMarker } from '@/types/sub-marker';
import { Button } from '@/components/ui/Button';
import { FolderOpen, Trash2, Check } from 'lucide-react';

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
      <div className="text-center py-12">
        <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
          <FolderOpen className="w-6 h-6 text-blue-400" />
        </div>
        <p className="text-gray-500 text-sm">Nenhum sub-marcador criado ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {subMarkers.map((subMarker) => {
        const isSelected = selectedSubMarkerId === subMarker.id;
        return (
          <button
            key={subMarker.id}
            onClick={() =>
              onSelect(isSelected ? null : subMarker.id)
            }
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 group ${
              isSelected
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-600 text-white shadow-lg transform scale-[1.02]'
                : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  isSelected 
                    ? 'bg-white/20' 
                    : 'bg-blue-100 group-hover:bg-blue-200'
                }`}>
                  <FolderOpen className={`w-5 h-5 ${
                    isSelected ? 'text-white' : 'text-blue-600'
                  }`} />
                </div>
                <span className={`font-semibold truncate ${
                  isSelected ? 'text-white' : 'text-gray-900'
                }`}>
                  {subMarker.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isSelected && (
                  <div className="flex-shrink-0">
                    <div className="p-1 bg-white/20 rounded-full">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={(e) => handleDelete(e, subMarker.id)}
                disabled={deletingId === subMarker.id}
                className={`flex-shrink-0 ${
                  isSelected
                    ? 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                    : 'bg-white hover:bg-red-50 border-gray-200'
                }`}
                title="Excluir sub-marcador"
              >
                {deletingId === subMarker.id ? (
                  <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
                    isSelected ? 'border-white' : 'border-gray-600'
                  }`}></div>
                ) : (
                  <Trash2 className={`w-4 h-4 ${
                    isSelected ? 'text-white' : 'text-error'
                  }`} />
                )}
              </Button>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}


