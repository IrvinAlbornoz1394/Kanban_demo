import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { Workspace } from '../../types/kanban';

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState: [] as Workspace[],
  reducers: {
    workspaceCreated: {
      reducer(state, action: PayloadAction<Workspace>) {
        state.push(action.payload);
      },
      prepare(name: string) {
        return {
          payload: {
            id: nanoid(),
            name,
            boardIds: [],
          },
        };
      },
    },
    boardAddedToWorkspace(
      state,
      action: PayloadAction<{ workspaceId: string; boardId: string }>
    ) {
      const ws = state.find(w => w.id === action.payload.workspaceId);
      if (ws) {
        ws.boardIds.push(action.payload.boardId);
      }
    },
    removeWorkspace(
      state,
      action: PayloadAction<{ workspaceId: string }>
    ) {
      return state.filter(ws => ws.id !== action.payload.workspaceId);
    },
  },
});

export const {
  workspaceCreated,
  boardAddedToWorkspace,
  removeWorkspace,
} = workspacesSlice.actions;

export default workspacesSlice.reducer;
