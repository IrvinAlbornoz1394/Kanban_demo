import type { RootState } from './store';

const STORAGE_KEY = 'kanban_state';

export function loadState(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;

    return JSON.parse(serializedState) as RootState;
  } catch {
    return undefined;
  }
}

export function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch {
    // ignore write errors
  }
}
