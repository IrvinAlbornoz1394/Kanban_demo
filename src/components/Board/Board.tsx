//import { useState } from 'react';
import {  useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
//import { Column } from '../Column/Column';
import { BoardWrapper } from './Board.styles';
import { AddColumnCard } from '../Column/AddColumnCard';
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableColumn } from '../Column/SortableColumn';
import { taskMoved } from '../../features/columns/columnsSlice';
import { taskColumnChanged } from '../../features/tasks/tasksSlice';
import { reorderColumns } from '../../features/boards/boardsSlice';




export function Board({ boardId }: { boardId: string }) {
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find((b) => b.id === boardId)
  );

  function handleDragEnd(event: DragEndEvent) {
    if (!board) return;

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    /* ===== COLUMNAS ===== */
    const isColumnDrag =
      board.columnIds.includes(activeId) &&
      board.columnIds.includes(overId);

    if (isColumnDrag) {
      if (activeId === overId) return;

      dispatch(
        reorderColumns({
          boardId: board.id,
          activeId,
          overId,
        })
      );
      return;
    }

    /* ===== TASKS ===== */
    let fromColumnId: string | null = null;
    let toColumnId: string | null = null;
    let toIndex = 0;

    for (const column of Object.values(columns.entities)) {
      if (!column) continue;

      if (column.taskIds.includes(activeId)) {
        fromColumnId = column.id;
      }

      if (column.taskIds.includes(overId)) {
        toColumnId = column.id;
        toIndex = column.taskIds.indexOf(overId);
      }
    }

    if (!fromColumnId || !toColumnId) return;

    dispatch(
      taskMoved({
        taskId: activeId,
        fromColumnId,
        toColumnId,
        toIndex,
      })
    );

    if (fromColumnId !== toColumnId) {
      dispatch(
        taskColumnChanged({
          taskId: activeId,
          columnId: toColumnId,
        })
      );
    }
  }


  const columns = useAppSelector((state) => state.columns);
  const tasks = useAppSelector((state) => state.tasks);

  //const [name, setName] = useState(board?.name ?? '');

  if (!board) return null;

  return (
  <DndContext
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext
    items={board.columnIds}
    strategy={horizontalListSortingStrategy}
  >
    <BoardWrapper>
      {board.columnIds.map((columnId) => {
        const column = columns.entities[columnId];
        if (!column) return null;

        const columnTasks = column.taskIds
          .map((taskId) => tasks.entities[taskId])
          .filter((task) => task && !task.archived);

        return (
          <SortableColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
          />
        );
      })}

      <AddColumnCard boardId={board.id} />
    </BoardWrapper>
  </SortableContext>
</DndContext>

  );
}
