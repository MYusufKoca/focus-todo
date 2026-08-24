import { useCallback, useMemo, useState } from 'react'
import Header from './components/layout/Header.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import TodoForm from './components/todo/TodoForm.jsx'
import TodoFilters from './components/todo/TodoFilters.jsx'
import TodoList from './components/todo/TodoList.jsx'
import Modal from './components/ui/Modal.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { filterTodos, hasActiveFilters, initialFilters } from './utils/todoHelpers.js'

export default function App() {
  const [todos, setTodos] = useLocalStorage('focus-todo-tasks', [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [filters, setFilters] = useState(initialFilters)

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
  }

  const updateTodo = (todoFields) => {
    setTodos((current) => current.map((todo) => todo.id === editingTodo.id ? { ...todo, ...todoFields, updatedAt: new Date().toISOString() } : todo))
    closeModal()
  }

  const toggleTodo = (id) => {
    setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() } : todo))
  }

  const deleteTodo = (id) => {
    const todo = todos.find((item) => item.id === id)
    if (todo && window.confirm(`“${todo.title}” görevini silmek istediğinize emin misiniz?`)) {
      setTodos((current) => current.filter((item) => item.id !== id))
    }
  }

  const activeTodoCount = todos.filter((todo) => !todo.completed).length
  const filteredTodos = useMemo(() => filterTodos(todos, filters), [todos, filters])
  const filtersAreActive = hasActiveFilters(filters)
  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))
  const clearFilters = () => setFilters(initialFilters)

  return (
    <><div className="min-h-screen lg:flex"><Sidebar todos={todos} /><div className="min-w-0 flex-1"><Header onNewTodo={openCreateModal} /><main id="main-content" className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-10">
      <div className="mb-7"><p className="text-sm font-medium text-forest">Odak alanın</p><div className="mt-1 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Tüm görevler</h2><p className="mt-2 text-sm text-slate-500">Planını sade tut, önemli olana yer aç.</p></div><div className="hidden rounded-xl bg-white px-4 py-2 text-right shadow-sm sm:block"><p className="text-2xl font-bold text-forest">{activeTodoCount}</p><p className="text-xs text-slate-500">aktif görev</p></div></div></div>
      <TodoFilters filters={filters} onFilterChange={updateFilter} onClearFilters={clearFilters} showClearButton={filtersAreActive} /><TodoList todos={filteredTodos} hasTodos={todos.length > 0} onNewTodo={openCreateModal} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={openEditModal} onClearFilters={clearFilters} />
    </main></div></div><Modal isOpen={isModalOpen} title={editingTodo ? 'Görevi düzenle' : 'Yeni görev oluştur'} onClose={closeModal}><TodoForm key={editingTodo?.id ?? 'new'} mode={editingTodo ? 'edit' : 'create'} initialValues={editingTodo} onSubmit={editingTodo ? updateTodo : addTodo} onCancel={closeModal} /></Modal></>
  )
}
