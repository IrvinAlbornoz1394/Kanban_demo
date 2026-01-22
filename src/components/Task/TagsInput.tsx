
import { useFieldArray, type Control } from "react-hook-form";
import { Button, Input } from "../../styles/components.styles";
import { useRef, useState, useEffect } from "react";
import DeleteIcon from "../ui/Icons/DeleteIcon";

interface TagsInputProps {
  control: Control<any>;
  name: string;
}

export function TagsInput({ control, name }: TagsInputProps) {
  const { fields, append, remove, update } = useFieldArray({ control, name, keyName: 'fieldId' });

  // Local state for debounced label values
  const [localLabels, setLocalLabels] = useState(() => fields.map(f => (f as any).label));
  const debounceTimeouts = useRef<(number | null)[]>([]);

  // Keep localLabels in sync if fields change (e.g., add/remove)
  useEffect(() => {
    setLocalLabels(fields.map(f => (f as any).label));
  }, [fields.length]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      debounceTimeouts.current.forEach(t => t && clearTimeout(t));
    };
  }, []);

  const handleLabelChange = (idx: number, value: string) => {
    setLocalLabels(labels => {
      const newLabels = [...labels];
      newLabels[idx] = value;
      return newLabels;
    });
    if (debounceTimeouts.current[idx]) clearTimeout(debounceTimeouts.current[idx]!);
    debounceTimeouts.current[idx] = setTimeout(() => {
      update(idx, { ...fields[idx], label: value });
    }, 350);
  };

  // Local state for color values
  const [localColors, setLocalColors] = useState(() => fields.map(f => (f as any).color));

  // Keep localColors in sync if fields change (e.g., add/remove)
  useEffect(() => {
    setLocalColors(fields.map(f => (f as any).color));
  }, [fields.length]);

  const handleColorChange = (idx: number, value: string) => {
    setLocalColors(colors => {
      const newColors = [...colors];
      newColors[idx] = value;
      return newColors;
    });
  };

  const handleColorBlur = (idx: number) => {
    const tempFields: any[] = [...fields];
    if (localColors[idx] !== tempFields[idx].color) {
      update(idx, { ...fields[idx], color: localColors[idx] });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {fields.map((tag: any, idx) => (
          <div key={tag.fieldId} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Input
              value={localLabels[idx] ?? tag.label}
              onChange={e => handleLabelChange(idx, e.target.value)}
              placeholder="Etiqueta"
              maxLength={20}
              style={{ borderColor: tag.color, borderWidth: 2 }}
            />
            <input
              type="color"
              value={localColors[idx] ?? tag.color}
              onChange={e => handleColorChange(idx, e.target.value)}
              onBlur={() => handleColorBlur(idx)}
              style={{ border: 'none', width: 32, height: 32, padding: 0, cursor: 'pointer' }}
              title="Selecciona color"
            />
            <Button variant="icon" onClick={() => remove(idx)}>
              <DeleteIcon />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => append({ id: crypto.randomUUID(), label: "", color: "#e57373" })}
        >
          + Añadir etiqueta
        </Button>
      </div>
    </div>
  );
}