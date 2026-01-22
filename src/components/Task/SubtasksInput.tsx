import { useFieldArray, type Control } from "react-hook-form";
import { Button, Input } from "../../styles/components.styles";
import { useRef, useState, useEffect } from "react";
import DeleteIcon from "../ui/Icons/DeleteIcon";

interface SubtasksInputProps {
  control: Control<any>;
  name: string;
}

export function SubtasksInput({ control, name }: SubtasksInputProps) {
  const { fields, append, remove, update } = useFieldArray({ control, name });

  const [localTitles, setLocalTitles] = useState(() => fields.map(f => (f as any).title));
  const debounceTimeouts = useRef<(number | null)[]>([]);

  useEffect(() => {
    setLocalTitles(fields.map(f => (f as any).title));
  }, [fields.length]);

  useEffect(() => {
    return () => {
      debounceTimeouts.current.forEach(t => t && clearTimeout(t));
    };
  }, []);

  const handleTitleChange = (idx: number, value: string) => {
    setLocalTitles(titles => {
      const newTitles = [...titles];
      newTitles[idx] = value;
      return newTitles;
    });
    if (debounceTimeouts.current[idx]) clearTimeout(debounceTimeouts.current[idx]!);
    debounceTimeouts.current[idx] = setTimeout(() => {
      update(idx, { ...fields[idx], title: value });
    }, 350);
  };

  return (
    <div>
      <ul style={{ paddingLeft: 16 }}>
        {fields.map((subtask: any, idx) => (
          <li key={subtask.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={e => update(idx, { ...subtask, completed: e.target.checked })}
            />
            <Input
              value={localTitles[idx] ?? subtask.title}
              onChange={e => handleTitleChange(idx, e.target.value)}
              placeholder="Subtarea"
              maxLength={100}
            />
            <Button variant="icon" onClick={() => remove(idx)}>
              <DeleteIcon />
            </Button>
          </li>
        ))}
      </ul>
      <Button
        variant="outline"
        onClick={() => append({ id: crypto.randomUUID(), title: "", completed: false })}
      >
        + Añadir subtarea
      </Button>
    </div>
  );
}