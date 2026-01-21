import { useState } from 'react'
import { addTask } from '../../features/tasks/tasksSlice';
import { taskAddedToColumn } from '../../features/columns/columnsSlice';
import type { Column as ColumnType} from '../../types/kanban';
import { useAppDispatch } from '../../app/hooks';
import { Button, Input } from '../../styles/components.styles';


interface AddTaskProps {
    column: ColumnType;
}

const AddTask = ({ column }: AddTaskProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');

    const dispatch = useAppDispatch();

    function handleSubmit() {
        if (!title.trim()) return;
    
        const action = addTask(column.id, title.trim());
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
            <Input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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