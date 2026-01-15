import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // aquí irán los slices
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
