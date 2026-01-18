import { useState } from 'react';
import { HeaderWrapper, Title } from './Header.styles';
import { toggleTheme } from '../../features/ui/uiSlice';
import { useAppDispatch } from '../../app/hooks';
import { CreateWorkspaceModal } from '../ui/CreateWorkspaceModal/CreateWorkspaceModal';

export function Header() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <Title>Kanban</Title>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setOpen(true)}>
            + Create Workspace
          </button>

          <button onClick={() => dispatch(toggleTheme())}>
            Toggle Theme
          </button>
        </div>
      </HeaderWrapper>

      {open && (
        <CreateWorkspaceModal onClose={() => setOpen(false)} />
      )}
    </>
  );
}
