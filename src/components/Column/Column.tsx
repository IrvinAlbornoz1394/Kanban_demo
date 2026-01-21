import { useState } from 'react';
import type { Column as ColumnType, Task as TaskType } from '../../types/kanban';
import { ColumnWrapper, ColumnTitle, ColumnHeader, TasksScrollArea } from './Column.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTask } from '../../features/tasks/tasksSlice';
import {
  columnRemoved,
  columnRenamed,
  taskMoved,
  removeTaskEverywhere,
  moveAllTasksToColumn,
} from '../../features/columns/columnsSlice';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTask } from '../Task/SortableTask';
import DeleteColumn from './DeleteColumn';
import AddTask from './AddTask';
import { Button } from '../../styles/components.styles';
import DeleteIcon from '../ui/Icons/DeleteIcon';

interface Props {
  column: ColumnType;
  tasks: TaskType[];
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}


export function Column({ column, tasks, dragHandleProps }: Props) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.columns.entities);

  // Filtra solo columnas del mismo board, excluyendo la actual y las default
  const destinationColumns = Object.values(columns)
    .filter(c => c.boardId === column.boardId && c.id !== column.id);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  // Modal de confirmación
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>(''); // columna destino
  const activeTasks = tasks.filter((t) => !t.archived);

  // Paginación/carga incremental
  const [visibleCount, setVisibleCount] = useState(10);
  const visibleTasks = activeTasks.slice(0, visibleCount);
  const hasMore = visibleCount < activeTasks.length;

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
    setDeleteOpen(true);
  }

  function handleConfirmDelete() {
    if (activeTasks.length > 0) {
      if (selectedColumn === '') {
        // Eliminar todas las tasks
        column.taskIds.forEach((taskId) => {
          dispatch(deleteTask({ taskId }));
          dispatch(removeTaskEverywhere({ taskId }));
        });
      } else {
        // Mover tasks a columna destino
        column.taskIds.forEach((taskId, idx) => {
          dispatch(taskMoved({
            taskId,
            fromColumnId: column.id,
            toColumnId: selectedColumn,
            toIndex: columns[selectedColumn]?.taskIds.length ?? 0 + idx,
          }));
        });

        dispatch(moveAllTasksToColumn({
          fromColumnId: column.id,
          toColumnId: selectedColumn,
        }));
      }
    }
    dispatch(columnRemoved({ columnId: column.id }));
    setDeleteOpen(false);
    setSelectedColumn('');
  }

  return (
    <ColumnWrapper>
      <div
        {...dragHandleProps}
        className="drag-handle"
      />

      {/* Header */}
      <ColumnHeader>
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
            <Button variant="icon" onClick={handleDeleteColumn}>
              <DeleteIcon />
            </Button>
          )}
        </div>
      
      </ColumnHeader>

      {/* Modal de confirmación */}
      {deleteOpen && (
        <DeleteColumn
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
          setDeleteOpen={setDeleteOpen}
          activeTasks={activeTasks}
          destinationColumns={destinationColumns}
          handleConfirmDelete={handleConfirmDelete}
        />  
      )}

      {/* Tasks */}
      <TasksScrollArea>
        <SortableContext
          items={visibleTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {visibleTasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
          {hasMore && (
            <button
              style={{ width: '100%', margin: '8px 0', padding: 8, borderRadius: 4, border: '1px solid #ccc', background: '#f5f6fa', cursor: 'pointer' }}
              onClick={() => setVisibleCount((c) => c + 10)}
            >
              Cargar más tareas
            </button>
          )}
          {/* Crear task */}
          <AddTask column={column} />
        </SortableContext>
      </TasksScrollArea>
    </ColumnWrapper>
  );
}
