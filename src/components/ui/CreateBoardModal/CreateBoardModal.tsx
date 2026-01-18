import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch } from '../../../app/hooks';
import { createBoardWithDefaults } from '../../../features/boards/createBoardWithDefaults';

export function CreateBoardModal({
  workspaceId,
  onClose,
}: {
  workspaceId: string;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  function handleCreate() {
    if (!name.trim()) return;

    dispatch(createBoardWithDefaults(workspaceId, name.trim()));
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <h3>Create board</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Board name"
        style={{ width: '100%', marginBottom: '12px' }}
      />

      <button onClick={handleCreate}>
        Create board
      </button>
    </Modal>
  );
}
