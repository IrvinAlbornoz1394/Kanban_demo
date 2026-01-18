import {
  createSlice,
  createEntityAdapter,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Column, ID } from '../../types/kanban';

const columnsAdapter = createEntityAdapter<Column>();

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    columnAdded: {
      reducer: columnsAdapter.addOne,
      prepare(boardId: ID, title: string, isDefault?: boolean) {
        return {
          payload: {
            id: nanoid(),
            boardId,
            title,
            taskIds: [],
            isDefault: isDefault ?? false,
          },
        };
      },
    },
    defaultColumnAdded: {
      reducer: columnsAdapter.addOne,
      prepare(boardId: ID, title: string) {
        return {
          payload: {
            id: nanoid(),
            boardId,
            title,
            taskIds: [],
            isDefault: true,
          },
        };
      },
    },
    columnRemoved(
      state,
      action: PayloadAction<{ columnId: ID }>
    ) {
      const column = state.entities[action.payload.columnId];
      if (!column) return;

      // 🔒 Bloqueo de columnas default
      if (column.isDefault) return;

      columnsAdapter.removeOne(
        state,
        action.payload.columnId
      );
    },
    taskAddedToColumn(
      state,
      action: PayloadAction<{ columnId: ID; taskId: ID }>
    ) {
      const column = state.entities[action.payload.columnId];
      if (!column) return;

      column.taskIds.push(action.payload.taskId);
    },
    removeTaskFromColumn(
      state,
      action: PayloadAction<{ columnId: ID; taskId: ID }>
    ) {
      const column = state.entities[action.payload.columnId];
      if (!column) return;

      column.taskIds = column.taskIds.filter(
        (id) => id !== action.payload.taskId
      );
    },
    columnRenamed(
      state,
      action: PayloadAction<{
        columnId: ID;
        title: string;
      }>
    ) {
      const column = state.entities[action.payload.columnId];
      if (!column) return;

      if (column.isDefault) return;

      column.title = action.payload.title;
    }

  },
});

export const {
  columnAdded,
  defaultColumnAdded,
  columnRemoved,
  taskAddedToColumn,
  removeTaskFromColumn,
  columnRenamed,
} = columnsSlice.actions;

export default columnsSlice.reducer;
