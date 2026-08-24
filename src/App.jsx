import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/layout/Header.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import TodoForm from './components/todo/TodoForm.jsx'
import TodoFilters from './components/todo/TodoFilters.jsx'
import TodoList from './components/todo/TodoList.jsx'
import Modal from './components/ui/Modal.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { isTodoOverdue } from './utils/dateHelpers.js'
import { filterTodos, hasActiveFilters, initialFilters, sortTodos } from './utils/todoHelpers.js'

export default function App() {
  const [todos, setTodos] = useLocalStorage('focus-todo-tasks', [])
  const [theme, setTheme] = useLocalStorage('focus-todo-theme', () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [filters, setFilters] = useState(initialFilters)
  const [notification, setNotification] = useState('')
  const notificationTimer = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => () => window.clearTimeout(notificationTimer.current), [])

  const showNotification = (message) => {
    window.clearTimeout(notificationTimer.current)
    setNotification(message)
    notificationTimer.current = window.setTimeout(() => setNotification(''), 2800)
  }

  const openCreateModal = () => {
    setEditingTodo(null)
    setIsModalOpen(true)
  }
  const openEditModal = (todo) => {
    setEditingTodo(todo)
    setIsModalOpen(true)
  }
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setEditingTodo(null)
  }, [])

  const addTodo = (todoFields) => {
    const now = new Date().toISOString()
    setTodos((current) => [{ id: crypto.randomUUID(), ...todoFields, completed: false, createdAt: now, updatedAt: null }, ...current])
    closeModal()
    showNotification('Görev başarıyla eklendi.')
  }

  const updateTodo = (todoFields) => {
    setTodos((current) => current.map((todo) => todo.id === editingTodo.id ? { ...todo, ...todoFields, updatedAt: new Date().toISOString() } : todo))
    closeModal()
    showNotification('Görev başarıyla güncellendi.')
  }

  const toggleTodo = (id) => {
    setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() } : todo))
  }

  const deleteTodo = (id) => {
    const todo = todos.find((item) => item.id === id)
    if (todo && window.confirm(`“${todo.title}” görevini silmek istediğinize emin misiniz?`)) {
      setTodos((current) => current.filter((item) => item.id !== id))
      showNotification('Görev silindi.')
    }
  }

  const activeTodoCount = todos.filter((todo) => !todo.completed).length
  const completedTodoCount = todos.filter((todo) => todo.completed).length
  const overdueTodoCount = todos.filter((todo) => isTodoOverdue(todo)).length
  const filteredTodos = useMemo(() => sortTodos(filterTodos(todos, filters)), [todos, filters])
  const filtersAreActive = hasActiveFilters(filters)
  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))
  const clearFilters = () => setFilters(initialFilters)
  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')
  const stats = [
    { label: 'Toplam görev', value: todos.length, accent: 'text-slate-700 dark:text-slate-100' },
    { label: 'Aktif görev', value: activeTodoCount, accent: 'text-forest dark:text-emerald-300' },
    { label: 'Tamamlanan', value: completedTodoCount, accent: 'text-sky-700 dark:text-sky-300' },
    { label: 'Süresi geçen', value: overdueTodoCount, accent: 'text-red-600 dark:text-red-300' },
  ]

  return (
    <><div className="min-h-screen overflow-x-hidden lg:flex"><Sidebar todos={todos} /><div className="min-w-0 flex-1"><Header onNewTodo={openCreateModal} theme={theme} onToggleTheme={toggleTheme} /><main id="main-content" className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-10">
      <div className="mb-7"><p className="text-sm font-medium text-forest dark:text-emerald-300">Odak alanın</p><div className="mt-1"><h2 className="text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">Tüm görevler</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Planını sade tut, önemli olana yer aç.</p></div></div>
      <section aria-label="Görev istatistikleri" className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">{stats.map((stat) => <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-[#18241e]"><p className={`text-2xl font-extrabold tabular-nums ${stat.accent}`}>{stat.value}</p><p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p></div>)}</section>
      <TodoFilters filters={filters} onFilterChange={updateFilter} onClearFilters={clearFilters} showClearButton={filtersAreActive} /><TodoList todos={filteredTodos} hasTodos={todos.length > 0} onNewTodo={openCreateModal} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={openEditModal} onClearFilters={clearFilters} />
    </main></div></div><div className="pointer-events-none fixed inset-x-4 bottom-5 z-[60] flex justify-center" aria-live="polite" aria-atomic="true"><div role="status" className={`rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl transition dark:bg-emerald-100 dark:text-emerald-950 ${notification ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>{notification}</div></div><Modal isOpen={isModalOpen} title={editingTodo ? 'Görevi düzenle' : 'Yeni görev oluştur'} onClose={closeModal}><TodoForm key={editingTodo?.id ?? 'new'} mode={editingTodo ? 'edit' : 'create'} initialValues={editingTodo} onSubmit={editingTodo ? updateTodo : addTodo} onCancel={closeModal} /></Modal></>
  )
}
