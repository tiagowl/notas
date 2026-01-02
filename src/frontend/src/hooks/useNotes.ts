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
    if (typeof window === 'undefined') {
      return { 'Content-Type': 'application/json' };
    }
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchNotes = useCallback(async (subMarkerId: string | null) => {
    // Limpar notas imediatamente quando subMarkerId muda
    setNotes([]);
    setError(null);
    
    if (!subMarkerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const headers = getAuthHeaders();
      const url = `/api/notes?sub_marker_id=${encodeURIComponent(subMarkerId)}`;
      
      console.log('useNotes.fetchNotes - URL:', url);
      console.log('useNotes.fetchNotes - Headers:', headers);
      console.log('useNotes.fetchNotes - subMarkerId:', subMarkerId);

      const response = await fetch(url, {
        headers,
        method: 'GET',
      });

      console.log('useNotes.fetchNotes - Response status:', response.status);
      console.log('useNotes.fetchNotes - Response ok:', response.ok);

      if (!response.ok) {
        let errorMessage = `Erro ao buscar notas (${response.status})`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
          console.error('useNotes.fetchNotes - Error data:', errorData);
        } catch (parseError) {
          const text = await response.text().catch(() => 'Erro desconhecido');
          console.error('useNotes.fetchNotes - Error text:', text);
          errorMessage = text || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('useNotes.fetchNotes - Data received:', data);
      console.log('useNotes.fetchNotes - Data is array:', Array.isArray(data));
      console.log('useNotes.fetchNotes - Data length:', Array.isArray(data) ? data.length : 'N/A');
      
      // Verificar se ainda é o mesmo subMarkerId antes de atualizar
      const notesArray = Array.isArray(data) ? data : [];
      setNotes(notesArray);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao buscar notas';
      console.error('useNotes.fetchNotes - Error:', err);
      console.error('useNotes.fetchNotes - Error message:', errorMessage);
      setError(errorMessage);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (input: CreateNoteInput) => {
    if (typeof window === 'undefined') {
      throw new Error('Criação de nota só pode ser executada no cliente');
    }

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


