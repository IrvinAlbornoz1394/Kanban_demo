import { useAppSelector } from '../../app/hooks';
import { WorkspaceSection } from './workspaceSection/WorkspaceSection';
import { EmptyWorkspaces } from './EmptyState/EmptyWorkspaces';

export function Home() {
  const workspaces = useAppSelector((state) => state.workspaces);

  if (workspaces.length === 0) {
    return <EmptyWorkspaces />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {workspaces.map((workspace) => (
        <WorkspaceSection key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}
