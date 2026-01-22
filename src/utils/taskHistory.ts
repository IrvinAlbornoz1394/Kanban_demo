import type { Task, ID, ColumnHistoryEntry } from '../types/kanban';
import type { Column } from '../types/kanban';

type HistoryAction =
  | { type: 'create', columnId: ID, columnName: string, now: string }
  | { type: 'move', fromColumnId: ID, toColumnId: ID, toColumnName: string, now: string }
  | { type: 'archive', now: string }
  | { type: 'moveOnColumnDelete', fromColumnId: ID, toColumnId: ID, toColumnName: string, now: string };

export function updateTaskColumnHistory(task: Task, action: HistoryAction): Task {
  let history: ColumnHistoryEntry[] = task.columnHistory ? [...task.columnHistory] : [];

  switch (action.type) {
    case 'create': {
      history.push({
        columnId: action.columnId,
        columnName: action.columnName,
        enteredAt: action.now,
      });
      // Si la columna es 'done', marca como completada
      const isDone = action.columnName?.trim().toLowerCase() === 'done';
      return {
        ...task,
        columnId: action.columnId,
        columnHistory: history,
        createdAt: action.now,
        updatedAt: action.now,
        completedAt: isDone ? action.now : task.completedAt,
      };
    }
    case 'move': {
      if (history.length > 0 && !history[history.length - 1].exitedAt) {
        history[history.length - 1].exitedAt = action.now;
      }
      history.push({
        columnId: action.toColumnId,
        columnName: action.toColumnName,
        enteredAt: action.now,
      });
      // Si la columna destino es 'done' y antes no estaba en 'done', marca como completada
      const isDone = action.toColumnName?.trim().toLowerCase() === 'done';
      const wasDone = task.columnName?.trim().toLowerCase() === 'done';
      const shouldSetCompleted = isDone && !wasDone;
      return {
        ...task,
        columnId: action.toColumnId,
        columnName: action.toColumnName,
        columnHistory: history,
        updatedAt: action.now,
        completedAt: shouldSetCompleted ? action.now : task.completedAt,
      };
    }
    case 'archive': {
      if (history.length > 0 && !history[history.length - 1].exitedAt) {
        history[history.length - 1].exitedAt = action.now;
      }
      return {
        ...task,
        archived: true,
        updatedAt: action.now,
        columnHistory: history,
      };
    }
    case 'moveOnColumnDelete': {
      if (history.length > 0 && !history[history.length - 1].exitedAt) {
        history[history.length - 1].exitedAt = action.now;
      }
      history.push({
        columnId: action.toColumnId,
        columnName: action.toColumnName,
        enteredAt: action.now,
      });
      // Si la columna destino es 'done', marca como completada
      const isDone = action.toColumnName?.trim().toLowerCase() === 'done';
      return {
        ...task,
        columnId: action.toColumnId,
        columnName: action.toColumnName,
        columnHistory: history,
        updatedAt: action.now,
        completedAt: isDone ? action.now : task.completedAt,
      };
    }
  }
}

export function moveTasksOnColumnDelete(
  tasks: Task[],
  fromColumn: Column,
  toColumn: Column,
  dispatch: (action: any) => void,
  updateTask: (payload: { task: Task }) => any
) {
  const now = new Date().toISOString();
  tasks.forEach(task => {
    const updatedTask = updateTaskColumnHistory(
      task,
      {
        type: 'moveOnColumnDelete',
        fromColumnId: fromColumn.id,
        toColumnId: toColumn.id,
        toColumnName: toColumn.title,
        now,
      }
    );
    dispatch(updateTask({ task: updatedTask }));
  });
}

export function getTaskCurrentColumn(task: Task): string | null {
  if (task.archived) return null;
  if (task.columnHistory && task.columnHistory.length > 0) {
    // Ordena por fecha de entrada descendente y toma la primera
    const lastEntry = [...task.columnHistory].sort((a, b) => b.enteredAt.localeCompare(a.enteredAt))[0];
    return lastEntry?.columnId || null;
  }
  return task.columnId || null;
}