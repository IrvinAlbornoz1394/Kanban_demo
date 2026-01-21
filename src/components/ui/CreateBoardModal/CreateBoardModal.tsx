
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createBoardWithDefaults } from '../../../features/boards/createBoardWithDefaults';
import { Button, Input } from '../../../styles/components.styles';
import { FormField } from '../Form/FormField';
import { useToastContext } from '../Toast/ToastProvider';

export function CreateBoardModal({
  workspaceId,
  onClose,
}: {
  workspaceId: string;
  onClose: () => void;
}) {

  const dispatch = useAppDispatch();
  const boards = useAppSelector(state => state.boards);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToastContext();

  function handleCreate() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('El nombre es obligatorio');
      //showToast('El nombre del board es obligatorio', 'error');
      return;
    }
    if (trimmed.length < 4) {
      setError('El nombre debe tener al menos 4 caracteres');
      //showToast('El nombre debe tener al menos 4 caracteres', 'error');
      return;
    }
    if (trimmed.length > 100) {
      setError('El nombre no puede superar los 100 caracteres');
      //showToast('El nombre no puede superar los 100 caracteres', 'error');
      return;
    }
    if (boards.some(b => b.workspaceId === workspaceId && b.name.trim().toLowerCase() === trimmed.toLowerCase())) {
      setError('Ya existe un board con ese nombre en este workspace');
      //showToast('Ya existe un board con ese nombre en este workspace', 'error');
      return;
    }
    setError(null);
    dispatch(createBoardWithDefaults(workspaceId, trimmed));
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <h3>Create board</h3>
      <form
        onSubmit={e => { e.preventDefault(); handleCreate(); }}
        style={{ width: '100%' }}
      >
        <FormField label="Board name" htmlFor="board-name" error={error || undefined}>
          <Input
            id="board-name"
            value={name}
            onChange={e => { setName(e.target.value); if (error) setError(null); }}
            placeholder="Board name"
            style={{ width: '100%', marginBottom: '12px' }}
            autoFocus
          />
        </FormField>
        <Button type="submit">Create board</Button>
      </form>
    </Modal>
  );
}
