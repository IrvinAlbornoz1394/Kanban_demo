import { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Button, Input, Select } from '../../styles/components.styles';
import { useSearchParams } from 'react-router-dom';
import { PREDEFINED_RANGES, getRangeDates } from '../../utils/filterRanges';

export function FilterForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialRange = searchParams.get('dateRange') || 'last7days';
  const initialDates = getRangeDates(initialRange);

  const [workspaceId, setWorkspaceId] = useState(searchParams.get('workspaceId') || '');
  const [boardId, setBoardId] = useState(searchParams.get('boardId') || '');
  const [dateStart, setDateStart] = useState(searchParams.get('dateStart') || initialDates.start);
  const [dateEnd, setDateEnd] = useState(searchParams.get('dateEnd') || initialDates.end);
  const [dateRange, setDateRange] = useState(initialRange);

  const workspaces = useAppSelector(state => state.workspaces);
  const boards = useAppSelector(state => state.boards);

  const filteredBoards = workspaceId
    ? boards.filter(b => b.workspaceId === workspaceId)
    : boards;

  useEffect(() => {
    setWorkspaceId(searchParams.get('workspaceId') || '');
    setBoardId(searchParams.get('boardId') || '');
    setDateRange(searchParams.get('dateRange') || initialRange);
    setDateStart(searchParams.get('dateStart') || getRangeDates(dateRange).start);
    setDateEnd(searchParams.get('dateEnd') || getRangeDates(dateRange).end);
    // eslint-disable-next-line
  }, [searchParams]);

  function handleRangeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const range = e.target.value;
    setDateRange(range);
    const { start, end } = getRangeDates(range);
    setDateStart(start);
    setDateEnd(end);
  }

  function handleDateStartChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDateStart(value);
  }

  function handleDateEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDateEnd(value);
  }

  // Determina si el rango es personalizado
  const isCustom =
    !PREDEFINED_RANGES.some(r => {
      const { start: s, end: e } = getRangeDates(r.value);
      return s === dateStart && e === dateEnd;
    });

  // El valor que se muestra en el select
  const dateRangeDisplay = isCustom ? 'custom' : dateRange;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (workspaceId) params.workspaceId = workspaceId;
    if (boardId) params.boardId = boardId;
    if (dateStart) params.dateStart = dateStart;
    if (dateEnd) params.dateEnd = dateEnd;
    if (!isCustom && dateRange) params.dateRange = dateRange;
    setSearchParams(params);
  }

  function handleClear() {
    setWorkspaceId('');
    setBoardId('');
    setDateStart(initialDates.start);
    setDateEnd(initialDates.end);
    setDateRange('last7days');
    setSearchParams({});
  }

  const showClear = Boolean(
    searchParams.get('workspaceId') ||
    searchParams.get('boardId') ||
    searchParams.get('dateStart') ||
    searchParams.get('dateEnd')
  );

  return (
    <form style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }} onSubmit={handleSubmit}>
      <Select value={workspaceId} onChange={e => setWorkspaceId(e.target.value)} style={{ minWidth: 180 }}>
        <option value="">Todos los workspaces</option>
        {workspaces.map(ws => (
          <option key={ws.id} value={ws.id}>{ws.name}</option>
        ))}
      </Select>
      <Select value={boardId} onChange={e => setBoardId(e.target.value)} style={{ minWidth: 180 }}>
        <option value="">Todos los boards</option>
        {filteredBoards.map(b => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </Select>
      <Select value={dateRangeDisplay} onChange={handleRangeChange} style={{ minWidth: 140 }}>
        {PREDEFINED_RANGES.map(r => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
        {isCustom && (
          <option value="custom" disabled>
            Personalizado
          </option>
        )}
      </Select>
      <Input type="date" value={dateStart} onChange={handleDateStartChange} />
      <span>-</span>
      <Input type="date" value={dateEnd} onChange={handleDateEndChange} />
      <Button type="submit">Filtrar</Button>
      {showClear && (
        <Button type="button" onClick={handleClear} variant="outline">
          Limpiar
        </Button>
      )}
    </form>
  );
}