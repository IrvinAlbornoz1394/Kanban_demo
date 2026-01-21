import { useFieldArray, type Control } from "react-hook-form";
import { Button, Input } from "../../styles/components.styles";

interface SubtasksInputProps {
  control: Control<any>;
  name: string;
}

export function SubtasksInput({ control, name }: SubtasksInputProps) {
  const { fields, append, remove, update } = useFieldArray({ control, name });

  return (
    <div>
      <b>Subtareas</b>
      <ul style={{ paddingLeft: 16 }}>
        {fields.map((subtask: any, idx) => (
          <li key={subtask.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={e => update(idx, { ...subtask, completed: e.target.checked })}
            />
            <Input
              value={subtask.title}
              onChange={e => update(idx, { ...subtask, title: e.target.value })}
              placeholder="Subtarea"
              maxLength={100}
            />
            <Button type="button" onClick={() => remove(idx)}>✕</Button>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={() => append({ id: crypto.randomUUID(), title: "", completed: false })}
      >
        + Añadir subtarea
      </Button>
    </div>
  );
}