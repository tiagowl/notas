'use client';

import { Marker } from '@/types/marker';
import { Card } from '@/components/ui/Card';
import { Folder } from 'lucide-react';

interface MarkerListProps {
  markers: Marker[];
  selectedMarkerId: string | null;
  onSelect: (markerId: string | null) => void;
}

export function MarkerList({
  markers,
  selectedMarkerId,
  onSelect,
}: MarkerListProps) {
  if (markers.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-8">
        Nenhum marcador criado ainda
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {markers.map((marker) => (
        <Card
          key={marker.id}
          interactive
          onClick={() =>
            onSelect(selectedMarkerId === marker.id ? null : marker.id)
          }
          className={`p-3 ${
            selectedMarkerId === marker.id
              ? 'bg-primary-50 border-2 border-primary-500'
              : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary-500" />
            <span className="font-medium text-gray-900">{marker.name}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}


