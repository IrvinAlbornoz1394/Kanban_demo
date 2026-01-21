import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { columnAdded } from '../../features/columns/columnsSlice';
import { addColumnToBoard } from '../../features/boards/boardsSlice';


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
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit() {
    if (!title.trim()) return;

    const action = columnAdded(boardId, title.trim());
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
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
    </Card>
  );
}
