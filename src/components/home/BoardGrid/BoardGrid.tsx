import type { Board } from '../../../types/kanban';
import { BoardCard } from '../BoardCard/BoardCard';
import { Grid } from './BoardGrid.styles';

export function BoardGrid({
  boards,
  workspaceId,
}: {
  boards: Board[];
  workspaceId: string;
}) {
  return (
    <Grid>
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}

      <BoardCard
        isAdd
        workspaceId={workspaceId}
      />
    </Grid>
  );
}
