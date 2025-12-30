import { useState, useCallback } from 'react';
import { SubMarker } from '@/types/sub-marker';
import {
  CreateSubMarkerInput,
  UpdateSubMarkerInput,
} from '@/types/sub-marker';

interface UseSubMarkersReturn {
  subMarkers: SubMarker[];
  loading: boolean;
  error: string | null;
  fetchSubMarkers: (markerId: string) => Promise<void>;
  createSubMarker: (input: CreateSubMarkerInput) => Promise<SubMarker>;
  updateSubMarker: (
    id: string,
    input: UpdateSubMarkerInput
  ) => Promise<SubMarker>;
  deleteSubMarker: (id: string) => Promise<void>;
}

export function useSubMarkers(): UseSubMarkersReturn {
  const [subMarkers, setSubMarkers] = useState<SubMarker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchSubMarkers = useCallback(async (markerId: string) => {
    if (!markerId) {
      setSubMarkers([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `/api/sub-markers?marker_id=${markerId}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar sub-marcadores');
      }

      const data = await response.json();
      setSubMarkers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSubMarker = useCallback(
    async (input: CreateSubMarkerInput) => {
      const response = await fetch('/api/sub-markers', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao criar sub-marcador');
      }

      const newSubMarker = await response.json();
      setSubMarkers((prev) => [newSubMarker, ...prev]);
      return newSubMarker;
    },
    []
  );

  const updateSubMarker = useCallback(
    async (id: string, input: UpdateSubMarkerInput) => {
      const response = await fetch(`/api/sub-markers/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar sub-marcador');
      }

      const updatedSubMarker = await response.json();
      setSubMarkers((prev) =>
        prev.map((sm) => (sm.id === id ? updatedSubMarker : sm))
      );
      return updatedSubMarker;
    },
    []
  );

  const deleteSubMarker = useCallback(async (id: string) => {
    const response = await fetch(`/api/sub-markers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao excluir sub-marcador');
    }

    setSubMarkers((prev) => prev.filter((sm) => sm.id !== id));
  }, []);

  return {
    subMarkers,
    loading,
    error,
    fetchSubMarkers,
    createSubMarker,
    updateSubMarker,
    deleteSubMarker,
  };
}



