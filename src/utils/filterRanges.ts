import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, subWeeks } from 'date-fns';

export const PREDEFINED_RANGES = [
  { label: 'Últimos 7 días', value: 'last7days' },
  { label: 'Hoy', value: 'today' },
  { label: 'Esta semana', value: 'thisweek' },
  { label: 'Semana pasada', value: 'lastweek' },
  { label: 'Este mes', value: 'thismonth' },
];

export function getRangeDates(range: string) {
  const today = new Date();
  switch (range) {
    case 'last7days':
      return { start: format(subDays(today, 6), 'yyyy-MM-dd'), end: format(today, 'yyyy-MM-dd') };
    case 'today':
      return { start: format(today, 'yyyy-MM-dd'), end: format(today, 'yyyy-MM-dd') };
    case 'thisweek':
      return { start: format(startOfWeek(today, { weekStartsOn: 1 }), 'yyyy-MM-dd'), end: format(endOfWeek(today, { weekStartsOn: 1 }), 'yyyy-MM-dd') };
    case 'lastweek': {
      const lastWeekStart = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
      const lastWeekEnd = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
      return { start: format(lastWeekStart, 'yyyy-MM-dd'), end: format(lastWeekEnd, 'yyyy-MM-dd') };
    }
    case 'thismonth':
      return { start: format(startOfMonth(today), 'yyyy-MM-dd'), end: format(endOfMonth(today), 'yyyy-MM-dd') };
    default:
      return { start: '', end: '' };
  }
}