import { useState } from 'react'
import { addTask } from '../../features/tasks/tasksSlice';
import { taskAddedToColumn } from '../../features/columns/columnsSlice';
import type { Column as ColumnType} from '../../types/kanban';
import { useAppDispatch } from '../../app/hooks';
import { Button, Input } from '../../styles/components.styles';
import { useToastContext } from '../ui/Toast/ToastProvider';


interface AddTaskProps {
    column: ColumnType;
}

const AddTask = ({ column }: AddTaskProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');


    const dispatch = useAppDispatch();
    const { showToast } = useToastContext();
    const [error, setError] = useState<string | null>(null);

    function handleSubmit() {
        if (!title.trim()) {
            setError('El título es obligatorio');
            showToast('El título de la tarea es obligatorio', 'error');
            return;
        }
        setError(null);
        const action = addTask(column.id, column.boardId, column.title, title.trim());
        dispatch(action);
        dispatch(
          taskAddedToColumn({
            columnId: column.id,
            taskId: action.payload.id,
          })
        );
        setTitle('');
        setIsAdding(false);
    }

  return (
    <>
        {isAdding ? (
            <div style={{ width: '100%' }}>
              <Input
                autoFocus
                value={title}
                onChange={(e) => { setTitle(e.target.value); if (error) setError(null); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                  if (e.key === 'Escape') {
                    setIsAdding(false);
                    setTitle('');
                  }
                }}
                placeholder="Titulo de la tarea"
                style={{ width: '100%', marginTop: '8px' }}
              />
              {error && <div style={{ color: '#d32f2f', fontSize: '0.9em', marginTop: 2 }}>{error}</div>}
            </div>
          ) : (
            <Button
              onClick={() => setIsAdding(true)}
              style={{ marginTop: '8px' }}
            >
              + Add task
            </Button>
          )}
    </>
  )
}

export default AddTask