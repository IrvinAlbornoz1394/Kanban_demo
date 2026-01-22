import { FilterForm } from '../components/Dashboard/FilterForm';
import { ChartCard, ChartsGrid } from '../components/Dashboard/Grid.styles';
import { TasksByStatusPieChart } from '../components/Dashboard/TasksByStatusPieChart';

export function DashboardPage() {
  
  return (
    <div>
      <h2>Panel de Analíticas</h2>
      <FilterForm/>

      <ChartsGrid>
        <ChartCard>
            <TasksByStatusPieChart />
        </ChartCard>
        </ChartsGrid>
    </div>
  );
}