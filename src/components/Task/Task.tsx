import { useState } from 'react';
import type { Task as TaskType } from '../../types/kanban';
import { TaskCard } from './Task.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  archiveTask,
  deleteTask,
  updateTask,
} from '../../features/tasks/tasksSlice';
import { removeTaskEverywhere } from '../../features/columns/columnsSlice';
import { EditTaskModal } from './EditTaskModal';
import { TaskActionsMenu } from '../ui/TaskActionsMenu/TaskActionsMenu';
import { Modal } from '../ui/Modal/Modal'; // Ajusta el import según tu estructura
import { Button } from '../../styles/components.styles';

interface Props {
  task: TaskType;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function Task({ task, dragHandleProps }: Props) {

  const dispatch = useAppDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);


  // Obtén la columna actual para saber si es "Done"
  const column = useAppSelector(state => state.columns.entities[task.columnId]);
  const isDone = column?.title?.toLowerCase() === "done";

  function handleDelete() {
    setDeleteOpen(true);
  }

  function confirmDelete() {
    dispatch(deleteTask({ taskId: task.id }));
    dispatch(removeTaskEverywhere({ taskId: task.id }));
    setDeleteOpen(false);
  }

  function handleEditSave(updatedTask: TaskType) {
    dispatch(updateTask({ task: updatedTask }));
    setEditOpen(false);
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

        {/* Menú de acciones */}
        <TaskActionsMenu
          onEdit={() => setEditOpen(true)}
          onArchive={isDone ? () => dispatch(archiveTask({ taskId: task.id })) : undefined}
          onDelete={handleDelete}
          showArchive={isDone}
          task={task}
        />

        {/* Drag handle */}
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

      {/* Modal de edición */}
      {editOpen && (
        <EditTaskModal
          task={task}
          onSave={handleEditSave}
          onClose={() => setEditOpen(false)}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {deleteOpen && (
        <Modal onClose={() => setDeleteOpen(false)}>
          <h3>Confirmar eliminación</h3>
          <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
          <Button onClick={confirmDelete} style={{ color: 'red', marginRight: 8 }}>
            Eliminar
          </Button>
          <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
        </Modal>
      )}
    </TaskCard>
  );
}
