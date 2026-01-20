import type { Task as TaskType } from '../../types/kanban';
import { TaskCard } from './Task.styles';
import { useAppDispatch } from '../../app/hooks';
import {
  archiveTask,
  deleteTask,
} from '../../features/tasks/tasksSlice';
import { removeTaskEverywhere } from '../../features/columns/columnsSlice';

interface Props {
  task: TaskType;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function Task({ task, dragHandleProps }: Props) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteTask({ taskId: task.id }));
    dispatch(removeTaskEverywhere({ taskId: task.id }));
  }

  return (
    <TaskCard>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Título */}
        <span>{task.title}</span>

        {/* Acciones */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <button
            onClick={() =>
              dispatch(archiveTask({ taskId: task.id }))
            }
          >
            Archive
          </button>

          <button onClick={handleDelete}>Delete</button>

          {/* Drag handle (6 dots) */}
          <div
            {...dragHandleProps}
            style={{
              cursor: 'grab',
              padding: '0 4px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 4px)',
              gridTemplateRows: 'repeat(3, 4px)',
              gap: '2px',
            }}
            title="Drag task"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: '4px',
                  height: '4px',
                  background: '#999',
                  borderRadius: '50%',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </TaskCard>
  );
}
