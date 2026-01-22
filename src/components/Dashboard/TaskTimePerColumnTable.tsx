import { useAppSelector } from '../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import { parseISO, differenceInMinutes } from 'date-fns';
import { Table } from '../../styles/components.styles';

export function TaskTimePerColumnTable() {
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get('boardId') || '';
  const workspaceId = searchParams.get('workspaceId') || '';
  const boards = useAppSelector(state => state.boards);
  const tasks = useAppSelector(state => state.tasks.entities);

  let filteredTasks = Object.values(tasks);
  if (boardId) {
    filteredTasks = filteredTasks.filter(task => task.boardId === boardId);
  } else if (workspaceId) {
    const boardIds = boards.filter(b => b.workspaceId === workspaceId).map(b => b.id);
    filteredTasks = filteredTasks.filter(task => boardIds.includes(task.boardId));
  }


  // Calcular suma y cantidad de tareas por columna
  const columnTimes: Record<string, { total: number; count: number }> = {};
  filteredTasks.forEach(task => {
    if (!task.columnHistory) return;
    task.columnHistory.forEach(entry => {
      const entered = parseISO(entry.enteredAt);
      const exited = entry.exitedAt ? parseISO(entry.exitedAt) : new Date();
      const minutes = differenceInMinutes(exited, entered);
      const col = entry.columnName || entry.columnId;
      if (!columnTimes[col]) columnTimes[col] = { total: 0, count: 0 };
      columnTimes[col].total += minutes;
      columnTimes[col].count += 1;
    });
  });

  const rows = Object.entries(columnTimes).map(([column, { total, count }]) => ({
    column,
    avgMinutes: count > 0 ? Math.round(total / count) : 0,
    count,
  }));

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <h4>Promedio de minutos por columna</h4>
      <Table>
        <thead>
          <tr>
            <th>Columna</th>
            <th>Promedio (min)</th>
            <th># Tiempos registrados</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.column}</td>
              <td>{row.avgMinutes}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
