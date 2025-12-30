'use client';

import { Marker } from '@/types/marker';
import { Folder, Check } from 'lucide-react';

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
      <div className="text-center py-12">
        <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-3">
          <Folder className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">Nenhum marcador criado ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {markers.map((marker) => {
        const isSelected = selectedMarkerId === marker.id;
        return (
          <button
            key={marker.id}
            onClick={() => onSelect(isSelected ? null : marker.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 group ${
              isSelected
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-600 text-white shadow-lg transform scale-[1.02]'
                : 'bg-white border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  isSelected 
                    ? 'bg-white/20' 
                    : 'bg-primary-100 group-hover:bg-primary-200'
                }`}>
                  <Folder className={`w-5 h-5 ${
                    isSelected ? 'text-white' : 'text-primary-600'
                  }`} />
                </div>
                <span className={`font-semibold truncate ${
                  isSelected ? 'text-white' : 'text-gray-900'
                }`}>
                  {marker.name}
                </span>
              </div>
              {isSelected && (
                <div className="flex-shrink-0 ml-2">
                  <div className="p-1 bg-white/20 rounded-full">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}


