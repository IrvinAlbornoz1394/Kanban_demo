import { Button } from '../../styles/components.styles';
import { Modal } from '../ui/Modal/Modal'

interface DeleteColumnProps {
  selectedColumn: string;
  setSelectedColumn: (columnId: string) => void;
  setDeleteOpen: (open: boolean) => void;
  activeTasks: any[];
  destinationColumns: any[];
  handleConfirmDelete: () => void;
}

const DeleteColumn = ({ selectedColumn, setSelectedColumn, setDeleteOpen, activeTasks, destinationColumns, handleConfirmDelete }: DeleteColumnProps) => {
  return (
    <Modal onClose={() => setDeleteOpen(false)}>
        <h3>¿Eliminar esta columna?</h3>
        {activeTasks.length > 0 ? (
        <>
            <p>La columna tiene tareas. ¿Qué deseas hacer con ellas?</p>
            <select
            value={selectedColumn}
            onChange={e => setSelectedColumn(e.target.value)}
            style={{ width: '100%', marginBottom: 12 }}
            >
            <option value="">Eliminar todas las tareas</option>
            {destinationColumns.map(col => (
                <option key={col.id} value={col.id}>
                Mover a: {col.title}
                </option>
            ))}
            </select>
        </>
        ) : (
        <p>Esta acción no se puede deshacer.</p>
        )}
        <Button style={{ color: 'red' }} onClick={handleConfirmDelete}>
        Eliminar columna
        </Button>
        <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
    </Modal>
  )
}

export default DeleteColumn