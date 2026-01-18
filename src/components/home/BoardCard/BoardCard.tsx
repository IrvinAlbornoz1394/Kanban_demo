import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Board } from '../../../types/kanban';
import { Card } from './BoardCard.styles';
import { CreateBoardModal } from '../../ui/CreateBoardModal/CreateBoardModal';

interface Props {
  board?: Board;
  isAdd?: boolean;
  workspaceId?: string;
}

export function BoardCard({ board, isAdd, workspaceId }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 1️⃣ Card para agregar board
  if (isAdd && workspaceId) {
    return (
      <>
        <Card isAdd onClick={() => setOpen(true)}>
          + Add Board
        </Card>

        {open && (
          <CreateBoardModal
            workspaceId={workspaceId}
            onClose={() => setOpen(false)}
          />
        )}
      </>
    );
  }

  // 2️⃣ Card normal (navega)
  if (board) {
    return (
      <Card onClick={() => navigate(`/boards/${board.id}`)}>
        {board.name}
      </Card>
    );
  }

  return null;
}
