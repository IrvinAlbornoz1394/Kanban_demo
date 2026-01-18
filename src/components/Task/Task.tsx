import type { Task as TaskType } from '../../types/kanban';
import { TaskCard } from './Task.styles';
import { useAppDispatch } from '../../app/hooks';
import {
  archiveTask,
  deleteTask,
} from '../../features/tasks/tasksSlice';
import { removeTaskFromColumn } from '../../features/columns/columnsSlice';

interface Props {
  task: TaskType;
}

export function Task({ task }: Props) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteTask({ taskId: task.id }));
    dispatch(
      removeTaskFromColumn({
        columnId: task.columnId,
        taskId: task.id,
      })
    );
  }

  return (
    <TaskCard>
      <span>{task.title}</span>

      <div style={{ float: 'right' }}>
        <button
          onClick={() =>
            dispatch(archiveTask({ taskId: task.id }))
          }
        >
          Archive
        </button>

        <button
          onClick={handleDelete}
          style={{ marginLeft: '4px' }}
        >
          Delete
        </button>
      </div>
    </TaskCard>
  );
}
