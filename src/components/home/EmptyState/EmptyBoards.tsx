import { useAppDispatch } from '../../../app/hooks';
import { createBoardWithDefaults } from '../../../features/boards/createBoardWithDefaults';
import { Button } from '../../../styles/components.styles';

export function EmptyBoards({ workspaceId }: { workspaceId: string }) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>No boards in this workspace</p>
      <Button
        onClick={() =>
          dispatch(createBoardWithDefaults(workspaceId, 'New Board'))
        }
      >
        + Create Board
      </Button>
    </div>
  );
}
