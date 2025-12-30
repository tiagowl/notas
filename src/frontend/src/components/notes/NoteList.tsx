'use client';

import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import { Card } from '@/components/ui/Card';
import { FileText, Calendar } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  const router = useRouter();

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-3 bg-emerald-100 rounded-full w-fit mx-auto mb-3">
          <FileText className="w-6 h-6 text-emerald-400" />
        </div>
        <p className="text-gray-500 text-sm">Nenhuma nota criada ainda</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <button
          key={note.id}
          onClick={() => router.push(`/dashboard/notes/${note.id}`)}
          className="w-full text-left p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-100 group-hover:bg-emerald-200 rounded-lg flex-shrink-0 transition-colors">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate mb-2 group-hover:text-emerald-700 transition-colors">
                {note.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(note.created_at)}</span>
              </div>
            </div>
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1 bg-emerald-100 rounded-full">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}


