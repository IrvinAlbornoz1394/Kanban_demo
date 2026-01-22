import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '../../styles/components.styles';

export interface TaskFormFilterValues {
  search: string;
  priority: string;
  dueDateStart: string;
  dueDateEnd: string;
}

interface TaskFormFilterProps {
  values: TaskFormFilterValues;
  onChange: (values: TaskFormFilterValues) => void;
  onSubmit?: (values: TaskFormFilterValues) => void;
}

const priorities = [
  { value: '', label: 'Todas' },
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' },
];

const TaskFormFilter: React.FC<TaskFormFilterProps> = ({ values, onChange, onSubmit }) => {
  const { register, handleSubmit, watch, setValue } = useForm<TaskFormFilterValues>({
    defaultValues: values,
  });

  React.useEffect(() => {
    const subscription = watch((val) => {
      onChange(val as TaskFormFilterValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  React.useEffect(() => {
    setValue('search', values.search);
    setValue('priority', values.priority);
    setValue('dueDateStart', values.dueDateStart);
    setValue('dueDateEnd', values.dueDateEnd);
  }, [values, setValue]);

  const submit = (data: TaskFormFilterValues) => {
    if (onSubmit) onSubmit(data);
  };

  const isFiltered = Boolean(
    values.search || values.priority || values.dueDateStart || values.dueDateEnd
  );

  const handleClear = () => {
    setValue('search', '');
    setValue('priority', '');
    setValue('dueDateStart', '');
    setValue('dueDateEnd', '');
    if (onSubmit) onSubmit({ search: '', priority: '', dueDateStart: '', dueDateEnd: '' });
  };

  return (
    <FormContainer onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        {...register('search')}
        placeholder="Buscar por título o descripción"
        style={{ minWidth: 180 }}
      />
      <Select {...register('priority')}>
        {priorities.map(p => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </Select>
      <Input
        type="date"
        {...register('dueDateStart')}
        title="Fecha inicio"
      />
      <span style={{ margin: '0 4px' }}>-</span>
      <Input
        type="date"
        {...register('dueDateEnd')}
        title="Fecha fin"
      />
      <Button type="submit" style={{ marginLeft: 8, padding: '6px 14px', borderRadius: 4, border: 'none', background: '#4b7bec', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
        Filtrar
      </Button>
      {isFiltered && (
        <Button type="button" onClick={handleClear} style={{ marginLeft: 8, padding: '6px 14px', borderRadius: 4, border: 'none', background: '#aaa', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
          Limpiar
        </Button>
      )}
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
`;

export default TaskFormFilter;