import  { useFieldArray, type Control } from "react-hook-form";
import { Button } from "../../styles/components.styles";

interface TagsInputProps {
  control: Control<any>;
  name: string;
}

const COLORS = [
  "#e57373", "#f06292", "#ba68c8", "#64b5f6", "#4db6ac", "#ffd54f", "#ffb74d", "#a1887f"
];

export function TagsInput({ control, name }: TagsInputProps) {
  const { fields, append, remove, update } = useFieldArray({ control, name });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {fields.map((tag : any, idx) => (
          <div key={tag.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input
              value={tag.label}
              onChange={e => update(idx, { ...tag, label: e.target.value })}
              placeholder="Etiqueta"
              maxLength={20}
              style={{ borderColor: tag.color, borderWidth: 2 }}
            />
            <select
              value={tag.color}
              onChange={e => update(idx, { ...tag, color: e.target.value })}
              style={{ background: tag.color }}
            >
              {COLORS.map(c => (
                <option key={c} value={c} style={{ background: c }}>{c}</option>
              ))}
            </select>
            <Button type="button" onClick={() => remove(idx)}>✕</Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ id: crypto.randomUUID(), label: "", color: COLORS[0] })}
        >
          + Añadir etiqueta
        </Button>
      </div>
    </div>
  );
}