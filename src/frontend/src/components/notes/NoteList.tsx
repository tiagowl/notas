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
      <p className="text-gray-500 text-sm text-center py-8">
        Nenhuma nota criada ainda
      </p>
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
    <div className="space-y-2">
      {notes.map((note) => (
        <Card
          key={note.id}
          interactive
          onClick={() => router.push(`/dashboard/notes/${note.id}`)}
          className="p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate mb-1">
                {note.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(note.created_at)}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}


