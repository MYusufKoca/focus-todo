export function formatDisplayDate(date = new Date()) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' }).format(date)
}
