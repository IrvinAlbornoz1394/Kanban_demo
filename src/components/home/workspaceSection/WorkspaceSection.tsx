import type { Board, Workspace } from '../../../types/kanban';
import { BoardGrid } from '../BoardGrid/BoardGrid';
import { Section, Title } from './WorkspaceSection.styles';
import { useAppSelector } from '../../../app/hooks';

interface Props {
  workspace: Workspace;
}

export function WorkspaceSection({ workspace }: Props) {


  const boards = useAppSelector((state) =>
    workspace.boardIds
      .map((id) => state.boards.find((b) => b.id === id))
      .filter((b): b is Board => Boolean(b))
  );

  return (
    <Section>
      <Title>{workspace.name}</Title>

      <BoardGrid boards={boards} workspaceId={workspace.id} />
      
    </Section>
  );
}
