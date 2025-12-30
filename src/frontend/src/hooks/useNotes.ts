import { useState, useEffect, useCallback } from 'react';
import { Note } from '@/types/note';
import { CreateNoteInput, UpdateNoteInput } from '@/types/note';

interface UseNotesReturn {
  notes: Note[];
  loading: boolean;
  error: string | null;
  fetchNotes: (subMarkerId: string | null) => Promise<void>;
  createNote: (input: CreateNoteInput) => Promise<Note>;
  updateNote: (id: string, input: UpdateNoteInput) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  getNoteById: (id: string) => Promise<Note>;
}

export function useNotes(): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchNotes = useCallback(async (subMarkerId: string | null) => {
    if (!subMarkerId) {
      setNotes([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `/api/notes?sub_marker_id=${subMarkerId}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar notas');
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (input: CreateNoteInput) => {
    const headers = getAuthHeaders();
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Não autenticado. Faça login novamente.');
    }

    console.log('useNotes.createNote - Input:', JSON.stringify(input, null, 2));

    const response = await fetch('/api/notes', {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    });

    console.log('useNotes.createNote - Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        error: `Erro ao criar nota (${response.status})` 
      }));
      console.error('useNotes.createNote - Error data:', errorData);
      throw new Error(errorData.error || `Erro ao criar nota (${response.status})`);
    }

    const newNote = await response.json();
    console.log('useNotes.createNote - Note created:', newNote.id);
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback(
    async (id: string, input: UpdateNoteInput) => {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar nota');
      }

      const updatedNote = await response.json();
      setNotes((prev) => prev.map((n) => (n.id === id ? updatedNote : n)));
      return updatedNote;
    },
    []
  );

  const deleteNote = useCallback(async (id: string) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao excluir nota');
    }

    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getNoteById = useCallback(async (id: string) => {
    const response = await fetch(`/api/notes/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar nota');
    }

    return await response.json();
  }, []);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
  };
}


