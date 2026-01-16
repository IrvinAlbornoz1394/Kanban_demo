import { configureStore } from '@reduxjs/toolkit';
import boardSlice from '../features/boards/boardsSlice';
import columnsSlice from '../features/columns/columnsSlice';
import tasksSlice from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    boards: boardSlice,
    columns: columnsSlice,
    tasks: tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
