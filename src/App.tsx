
import { useDispatch } from 'react-redux';
import { addBoard } from './features/boards/boardsSlice';

function App() {
  const dispatch = useDispatch();
  
  return (
    <div>
      <h1>Kanban Project Management Tool</h1>
      <button onClick={() => dispatch(addBoard('My First Board'))}>
        Add Board
      </button>
    </div>
  );
}

export default App 