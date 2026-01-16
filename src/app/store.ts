import { configureStore } from '@reduxjs/toolkit';
import boardSlice from '../features/boards/boardsSlice';

export const store = configureStore({
  reducer: {
    boards: boardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
