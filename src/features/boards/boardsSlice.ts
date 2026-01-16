import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Board, ID } from '../../types/kanban';

interface BoardsState {
  entities: Record<ID, Board>;
  ids: ID[];
}

const initialState: BoardsState = {
  entities: {},
  ids: [],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: {
      prepare(name: string) {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();

        return {
          payload: {
            id,
            name,
            columnIds: [],
            createdAt: now,
          } as Board,
        };
      },
      reducer(state, action: PayloadAction<Board>) {
        state.entities[action.payload.id] = action.payload;
        state.ids.push(action.payload.id);
      },
    },
  },
});

export const { addBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
