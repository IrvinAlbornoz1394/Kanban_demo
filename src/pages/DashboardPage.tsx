import { FilterForm } from '../components/Dashboard/FilterForm';
import { ChartCard, ChartsGrid } from '../components/Dashboard/Grid.styles';
import { TasksByStatusPieChart } from '../components/Dashboard/TasksByStatusPieChart';
import { CompletedTasksOverTimeChart } from '../components/Dashboard/CompletedTasksOverTimeChart';
import { TaskTimePerColumnTable } from '../components/Dashboard/TaskTimePerColumnTable';
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")}>
        ← Volver a Workspaces
      </button>
      <h2>Panel de Analíticas</h2>
      <FilterForm/>

      <ChartsGrid>
        <ChartCard>
          <TasksByStatusPieChart />
        </ChartCard>
        <ChartCard>
          <CompletedTasksOverTimeChart />
        </ChartCard>
        <ChartCard>
          <TaskTimePerColumnTable />
        </ChartCard>
      </ChartsGrid>
    </div>
  );
}