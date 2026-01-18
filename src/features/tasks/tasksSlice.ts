import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, ID } from '../../types/kanban';

interface TasksState {
  entities: Record<ID, Task>;
  ids: ID[];
}

const initialState: TasksState = {
  entities: {},
  ids: [],
};

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
  },
});

export const {
  addTask,
  archiveTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
