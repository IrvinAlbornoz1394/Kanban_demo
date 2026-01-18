import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch } from '../../../app/hooks';
import { workspaceCreated } from '../../../features/workspaces/workspacesSlice';

export function CreateWorkspaceModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  function handleCreate() {
    if (!name.trim()) return;

    dispatch(workspaceCreated(name.trim()));
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <h3>Create workspace</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workspace name"
        style={{ width: '100%', marginBottom: '12px' }}
      />

      <button onClick={handleCreate}>Create</button>
    </Modal>
  );
}
