import { useState, useEffect, useCallback } from 'react';
import { Marker } from '@/types/marker';
import { CreateMarkerInput, UpdateMarkerInput } from '@/types/marker';

interface UseMarkersReturn {
  markers: Marker[];
  loading: boolean;
  error: string | null;
  fetchMarkers: () => Promise<void>;
  createMarker: (input: CreateMarkerInput) => Promise<Marker>;
  updateMarker: (id: string, input: UpdateMarkerInput) => Promise<Marker>;
  deleteMarker: (id: string) => Promise<void>;
}

export function useMarkers(): UseMarkersReturn {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchMarkers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/markers', {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar marcadores');
      }

      const data = await response.json();
      setMarkers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  const createMarker = useCallback(async (input: CreateMarkerInput) => {
    const headers = getAuthHeaders();
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Não autenticado. Faça login novamente.');
    }

    const response = await fetch('/api/markers', {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        error: `Erro ao criar marcador (${response.status})` 
      }));
      throw new Error(errorData.error || `Erro ao criar marcador (${response.status})`);
    }

    const newMarker = await response.json();
    setMarkers((prev) => [newMarker, ...prev]);
    return newMarker;
  }, []);

  const updateMarker = useCallback(
    async (id: string, input: UpdateMarkerInput) => {
      const response = await fetch(`/api/markers/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar marcador');
      }

      const updatedMarker = await response.json();
      setMarkers((prev) =>
        prev.map((m) => (m.id === id ? updatedMarker : m))
      );
      return updatedMarker;
    },
    []
  );

  const deleteMarker = useCallback(async (id: string) => {
    const response = await fetch(`/api/markers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao excluir marcador');
    }

    setMarkers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  useEffect(() => {
    fetchMarkers();
  }, [fetchMarkers]);

  return {
    markers,
    loading,
    error,
    fetchMarkers,
    createMarker,
    updateMarker,
    deleteMarker,
  };
}


