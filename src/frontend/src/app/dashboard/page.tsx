'use client';

import { useState, useEffect } from 'react';
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
import { 
  FolderPlus, 
  FolderOpen, 
  FileText, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';

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

  const { markers, loading: markersLoading, fetchMarkers } = useMarkers();
  const {
    subMarkers,
    loading: subMarkersLoading,
    fetchSubMarkers,
    deleteSubMarker,
  } = useSubMarkers();
  const { notes, loading: notesLoading, error: notesError, fetchNotes } = useNotes();

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
    } else {
      // Limpar notas quando nenhum sub-marcador está selecionado
      fetchNotes(null);
    }
  };

  // Garantir que as notas sejam buscadas quando o sub-marcador mudar
  useEffect(() => {
    if (selectedSubMarkerId) {
      fetchNotes(selectedSubMarkerId);
    }
  }, [selectedSubMarkerId, fetchNotes]);

  // Verificar se é primeiro acesso
  const isFirstAccess = markers.length === 0;

  // Encontrar nomes para breadcrumb
  const selectedMarker = markers.find(m => m.id === selectedMarkerId);
  const selectedSubMarker = subMarkers.find(sm => sm.id === selectedSubMarkerId);

  if (isFirstAccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center space-y-8 animate-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Bem-vindo ao Sistema de Notas!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Organize suas ideias de forma hierárquica e intuitiva. Comece criando seu primeiro marcador.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsCreateMarkerOpen(true)}
            className="mt-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FolderPlus className="w-5 h-5 mr-2" />
            Criar Primeiro Marcador
          </Button>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary-600" />
                Como funciona
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Crie <strong>Marcadores</strong> para categorias principais, depois adicione <strong>Sub-marcadores</strong> para organização detalhada e, por fim, suas <strong>Notas</strong> com conteúdo rico.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Exemplos de Marcadores</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary-500" />
                  Trabalho
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary-500" />
                  Estudos
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary-500" />
                  Pessoal
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary-500" />
                  Projetos
                </li>
              </ul>
            </div>
          </div>
        </div>

        <CreateMarkerModal
          isOpen={isCreateMarkerOpen}
          onClose={() => setIsCreateMarkerOpen(false)}
          onSuccess={() => {
            setIsCreateMarkerOpen(false);
            fetchMarkers();
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        {(selectedMarker || selectedSubMarker) && (
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 animate-in">
            <span className="text-gray-400">Dashboard</span>
            {selectedMarker && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 font-medium">{selectedMarker.name}</span>
              </>
            )}
            {selectedSubMarker && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 font-medium">{selectedSubMarker.name}</span>
              </>
            )}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organize suas Notas</h1>
          <p className="text-gray-600">Gerencie seus marcadores, sub-marcadores e notas de forma hierárquica</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Marcadores */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-white">Marcadores</h2>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsCreateMarkerOpen(true)}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                >
                  <FolderPlus className="w-4 h-4 mr-1" />
                  Novo
                </Button>
              </div>
            </div>
            <div className="p-4">
              {markersLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-14 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg animate-pulse"
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
          </div>

          {/* Coluna 2: Sub-marcadores */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className={`p-4 transition-all duration-300 ${
              selectedMarkerId 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                : 'bg-gradient-to-r from-gray-200 to-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg backdrop-blur-sm ${
                    selectedMarkerId ? 'bg-white/20' : 'bg-gray-400/20'
                  }`}>
                    <FolderOpen className={`w-5 h-5 ${
                      selectedMarkerId ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  <h2 className={`text-lg font-bold ${
                    selectedMarkerId ? 'text-white' : 'text-gray-600'
                  }`}>
                    Sub-marcadores
                  </h2>
                </div>
                {selectedMarkerId && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsCreateSubMarkerOpen(true)}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  >
                    <FolderPlus className="w-4 h-4 mr-1" />
                    Novo
                  </Button>
                )}
              </div>
            </div>
            <div className="p-4 min-h-[400px]">
              {!selectedMarkerId ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <FolderOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium mb-1">Selecione um marcador</p>
                  <p className="text-gray-400 text-sm">Escolha um marcador à esquerda para ver os sub-marcadores</p>
                </div>
              ) : subMarkersLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-14 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg animate-pulse"
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
                    if (selectedMarkerId) {
                      await fetchSubMarkers(selectedMarkerId);
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Coluna 3: Notas */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className={`p-4 transition-all duration-300 ${
              selectedSubMarkerId 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                : 'bg-gradient-to-r from-gray-200 to-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg backdrop-blur-sm ${
                    selectedSubMarkerId ? 'bg-white/20' : 'bg-gray-400/20'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      selectedSubMarkerId ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  <h2 className={`text-lg font-bold ${
                    selectedSubMarkerId ? 'text-white' : 'text-gray-600'
                  }`}>
                    Notas
                  </h2>
                </div>
                {selectedSubMarkerId && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsCreateNoteOpen(true)}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Nova
                  </Button>
                )}
              </div>
            </div>
            <div className="p-4 min-h-[400px]">
              {!selectedSubMarkerId ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium mb-1">Selecione um sub-marcador</p>
                  <p className="text-gray-400 text-sm">Escolha um sub-marcador ao centro para ver as notas</p>
                </div>
              ) : notesLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : notesError ? (
                <div className="text-center py-12">
                  <p className="text-red-500 text-sm mb-2">Erro ao carregar notas</p>
                  <p className="text-gray-500 text-xs">{notesError}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => selectedSubMarkerId && fetchNotes(selectedSubMarkerId)}
                    className="mt-4"
                  >
                    Tentar novamente
                  </Button>
                </div>
              ) : (
                <NoteList notes={notes} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modais */}
      <CreateMarkerModal
        isOpen={isCreateMarkerOpen}
        onClose={() => setIsCreateMarkerOpen(false)}
        onSuccess={() => {
          setIsCreateMarkerOpen(false);
          fetchMarkers();
        }}
      />

      {selectedMarkerId && (
        <CreateSubMarkerModal
          isOpen={isCreateSubMarkerOpen}
          onClose={() => setIsCreateSubMarkerOpen(false)}
          onSuccess={() => {
            setIsCreateSubMarkerOpen(false);
            fetchSubMarkers(selectedMarkerId);
          }}
          markerId={selectedMarkerId}
        />
      )}

      {selectedSubMarkerId && (
        <CreateNoteModal
          isOpen={isCreateNoteOpen}
          onClose={() => setIsCreateNoteOpen(false)}
          onSuccess={() => {
            setIsCreateNoteOpen(false);
            fetchNotes(selectedSubMarkerId);
          }}
          subMarkerId={selectedSubMarkerId}
        />
      )}
    </div>
  );
}

