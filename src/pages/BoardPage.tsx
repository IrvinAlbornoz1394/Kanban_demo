import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { Board } from '../components/Board/Board';
import Breadcrumb from '../components/layout/Breadcrumb';

export function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();

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

  return (
    <>
      <Breadcrumb 
        items={[
          { label: 'Inicio', href: '/' },
          { label: board.name }
        ]} 
      />
      <div style={{ overflowX: 'auto', padding: '10px' }}>
        <Board boardId={boardId} />
      </div>
    </>
  );
}
