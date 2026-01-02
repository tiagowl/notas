export interface Note {
  id: string;
  sub_marker_id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  sub_marker_id: string;
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
}





