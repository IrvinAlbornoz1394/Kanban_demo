import { useState } from 'react';
import type { Board, Workspace } from '../../../types/kanban';
import { BoardGrid } from '../BoardGrid/BoardGrid';
import { Section, Title } from './WorkspaceSection.styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeWorkspace } from '../../../features/workspaces/workspacesSlice';
import { Button } from '../../../styles/components.styles';
import DeleteIcon from '../../ui/Icons/DeleteIcon';
import { Modal } from '../../ui/Modal/Modal';

interface Props {
  workspace: Workspace;
}

export function WorkspaceSection({ workspace }: Props) {
  const dispatch = useAppDispatch();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    dispatch(removeWorkspace({ workspaceId: workspace.id }));
    setDeleteOpen(false);
  };

  const boards = useAppSelector((state) =>
    workspace.boardIds
      .map((id) => state.boards.find((b) => b.id === id))
      .filter((b): b is Board => Boolean(b))
  );

  return (
    <Section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Title>{workspace.name}</Title>
        <Button
          variant="text"
          style={{ padding: 0, minWidth: 0 }}
          onClick={() => setDeleteOpen(true)}
          aria-label="Eliminar workspace"
        >
          <DeleteIcon />
        </Button>
      </div>

      {deleteOpen && (
        <Modal onClose={() => setDeleteOpen(false)}>
          <h3>¿Eliminar este workspace?</h3>
          <p>Esta acción no se puede deshacer.</p>
          <Button style={{ color: 'red', marginRight: 8 }} onClick={handleDelete}>
            Eliminar
          </Button>
          <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
        </Modal>
      )}

      <BoardGrid boards={boards} workspaceId={workspace.id} />
    </Section>
  );
}
