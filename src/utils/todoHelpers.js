export const initialFilters = {
  search: '',
  status: 'all',
  category: 'all',
  priority: 'all',
}

export function filterTodos(todos, filters) {
  const searchTerm = filters.search.trim().toLocaleLowerCase('tr-TR')

  return todos.filter((todo) => {
    const searchableText = `${todo.title} ${todo.description}`.toLocaleLowerCase('tr-TR')
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm)
    const matchesStatus = filters.status === 'all'
      || (filters.status === 'completed' && todo.completed)
      || (filters.status === 'active' && !todo.completed)
    const matchesCategory = filters.category === 'all' || todo.category === filters.category
    const matchesPriority = filters.priority === 'all' || todo.priority === filters.priority

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })
}

export function hasActiveFilters(filters) {
  return filters.search.trim() !== ''
    || filters.status !== 'all'
    || filters.category !== 'all'
    || filters.priority !== 'all'
}

export function sortTodos(todos) {
  return [...todos].sort((first, second) => {
    if (first.completed !== second.completed) return Number(first.completed) - Number(second.completed)
    if (!first.dueDate && second.dueDate) return 1
    if (first.dueDate && !second.dueDate) return -1
    if (first.dueDate !== second.dueDate) return first.dueDate.localeCompare(second.dueDate)
    return (second.createdAt ?? '').localeCompare(first.createdAt ?? '')
  })
}
