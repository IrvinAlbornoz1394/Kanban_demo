import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Column, ID } from '../../types/kanban';

interface ColumnsState {
  entities: Record<ID, Column>;
  ids: ID[];
}

const initialState: ColumnsState = {
  entities: {},
  ids: [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn: {
      prepare(boardId: ID, title: string) {
        return {
          payload: {
            id: crypto.randomUUID(),
            boardId,
            title,
            taskIds: [],
          } as Column,
        };
      },
      reducer(state, action: PayloadAction<Column>) {
        state.entities[action.payload.id] = action.payload;
        state.ids.push(action.payload.id);
      },
    },
  },
});

export const { addColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
