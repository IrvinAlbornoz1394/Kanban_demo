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
    },
    taskMoved(
      state,
      action: PayloadAction<{
        taskId: ID;
        fromColumnId: ID;
        toColumnId: ID;
        toIndex: number;
      }>
    ) {
      const { taskId, fromColumnId, toColumnId, toIndex } =
        action.payload;

      const fromColumn = state.entities[fromColumnId];
      const toColumn = state.entities[toColumnId];

      if (!fromColumn || !toColumn) return;

      // quitar de columna origen
      fromColumn.taskIds = fromColumn.taskIds.filter(
        (id) => id !== taskId
      );

      // insertar en columna destino
      toColumn.taskIds.splice(toIndex, 0, taskId);
    },
    removeTaskEverywhere(
      state,
      action: PayloadAction<{ taskId: ID }>
    ) {
      Object.values(state.entities).forEach((column) => {
        if (!column) return;
        column.taskIds = column.taskIds.filter(
          (id) => id !== action.payload.taskId
        );
      });
    },
    moveAllTasksToColumn(
      state,
      action: PayloadAction<{ fromColumnId: ID; toColumnId: ID }>
    ) {
      const fromColumn = state.entities[action.payload.fromColumnId];
      const toColumn = state.entities[action.payload.toColumnId];
      if (!fromColumn || !toColumn) return;

      // Mover todas las tasks al final de la columna destino
      toColumn.taskIds.push(...fromColumn.taskIds);
      fromColumn.taskIds = [];
    },
  },
});

export const {
  columnAdded,
  defaultColumnAdded,
  columnRemoved,
  taskAddedToColumn,
  removeTaskFromColumn,
  columnRenamed,
  taskMoved,
  removeTaskEverywhere,
  moveAllTasksToColumn,
} = columnsSlice.actions;

export default columnsSlice.reducer;
