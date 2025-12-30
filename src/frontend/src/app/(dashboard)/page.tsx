'use client';

import { useState } from 'react';
import { useMarkers } from '@/hooks/useMarkers';
import { useSubMarkers } from '@/hooks/useSubMarkers';
import { useNotes } from '@/hooks/useNotes';
import { MarkerList } from '@/components/markers/MarkerList';
import { SubMarkerList } from '@/components/sub-markers/SubMarkerList';
import { NoteList } from '@/components/notes/NoteList';
import { CreateMarkerModal } from '@/components/markers/CreateMarkerModal';
import { CreateSubMarkerModal } from '@/components/sub-markers/CreateSubMarkerModal';
import { CreateNoteModal } from '@/components/notes/CreateNoteModal';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(
    null
  );
  const [selectedSubMarkerId, setSelectedSubMarkerId] = useState<string | null>(
    null
  );
  const [isCreateMarkerOpen, setIsCreateMarkerOpen] = useState(false);
  const [isCreateSubMarkerOpen, setIsCreateSubMarkerOpen] = useState(false);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);

  const { markers, loading: markersLoading } = useMarkers();
  const {
    subMarkers,
    loading: subMarkersLoading,
    fetchSubMarkers,
    deleteSubMarker,
  } = useSubMarkers();
  const { notes, loading: notesLoading, fetchNotes } = useNotes();

  // Buscar sub-marcadores quando marcador é selecionado
  const handleMarkerSelect = (markerId: string | null) => {
    setSelectedMarkerId(markerId);
    setSelectedSubMarkerId(null);
    if (markerId) {
      fetchSubMarkers(markerId);
    }
  };

  // Buscar notas quando sub-marcador é selecionado
  const handleSubMarkerSelect = (subMarkerId: string | null) => {
    setSelectedSubMarkerId(subMarkerId);
    if (subMarkerId) {
      fetchNotes(subMarkerId);
    }
  };

  // Verificar se é primeiro acesso
  const isFirstAccess = markers.length === 0;

  if (isFirstAccess) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            👋 Bem-vindo ao Sistema de Notas!
          </h1>
          <p className="text-lg text-gray-600">
            Vamos começar criando sua primeira estrutura de organização.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsCreateMarkerOpen(true)}
          >
            + Criar Primeiro Marcador
          </Button>
          <div className="mt-8 text-left bg-white p-6 rounded-lg shadow-base">
            <h2 className="font-semibold text-gray-900 mb-4">💡 Dica:</h2>
            <p className="text-gray-600 mb-4">
              Crie marcadores para organizar suas notas por tema.
            </p>
            <p className="text-gray-700 font-medium mb-2">Exemplos:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Trabalho</li>
              <li>Estudos</li>
              <li>Pessoal</li>
              <li>Projetos</li>
            </ul>
          </div>
        </div>

        <CreateMarkerModal
          isOpen={isCreateMarkerOpen}
          onClose={() => setIsCreateMarkerOpen(false)}
          onSuccess={() => {
            setIsCreateMarkerOpen(false);
            // Recarregar marcadores será feito automaticamente pelo hook
          }}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Coluna 1: Marcadores */}
      <div className="bg-white rounded-lg shadow-base p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Marcadores</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsCreateMarkerOpen(true)}
          >
            + Novo
          </Button>
        </div>
        {markersLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <MarkerList
            markers={markers}
            selectedMarkerId={selectedMarkerId}
            onSelect={handleMarkerSelect}
          />
        )}
      </div>

      {/* Coluna 2: Sub-marcadores */}
      <div className="bg-white rounded-lg shadow-base p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Sub-marcadores
          </h2>
          {selectedMarkerId && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsCreateSubMarkerOpen(true)}
            >
              + Novo
            </Button>
          )}
        </div>
        {!selectedMarkerId ? (
          <p className="text-gray-500 text-sm text-center py-8">
            Selecione um marcador para ver os sub-marcadores
          </p>
        ) : subMarkersLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <SubMarkerList
            subMarkers={subMarkers}
            selectedSubMarkerId={selectedSubMarkerId}
            onSelect={handleSubMarkerSelect}
            onDelete={async (subMarkerId) => {
              await deleteSubMarker(subMarkerId);
              // Recarregar a lista de sub-marcadores após exclusão
              if (selectedMarkerId) {
                await fetchSubMarkers(selectedMarkerId);
              }
            }}
          />
        )}
      </div>

      {/* Coluna 3: Notas */}
      <div className="bg-white rounded-lg shadow-base p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Notas</h2>
          {selectedSubMarkerId && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsCreateNoteOpen(true)}
            >
              + Nova Nota
            </Button>
          )}
        </div>
        {!selectedSubMarkerId ? (
          <p className="text-gray-500 text-sm text-center py-8">
            Selecione um sub-marcador para ver as notas
          </p>
        ) : notesLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>

      {/* Modais */}
      <CreateMarkerModal
        isOpen={isCreateMarkerOpen}
        onClose={() => setIsCreateMarkerOpen(false)}
        onSuccess={() => setIsCreateMarkerOpen(false)}
      />

      <CreateSubMarkerModal
        isOpen={isCreateSubMarkerOpen}
        onClose={() => setIsCreateSubMarkerOpen(false)}
        onSuccess={() => setIsCreateSubMarkerOpen(false)}
        markerId={selectedMarkerId!}
      />

      <CreateNoteModal
        isOpen={isCreateNoteOpen}
        onClose={() => setIsCreateNoteOpen(false)}
        onSuccess={() => setIsCreateNoteOpen(false)}
        subMarkerId={selectedSubMarkerId!}
      />
    </div>
  );
}

