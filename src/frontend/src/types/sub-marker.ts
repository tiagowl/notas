export interface SubMarker {
  id: string;
  marker_id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateSubMarkerInput {
  name: string;
  marker_id: string;
}

export interface UpdateSubMarkerInput {
  name: string;
}


