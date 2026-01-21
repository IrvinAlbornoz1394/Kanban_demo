import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, ID } from '../../types/kanban';
import type { AppDispatch } from '../../app/store';
import { taskAddedToColumn } from '../columns/columnsSlice';

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
      prepare(columnId: ID, title: string) {
        const now = new Date().toISOString();

        return {
          payload: {
            id: crypto.randomUUID(),
            columnId,
            title,
            priority: 'medium',
            archived: false,
            createdAt: now,
            updatedAt: now,
          } as Task,
        };
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

      task.archived = true;
      //task.updatedAt = new Date().toISOString();
    },
    deleteTask(
      state,
      action: PayloadAction<{ taskId: ID }>
    ) {
      const { taskId } = action.payload;

      delete state.entities[taskId];
      state.ids = state.ids.filter((id) => id !== taskId);
    },
    taskColumnChanged(
      state,
      action: PayloadAction<{
        taskId: ID;
        columnId: ID;
      }>
    ) {
      const task = state.entities[action.payload.taskId];
      if (!task) return;

      task.columnId = action.payload.columnId;
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
  (dispatch: AppDispatch) => {
    // 1️⃣ Duplicar task
    const action = duplicateTask(task);
    dispatch(action);

    const newTaskId = action.payload.id;
    const columnId = task.columnId;

    // 2️⃣ Agregar la task duplicada a la MISMA columna
    dispatch(
      taskAddedToColumn({
        columnId,
        taskId: newTaskId,
      })
    );
  };