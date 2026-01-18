import type { AppDispatch } from '../../app/store';
import { boardCreated, boardColumnsAssigned, } from './boardsSlice';
import { boardAddedToWorkspace } from '../workspaces/workspacesSlice';
import { columnAdded } from '../columns/columnsSlice';
import { DEFAULT_COLUMNS } from './defaultColumns';
import type { ID } from '../../types/kanban';

export const createBoardWithDefaults =
  (workspaceId: ID, name: string) =>
  (dispatch: AppDispatch) => {
    const boardAction = dispatch(boardCreated(workspaceId, name));
    const boardId = boardAction.payload.id;

    const columnIds: ID[] = [];

    DEFAULT_COLUMNS.forEach(col => {
      const action = dispatch(columnAdded(boardId, col.title, true));
      columnIds.push(action.payload.id);
    });

    dispatch(
      boardColumnsAssigned({
        boardId,
        columnIds,
      })
    );

    dispatch(
      boardAddedToWorkspace({
        workspaceId,
        boardId,
      })
    );
  };
