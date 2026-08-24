export function formatDisplayDate(date = new Date()) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' }).format(date)
}

export function formatDueDate(dateString) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${dateString}T00:00:00`))
}
