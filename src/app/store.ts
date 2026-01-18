import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardSlice from '../features/boards/boardsSlice';
import columnsSlice from '../features/columns/columnsSlice';
import tasksSlice from '../features/tasks/tasksSlice';
import uiSlice from '../features/ui/uiSlice';
import workspacesSlice from '../features/workspaces/workspacesSlice';

import { loadState, saveState } from './localStorage';

const rootReducer = combineReducers({
  boards: boardSlice,
  columns: columnsSlice,
  tasks: tasksSlice,
  workspaces: workspacesSlice,
  ui: uiSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: RootState | undefined = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Guardar en localStorage cada cambio
store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
