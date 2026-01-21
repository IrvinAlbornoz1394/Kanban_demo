import { useForm } from "react-hook-form";
import type { Task } from "../../types/kanban";
import { useEffect } from "react";
import { SubtasksInput } from "./SubtasksInput";
import { isBefore } from "date-fns";
import { Modal } from "../ui/Modal/Modal";
import { FormField } from "../ui/Form/FormField";
import { Button } from "../../styles/components.styles";

interface EditTaskModalProps {
  task: Task;
  onSave: (data: Task) => void;
  onClose: () => void;
}

export function EditTaskModal({ task, onSave, onClose }: EditTaskModalProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<Task>({
    defaultValues: task,
    mode: "onChange",
  });

  // Validación de fecha de vencimiento
  const dueDate = watch("dueDate");
  useEffect(() => {
    if (dueDate && isBefore(new Date(dueDate), new Date())) {
      setValue("dueDate", "");
    }
  }, [dueDate, setValue]);

  return (
    <Modal onClose={onClose} style={{ maxWidth: '400px', width: '100%' }}>
      <form
        onSubmit={handleSubmit(onSave)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", maxHeight: "90vh", padding: 16 }}
      >
        <h2 style={{ marginBottom: 8 }}>Editar tarea</h2>

        <FormField
          label="Título"
          htmlFor="title"
          error={errors.title?.message}
        >
          <input
            id="title"
            {...register("title", {
              required: "El título es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
              maxLength: { value: 100, message: "Máximo 100 caracteres" },
            })}
            placeholder="Título de la tarea"
            autoFocus
            style={{ width: "100%" }}
          />
        </FormField>

        <FormField
          label="Descripción"
          htmlFor="description"
          error={errors.description?.message}
        >
          <textarea
            id="description"
            {...register("description", {
              maxLength: { value: 1000, message: "Máximo 1000 caracteres" },
            })}
            placeholder="Descripción (markdown soportado)"
            style={{ width: "100%", minHeight: 60 }}
          />
        </FormField>

        <FormField label="Prioridad" htmlFor="priority">
          <select
            id="priority"
            {...register("priority", { required: true })}
            style={{ width: "100%" }}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </select>
        </FormField>

        <FormField
          label="Fecha de vencimiento"
          htmlFor="dueDate"
          error={errors.dueDate?.message}
        >
          <input
            id="dueDate"
            type="date"
            {...register("dueDate", {
              validate: (value) =>
                !value || new Date(value) >= new Date() || "No puede ser pasada",
            })}
            style={{ width: "100%" }}
          />
        </FormField>

        <FormField
          label="Horas estimadas"
          htmlFor="estimatedHours"
          error={errors.estimatedHours?.message}
        >
          <input
            id="estimatedHours"
            type="number"
            step="0.1"
            min={0}
            {...register("estimatedHours", {
              min: { value: 0, message: "Solo números positivos" },
            })}
            placeholder="Ej: 2.5"
            style={{ width: "100%" }}
          />
        </FormField>

        {/* <FormField label="Etiquetas">
          <TagsInput control={control} name="tags" />
        </FormField> */}

        <FormField label="Subtareas">
          <SubtasksInput control={control} name="subtasks" />
        </FormField>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 8,
          }}
        >
          <Button
            type="submit"
            disabled={!isDirty}
            style={{ flex: 1 }}
          >
            Guardar
          </Button>
          <Button
            type="button"
            onClick={onClose}
            style={{ flex: 1 }}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
}