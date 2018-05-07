
export function getMonthString(month: number) {
  const monthInt = (typeof month === 'string') ? parseInt(month, 10) : month;

  switch (monthInt) {
    case 1: return 'Janeiro';
    case 2: return 'Fevereiro';
    case 3: return 'Março';
    case 4: return 'Abril';
    case 5: return 'Maio';
    case 6: return 'Junho';
    case 7: return 'Julho';
    case 8: return 'Agosto';
    case 9: return 'Setembro';
    case 10: return 'Outubro';
    case 11: return 'Novembro';
    case 12: return 'Dezembro';
    default: return 'Not found';
  }
}

export function getShortMonthString(month: number) {
  return getMonthString(month).substr(0, 3);
}

export function getWeekDayString(day) {
  const dayInt = (typeof day === 'string') ? parseInt(day, 10) : day;

  switch (dayInt) {
    case 0: return 'Domingo';
    case 1: return 'Segunda';
    case 2: return 'Terça';
    case 3: return 'Quarta';
    case 4: return 'Quinta';
    case 5: return 'Sexta';
    case 6: return 'Sábado';
  }
}

export function getShortWeekDatString(day) {
  return getWeekDayString(day).substr(0, 3);
}

export function getStringDate(date) {
  return (date instanceof Date) ? date.toISOString().substring(0, 10) : date;
}
