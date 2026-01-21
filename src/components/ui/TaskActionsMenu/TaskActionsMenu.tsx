import { useState } from "react";
import { duplicateTaskAndAddToColumn } from "../../../features/tasks/tasksSlice";
import type { Task } from "../../../types/kanban";
import { useAppDispatch } from "../../../app/hooks";
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
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}
        aria-label="Abrir menú de acciones"
      >
        ⋮
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 28,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 10,
            minWidth: 120,
            padding: 4,
          }}
        >
          <Button type="button" onClick={() => { onEdit(); setOpen(false); }} style={menuBtnStyle}>
            Editar
          </Button>
          {showArchive && (
            <Button type="button" onClick={() => { onArchive?.(); setOpen(false); }} style={menuBtnStyle}>
              Archivar
            </Button>
          )}
          <Button type="button" onClick={() => { onDelete(); setOpen(false); }} style={{ ...menuBtnStyle, color: "#d32f2f" }}>
            Eliminar
          </Button>
          <Button type="button" onClick={handleDuplicate} style={menuBtnStyle}>
            Duplicar tarea
          </Button>
        </div>
      )}
    </div>
  );
}

const menuBtnStyle = {
  display: "block",
  width: "100%",
  background: "none",
  border: "none",
  textAlign: "left" as const,
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: 15,
};