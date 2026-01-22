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

export interface Tag {
  id: string;
  label: string;
  color: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: ID;
  columnId: ID;
  boardId: ID;
  title: string; // obligatorio, 3-100 caracteres
  description?: string; // opcional, máx 1000 caracteres (markdown)
  priority: TaskPriority;
  dueDate?: string; // ISO string
  tags?: Tag[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  completedAt?: string; // ISO string
  subtasks?: Subtask[];
  estimatedHours?: number;
  archived?: boolean;
  columnHistory?: ColumnHistoryEntry[]; // <--- Nuevo campo
  // ...otras propiedades existentes si aplica...
}

export interface ColumnHistoryEntry {
  columnId: ID;
  columnName?: string; // <--- Nuevo campo opcional
  enteredAt: string; // ISO string
  exitedAt?: string; // ISO string, undefined si sigue en la columna
}

