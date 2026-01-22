import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { Board } from '../components/Board/Board';
import Breadcrumb from '../components/layout/Breadcrumb';
import TaskFormFilter, { type TaskFormFilterValues } from '../components/Task/TaskFormFilter';

export function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const board = useAppSelector((state) =>
    state.boards.find((b) => b.id === boardId)
  );

  if (!boardId || !board) {
    return (
      <div>
        <p>Board not found</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  // Leer filtros desde la URL
  const filterDefaults: TaskFormFilterValues = {
    search: searchParams.get('search') || '',
    priority: searchParams.get('priority') || '',
    dueDateStart: searchParams.get('dueDateStart') || '',
    dueDateEnd: searchParams.get('dueDateEnd') || '',
  };

  const handleFilterSubmit = (values: TaskFormFilterValues) => {
    const params: Record<string, string> = {};
    if (values.search) params.search = values.search;
    if (values.priority) params.priority = values.priority;
    if (values.dueDateStart) params.dueDateStart = values.dueDateStart;
    if (values.dueDateEnd) params.dueDateEnd = values.dueDateEnd;
    setSearchParams(params);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Breadcrumb 
          items={[
            { label: 'Inicio', href: '/' },
            { label: board.name }
          ]} 
        />
        <TaskFormFilter
          values={filterDefaults}
          onChange={() => {}}
          onSubmit={handleFilterSubmit}
        />
      </div>

      <div style={{ overflowX: 'auto', padding: '10px' }}>
        <Board boardId={boardId} filter={filterDefaults} />
      </div>

      <button onClick={() => navigate('/workspaces')}>
        ← Volver a Workspaces
      </button>
    </>
  );
}
