import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface Props {
  data: { date: string; completed: number }[];
}

export function CompletedTasksOverTimeChart({ data }: Props) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <h4>Tareas completadas por día (últimos 7 días)</h4>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="completed" stroke="#4b7bec" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}