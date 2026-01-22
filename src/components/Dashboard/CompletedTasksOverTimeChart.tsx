import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useAppSelector } from '../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO, eachDayOfInterval } from 'date-fns';

export function CompletedTasksOverTimeChart() {
  const [searchParams] = useSearchParams();
  const dateStart = searchParams.get('dateStart') || '';
  const dateEnd = searchParams.get('dateEnd') || '';
  const tasks = useAppSelector(state => state.tasks.entities);

  if (!dateStart || !dateEnd) return null;

  // Generar los días del rango
  const days = eachDayOfInterval({
    start: parseISO(dateStart),
    end: parseISO(dateEnd),
  });

  // Contar tareas completadas por día
  const completedByDay = days.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const count = Object.values(tasks).filter(task => {
      if (!task.completedAt) return false;
      const completedDay = format(parseISO(task.completedAt), 'yyyy-MM-dd');
      return completedDay === dayStr;
    }).length;
    return { date: dayStr, completadas: count };
  });

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h4>Tareas completadas por día</h4>
      <ResponsiveContainer>
        <BarChart data={completedByDay} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="completadas" fill="#4caf50" name="Tareas Completadas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}