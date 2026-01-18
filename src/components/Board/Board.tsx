//import { useState } from 'react';
import {  useAppSelector } from '../../app/hooks';
import { Column } from '../Column/Column';
import { BoardWrapper } from './Board.styles';
import { AddColumnCard } from '../Column/AddColumnCard';


export function Board({ boardId }: { boardId: string }) {
  //const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find((b) => b.id === boardId)
  );

  const columns = useAppSelector((state) => state.columns);
  const tasks = useAppSelector((state) => state.tasks);

  //const [name, setName] = useState(board?.name ?? '');

  if (!board) return null;

  return (
  <BoardWrapper>
    {board.columnIds.map((columnId) => {
      const column = columns.entities[columnId];
      if (!column) return null;

      const columnTasks = column.taskIds
        .map((taskId) => tasks.entities[taskId])
        .filter((task) => task && !task.archived);

      return (
        <Column
          key={column.id}
          column={column}
          tasks={columnTasks}
        />
      );
    })}

    {/* ➕ Add column card */}
    <AddColumnCard boardId={board.id} />
  </BoardWrapper>
  );
}
