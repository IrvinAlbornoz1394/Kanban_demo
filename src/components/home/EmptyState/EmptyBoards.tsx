import { useAppDispatch } from '../../../app/hooks';
import { createBoardWithDefaults } from '../../../features/boards/createBoardWithDefaults';

export function EmptyBoards({ workspaceId }: { workspaceId: string }) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>No boards in this workspace</p>
      <button
        onClick={() =>
          dispatch(createBoardWithDefaults(workspaceId, 'New Board'))
        }
      >
        + Create Board
      </button>
    </div>
  );
}
