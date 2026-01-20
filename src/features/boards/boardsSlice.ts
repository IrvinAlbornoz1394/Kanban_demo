import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { Board, ID } from '../../types/kanban';


const boardsSlice = createSlice({
  name: 'boards',
  initialState: [] as Board[],
  reducers: {
    boardCreated: {
      reducer(state, action: PayloadAction<Board>) {
        state.push(action.payload);
      },
      prepare(workspaceId: ID, name: string) {
        return {
          payload: {
            id: nanoid(),
            workspaceId,
            name,
            columnIds: [],
          },
        };
      },
    },
    boardColumnsAssigned(
      state,
      action: PayloadAction<{ boardId: ID; columnIds: ID[] }>
    ) {
      const board = state.find(b => b.id === action.payload.boardId);
      if (board) {
        board.columnIds = action.payload.columnIds;
      }
    },
    addColumnToBoard(
      state,
      action: PayloadAction<{
        boardId: ID;
        columnId: ID;
      }>
    ) {
      const board = state.find(
        (b) => b.id === action.payload.boardId
      );
      if (!board) return;

      board.columnIds.push(action.payload.columnId);
    },
    reorderColumns(
      state,
      action: PayloadAction<{
        boardId: ID;
        activeId: ID;
        overId: ID;
      }>
    ) {
      const board = state.find(
        (b) => b.id === action.payload.boardId
      );
      if (!board) return;

      const { activeId, overId } = action.payload;

      const oldIndex = board.columnIds.indexOf(activeId);
      const newIndex = board.columnIds.indexOf(overId);

      if (oldIndex === -1 || newIndex === -1) return;

      const [moved] = board.columnIds.splice(oldIndex, 1);
      board.columnIds.splice(newIndex, 0, moved);
    }
  },
});

export const { boardCreated, boardColumnsAssigned, addColumnToBoard, reorderColumns } = boardsSlice.actions;
export default boardsSlice.reducer;
