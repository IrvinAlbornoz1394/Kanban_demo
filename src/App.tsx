import { useAppDispatch, useAppSelector } from './app/hooks';
import { addBoard } from './features/boards/boardsSlice';
import { addColumn } from './features/columns/columnsSlice';
import { addTask } from './features/tasks/tasksSlice';

function App() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.ids);
  const columns = useAppSelector((state) => state.columns.ids);

  return (
    <div>
      <h1>Kanban Project Management Tool</h1>

      <button onClick={() => dispatch(addBoard('Demo Board'))}>
        Add Board
      </button>

      {boards[0] && (
        <button onClick={() => dispatch(addColumn(boards[0], 'To Do'))}>
          Add Column
        </button>
      )}

      {columns[0] && (
        <button
          onClick={() => dispatch(addTask(columns[0], 'My first task'))}
        >
          Add Task
        </button>
      )}
    </div>
  );
}

export default App;
