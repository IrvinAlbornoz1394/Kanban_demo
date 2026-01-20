import { useState } from 'react';
import type { Column as ColumnType, Task as TaskType } from '../../types/kanban';
import { ColumnWrapper, ColumnTitle } from './Column.styles';
import { useAppDispatch } from '../../app/hooks';
import { addTask, deleteTask } from '../../features/tasks/tasksSlice';
import {
  taskAddedToColumn,
  columnRemoved,
  columnRenamed,
} from '../../features/columns/columnsSlice';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTask } from '../Task/SortableTask';


interface Props {
  column: ColumnType;
  tasks: TaskType[];
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}


export function Column({ column, tasks, dragHandleProps }: Props) {
  const dispatch = useAppDispatch();

  // 🆕 estados
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const activeTasks = tasks.filter((t) => !t.archived);

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

  function handleRename() {
    if (!columnTitle.trim()) return;

    dispatch(
      columnRenamed({
        columnId: column.id,
        title: columnTitle.trim(),
      })
    );

    setIsEditingTitle(false);
  }

  function handleDeleteColumn() {
    // eliminar todas las tasks
    column.taskIds.forEach((taskId) => {
      dispatch(deleteTask({ taskId }));
    });

    dispatch(columnRemoved({ columnId: column.id }));
  }

  return (
    <ColumnWrapper>
      <div
        {...dragHandleProps}
        style={{
          height: '6px',
          background: 'var(--accent)',
          cursor: 'grab',
          borderRadius: '8px 8px 0 0',
        }}
      />


      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {isEditingTitle && !column.isDefault ? (
          <input
            autoFocus
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
              if (e.key === 'Escape') {
                setColumnTitle(column.title);
                setIsEditingTitle(false);
              }
            }}
          />
        ) : (
          <ColumnTitle
            onDoubleClick={() => {
              if (!column.isDefault) {
                setIsEditingTitle(true);
              }
            }}
          >
            {column.title}
          </ColumnTitle>
        )}

        <div style={{ display: 'flex', gap: '6px' }}>
          <b>{tasks.length}</b>
          {!column.isDefault && (
            <button onClick={handleDeleteColumn}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tasks */}
       
      <div
        style={{
          flex: 1,               
          minHeight: '40px',     
          paddingTop: '8px',
        }}
      >
        <SortableContext
          items={activeTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {activeTasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
          {/* Crear task */}
      {isAdding ? (
        <input
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
          placeholder="Add a task..."
          style={{ width: '100%', marginTop: '8px' }}
        />
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          style={{ marginTop: '8px' }}
        >
          + Add task
        </button>
      )}
        </SortableContext>
      </div>

      
    </ColumnWrapper>
  );
}
