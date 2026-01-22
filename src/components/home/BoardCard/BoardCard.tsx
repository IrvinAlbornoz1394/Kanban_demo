import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Board } from '../../../types/kanban';
import { Card } from './BoardCard.styles';
import { CreateBoardModal } from '../../ui/CreateBoardModal/CreateBoardModal';
import { Modal } from '../../ui/Modal/Modal';
import { useAppDispatch } from '../../../app/hooks';
import { renameBoard, removeBoard } from '../../../features/boards/boardsSlice';
import { Button } from '../../../styles/components.styles';
import { MenuContext } from '../../ui/TaskActionsMenu/TaskActionsMenu.styles';

interface Props {
  board?: Board;
  isAdd?: boolean;
  workspaceId?: string;
}

export function BoardCard({ board, isAdd, workspaceId }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newName, setNewName] = useState(board?.name || '');

  const handleEdit = () => {
    if (board && newName.trim() && newName !== board.name) {
      dispatch(renameBoard({ boardId: board.id, name: newName.trim() }));
    }
    setEditOpen(false);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    if (board) {
      dispatch(removeBoard({ boardId: board.id }));
    }
    setDeleteOpen(false);
    setMenuOpen(false);
  };

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

  if (board) {
    return (
      <Card style={{ position: 'relative' }}>
        <Button
          variant="icon"
          aria-label="Open board menu"
          onClick={() => setMenuOpen((v) => !v)}
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          ⋮
        </Button>
        {menuOpen && (
          <MenuContext>
            <ul>
              <li
                onClick={() => {
                  setEditOpen(true);
                  setMenuOpen(false);
                }}
              >
                Editar nombre
              </li>
              <li
                onClick={() => {
                  setDeleteOpen(true);
                  setMenuOpen(false);
                }}
              >
                Eliminar
              </li>
            </ul>
          </MenuContext>
        )}

        <div onClick={() => navigate(`/boards/${board.id}`)} style={{ width: '100%', paddingTop: 20 }}>{board.name}</div>

        {/* Modal para editar nombre */}
        {editOpen && (
          <Modal onClose={() => setEditOpen(false)}>
            <h3>Editar nombre del board</h3>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              style={{ width: '100%', marginBottom: 16 }}
            />
            <Button onClick={handleEdit}>Guardar</Button>
            <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          </Modal>
        )}

        {/* Modal de confirmación para eliminar */}
        {deleteOpen && (
          <Modal onClose={() => setDeleteOpen(false)}>
            <h3>¿Eliminar este board?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <Button style={{ color: 'red', marginRight: 8 }} onClick={handleDelete}>
              Eliminar
            </Button>
            <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
          </Modal>
        )}
      </Card>
    );
  }

  return null;
}
