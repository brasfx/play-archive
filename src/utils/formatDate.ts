export function FormatDate(date: string | Date) {
  return new Intl.DateTimeFormat('pt-br', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function FormatYear(date: string | Date) {
  return new Intl.DateTimeFormat('pt-br', {
    year: 'numeric',
  }).format(new Date(date));
}
