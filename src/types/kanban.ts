export type ID = string;

export interface Board {
  id: ID;
  name: string;
  columnIds: ID[];
  createdAt: string;
}

export interface Column {
  id: ID;
  boardId: ID;
  title: string;
  taskIds: ID[];
}

export interface Task {
  id: ID;
  columnId: ID;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
