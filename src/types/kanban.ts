export type ID = string;

export interface Workspace {
  id: string;
  name: string;
  boardIds: string[];
}

export interface Board {
  id: ID;
  workspaceId: ID;
  name: string;
  columnIds: ID[];
}

export interface Column {
  id: ID;
  boardId: ID;
  title: string;
  taskIds: ID[];
  isDefault: boolean;
}

export interface Task {
  id: ID;
  columnId: ID;
  title: string;
  description?: string;
  archived: boolean; 
}

