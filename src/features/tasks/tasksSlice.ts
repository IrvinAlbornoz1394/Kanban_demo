import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, ID } from '../../types/kanban';
import type { AppDispatch } from '../../app/store';
import { taskAddedToColumn } from '../columns/columnsSlice';
import { updateTaskColumnHistory } from '../../utils/taskHistory';

interface TasksState {
  entities: Record<ID, Task>;
  ids: ID[];
}

const initialState: TasksState = {
  entities: {},
  ids: [],
};

interface UpdateTaskPayload {
  task: Task;
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      prepare(columnId: ID, boardId: ID, columnName: string, title: string) {
        const now = new Date().toISOString();
        // Crea la tarea base
        const baseTask: Task = {
          id: crypto.randomUUID(),
          columnId,
          boardId,
          title,
          priority: 'medium',
          archived: false,
          createdAt: now,
          updatedAt: now,
          columnHistory: [],
        };
        // Usa la función utilitaria para inicializar el historial
        const taskWithHistory = updateTaskColumnHistory(
          baseTask,
          { type: 'create', columnId, columnName, now }
        );
        return { payload: taskWithHistory };
      },
      reducer(state, action: PayloadAction<Task>) {
        state.entities[action.payload.id] = action.payload;
        state.ids.push(action.payload.id);
      },
    },
    
    archiveTask(
      state,
      action: PayloadAction<{ taskId: ID }>
    ) {
      const task = state.entities[action.payload.taskId];
      if (!task) return;
      const now = new Date().toISOString();
      const updatedTask = updateTaskColumnHistory(
        task,
        { type: 'archive', now }
      );
      state.entities[task.id] = updatedTask;
    },
    deleteTask(
      state,
      action: PayloadAction<{ taskId: ID }>
    ) {
      const { taskId } = action.payload;

      delete state.entities[taskId];
      state.ids = state.ids.filter((id) => id !== taskId);
    },
    taskColumnChanged:
      (
        state,
        action: PayloadAction<{
          taskId: ID;
          columnId: ID;
          columnName: string;
        }>
      ) => {
        const task = state.entities[action.payload.taskId];
        if (!task) return;
        const now = new Date().toISOString();
        const updatedTask = updateTaskColumnHistory(
          task,
          {
            type: 'move',
            fromColumnId: task.columnId,
            toColumnId: action.payload.columnId,
            toColumnName: action.payload.columnName,
            now,
          }
        );
        state.entities[task.id] = updatedTask;
      },
    updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const updated = action.payload.task;
      if (state.entities[updated.id]) {
        state.entities[updated.id] = {
          ...state.entities[updated.id],
          ...updated,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    duplicateTask: {
      prepare(task: Task) {
        const now = new Date().toISOString();
        return {
          payload: {
            ...task,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
            archived: false,
            columnHistory: [],
          },
        };
      },
      reducer(state, action: PayloadAction<Task>) {
        state.entities[action.payload.id] = action.payload;
        state.ids.push(action.payload.id);
      },
    },
  },
});

export const {
  addTask,
  archiveTask,
  deleteTask,
  taskColumnChanged,
  updateTask,
  duplicateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;

// Thunk para duplicar una tarea y realizar acciones adicionales
export const duplicateTaskAndAddToColumn =
  (task: Task) =>
  (dispatch: AppDispatch, getState: () => any) => {
    // Obtén el nombre de la columna desde el estado
    const state = getState();
    const column = state.columns.entities[task.columnId];
    const columnName = column?.title ?? '';

    //Crea la nueva tarea usando addTask
    const action = addTask(task.columnId, columnName, task.title);
    dispatch(action);

    const newTaskId = action.payload.id;

    //Agrega la tarea duplicada a la columna
    dispatch(
      taskAddedToColumn({
        columnId: task.columnId,
        taskId: newTaskId,
      })
    );
  };