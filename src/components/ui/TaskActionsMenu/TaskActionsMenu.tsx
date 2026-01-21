import { useState } from "react";
import { duplicateTaskAndAddToColumn } from "../../../features/tasks/tasksSlice";
import type { Task } from "../../../types/kanban";
import { useAppDispatch } from "../../../app/hooks";
// import { Button } from "../../../styles/components.styles";
import { MenuContext } from "./TaskActionsMenu.styles";
import { Button } from "../../../styles/components.styles";

interface TaskActionsMenuProps {
  onEdit: () => void;
  onArchive?: () => void;
  onDelete: () => void;
  showArchive?: boolean;
  task: Task; // Agrega el tipo adecuado para tu tarea
}

export function TaskActionsMenu({ onEdit, onArchive, onDelete, showArchive, task }: TaskActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDuplicate = () => {
    dispatch(duplicateTaskAndAddToColumn(task));
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menú de acciones"
      >
        ⋮
      </Button>
      {open && (
        <MenuContext>
          <ul>
            <li
              tabIndex={0}
              onClick={() => { onEdit(); setOpen(false); }}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onEdit(); setOpen(false); }}}
            >
              Editar
            </li>
            {showArchive && (
              <li
                tabIndex={0}
                onClick={() => { onArchive?.(); setOpen(false); }}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onArchive?.(); setOpen(false); }}}
              >
                Archivar
              </li>
            )}
            <li
              tabIndex={0}
              onClick={() => { onDelete(); setOpen(false); }}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onDelete(); setOpen(false); }}}
            >
              Eliminar
            </li>
            <li
              tabIndex={0}
              onClick={handleDuplicate}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { handleDuplicate(); }}}
            >
              Duplicar tarea
            </li>
          </ul>
        </MenuContext>
      )}
    </div>
  );
}