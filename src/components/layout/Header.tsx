import { useState } from 'react';
import { HeaderWrapper, Title } from './Header.styles';
import { toggleTheme } from '../../features/ui/uiSlice';
import { useAppDispatch } from '../../app/hooks';
import { CreateWorkspaceModal } from '../ui/CreateWorkspaceModal/CreateWorkspaceModal';
import { Button } from '../../styles/components.styles';

export function Header() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <Title>Kanban</Title>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setOpen(true)}>
            + Create Workspace
          </Button>

          <Button onClick={() => dispatch(toggleTheme())}>
            Toggle Theme
          </Button>
        </div>
      </HeaderWrapper>

      {open && (
        <CreateWorkspaceModal onClose={() => setOpen(false)} />
      )}
    </>
  );
}
