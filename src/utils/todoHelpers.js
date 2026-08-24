import { isValidDueDate } from './dateHelpers.js'

export const initialFilters = {
  search: '',
  status: 'all',
  category: 'all',
  priority: 'all',
}

function normalizeSearchText(value) {
  return String(value ?? '')
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

export function filterTodos(todos, filters) {
  const searchTerm = normalizeSearchText(filters.search)

  return todos.filter((todo) => {
    const searchableText = normalizeSearchText(`${todo.title} ${todo.description}`)
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
    const firstDueDate = isValidDueDate(first.dueDate) ? first.dueDate : ''
    const secondDueDate = isValidDueDate(second.dueDate) ? second.dueDate : ''
    if (!firstDueDate && secondDueDate) return 1
    if (firstDueDate && !secondDueDate) return -1
    if (firstDueDate !== secondDueDate) return firstDueDate.localeCompare(secondDueDate)
    return (second.createdAt ?? '').localeCompare(first.createdAt ?? '')
  })
}

export function normalizeTodos(value, fallback = []) {
  if (!Array.isArray(value)) return fallback

  return value
    .filter((todo) => todo && typeof todo.id === 'string' && typeof todo.title === 'string')
    .map((todo) => ({
      ...todo,
      description: typeof todo.description === 'string' ? todo.description : '',
      category: ['personal', 'work', 'education'].includes(todo.category) ? todo.category : 'personal',
      priority: ['low', 'medium', 'high'].includes(todo.priority) ? todo.priority : 'medium',
      dueDate: isValidDueDate(todo.dueDate) ? todo.dueDate : '',
      completed: Boolean(todo.completed),
      createdAt: typeof todo.createdAt === 'string' ? todo.createdAt : '',
      updatedAt: typeof todo.updatedAt === 'string' ? todo.updatedAt : null,
    }))
}
