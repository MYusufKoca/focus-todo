export function formatDisplayDate(date = new Date()) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' }).format(date)
}

export function formatDueDate(dateString) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${dateString}T00:00:00`))
}

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDueDateStatus(todo, today = new Date()) {
  if (!todo.dueDate) return { type: 'none', label: '' }

  const todayKey = getLocalDateKey(today)
  if (!todo.completed && todo.dueDate < todayKey) return { type: 'overdue', label: 'Süresi geçti' }
  if (todo.dueDate === todayKey) return { type: 'today', label: 'Bugün' }
  return { type: 'upcoming', label: formatDueDate(todo.dueDate) }
}

export function isTodoOverdue(todo, today = new Date()) {
  return getDueDateStatus(todo, today).type === 'overdue'
}
