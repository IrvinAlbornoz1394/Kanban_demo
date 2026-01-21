
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { workspaceCreated } from '../../../features/workspaces/workspacesSlice';
import { Button, Input } from '../../../styles/components.styles';
import { FormField } from '../Form/FormField';

export function CreateWorkspaceModal({
  onClose,
}: {
  onClose: () => void;
}) {

  const dispatch = useAppDispatch();
  const workspaces = useAppSelector(state => state.workspaces);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  //const { showToast } = useToastContext();

  function handleCreate() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('El nombre es obligatorio');
      return;
    }
    if (trimmed.length < 4) {
      setError('El nombre debe tener al menos 4 caracteres');
      return;
    }
    if (trimmed.length > 100) {
      setError('El nombre no puede superar los 100 caracteres');
      return;
    }
    if (workspaces.some(ws => ws.name.trim().toLowerCase() === trimmed.toLowerCase())) {
      setError('Ya existe un workspace con ese nombre');
      return;
    }
    setError(null);
    dispatch(workspaceCreated(trimmed));
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <h3>Create workspace</h3>
      <form
        onSubmit={e => { e.preventDefault(); handleCreate(); }}
        style={{ width: '100%' }}
      >
        <FormField label="Workspace name" htmlFor="workspace-name" error={error || undefined}>
          <Input
            id="workspace-name"
            value={name}
            onChange={e => { setName(e.target.value); if (error) setError(null); }}
            placeholder="Workspace name"
            style={{ width: '100%', marginBottom: '12px' }}
            autoFocus
          />
        </FormField>
        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
}
