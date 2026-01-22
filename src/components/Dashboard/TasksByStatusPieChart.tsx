import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppSelector } from '../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import { generateColors } from '../../utils/funtions';
import { format, parseISO } from 'date-fns';
import type { Column } from '../../types/kanban';

export function TasksByStatusPieChart() {
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get('boardId') || '';
  const workspaceId = searchParams.get('workspaceId') || '';
  const dateStart = searchParams.get('dateStart') || '';
  const dateEnd = searchParams.get('dateEnd') || '';

  console.log(dateStart, dateEnd);

  const columns = useAppSelector(state => state.columns.entities);
  const boards = useAppSelector(state => state.boards);
  const tasks = useAppSelector(state => state.tasks.entities);

  let columnList: Column[] = [];
  let groupByName = false;

  if (boardId) {
    const board = boards.find(b => b.id === boardId);
    if (board) {
      columnList = board.columnIds.map(id => columns[id]).filter(Boolean);
    }
  } else {
    // Agrupa por nombre de columna default
    columnList = Object.values(columns).filter(col => col?.isDefault);
    groupByName = true;
  }

  // Prepara el conteo por columna (por id o por nombre)
  const columnCounts: Record<string, number> = {};
  columnList.forEach(col => {
    const key = groupByName ? col.title.trim() : col.id;
    columnCounts[key] = 0;
  });

  Object.values(tasks).forEach(task => {
    if (boardId && task.boardId !== boardId) return;
    if (!boardId && workspaceId) {
      const board = boards.find(b => b.id === task.boardId);
      if (!board || board.workspaceId !== workspaceId) return;
    }

    // Formatear fechas para comparar solo el día
    const createdAtDay = format(parseISO(task.createdAt), 'yyyy-MM-dd');
    const filterStartDay = dateStart;
    const filterEndDay = dateEnd;

    let colId: string | null = null;
    if (task.columnHistory && task.columnHistory.length > 0) {
      const lastEntry = [...task.columnHistory]
        .filter(entry => {
          const enteredDay = format(parseISO(entry.enteredAt), 'yyyy-MM-dd');
          const exitedDay = entry.exitedAt ? format(parseISO(entry.exitedAt), 'yyyy-MM-dd') : null;
          // La tarea estuvo en la columna en algún momento dentro del rango
          return (
            enteredDay <= filterEndDay &&
            (!exitedDay || exitedDay >= filterStartDay)
          );
        })
        .sort((a, b) => b.enteredAt.localeCompare(a.enteredAt))[0];
      if (lastEntry) colId = lastEntry.columnId;
    }
    if (!colId && createdAtDay <= filterEndDay && createdAtDay >= filterStartDay) colId = task.columnId;

    if (!colId) return;

    const col = columns[colId];
    if (!col) return;

    const key = groupByName ? col.title.trim() : col.id;
    if (columnCounts[key] !== undefined) {
      columnCounts[key]++;
    }
  });

  const colors = generateColors(columnList.length);
  const data = columnList.map((col, idx) => ({
    name: col.title,
    value: columnCounts[groupByName ? col.title.trim() : col.id] || 0,
    color: colors[idx],
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h4>Tareas por estado</h4>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
            {data.map((_entry, idx) => (
              <Cell key={`cell-${idx}`} fill={colors[idx]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}