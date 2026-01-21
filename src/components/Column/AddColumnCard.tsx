
import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { columnAdded } from '../../features/columns/columnsSlice';
import { addColumnToBoard } from '../../features/boards/boardsSlice';
import { useToastContext } from '../ui/Toast/ToastProvider';


const Card = styled.div`
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  height: fit-content;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
`;

export function AddColumnCard({
  boardId,
}: {
  boardId: string;
}) {

  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.columns.entities);
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToastContext();

  function handleSubmit() {
    const trimmed = title.trim();
    if (!trimmed) {
      setError('El título es obligatorio');
      showToast('El título de la columna es obligatorio', 'error');
      return;
    }
    // Validar duplicados en el mismo board
    const exists = Object.values(columns).some(
      col => col && col.boardId === boardId && col.title.trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setError('Ya existe una columna con ese nombre en este board');
      showToast('Ya existe una columna con ese nombre en este board', 'error');
      return;
    }
    setError(null);
    const action = columnAdded(boardId, trimmed);
    dispatch(action);
    dispatch(
        addColumnToBoard({
        boardId,
        columnId: action.payload.id,
        })
    );
    setTitle('');
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <Card onClick={() => setIsOpen(true)}>
        <div style={{ width: 200, textAlign: 'center'}}>
        + Add column
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div style={{ width: '100%' }}>
        <Input
          autoFocus
          value={title}
          onChange={(e) => { setTitle(e.target.value); if (error) setError(null); }}
          style={{ width: 200}}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
            if (e.key === 'Escape') {
              setIsOpen(false);
              setTitle('');
            }
          }}
          placeholder="Column title..."
        />
        {error && <div style={{ color: '#d32f2f', fontSize: '0.9em', marginTop: 2 }}>{error}</div>}
      </div>
    </Card>
  );
}
