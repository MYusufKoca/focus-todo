import { useCallback, useState } from 'react'
import Header from './components/layout/Header.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import TodoForm from './components/todo/TodoForm.jsx'
import TodoFilters from './components/todo/TodoFilters.jsx'
import TodoList from './components/todo/TodoList.jsx'
import Modal from './components/ui/Modal.jsx'

export default function App() {
  const [todos, setTodos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  const addTodo = (todoFields) => {
    const now = new Date().toISOString()
    setTodos((current) => [{ id: crypto.randomUUID(), ...todoFields, completed: false, createdAt: now, updatedAt: null }, ...current])
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

  return (
    <><div className="min-h-screen lg:flex"><Sidebar /><div className="min-w-0 flex-1"><Header onNewTodo={openModal} /><main id="main-content" className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-10">
      <div className="mb-7"><p className="text-sm font-medium text-forest">Odak alanın</p><div className="mt-1 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Tüm görevler</h2><p className="mt-2 text-sm text-slate-500">Planını sade tut, önemli olana yer aç.</p></div><div className="hidden rounded-xl bg-white px-4 py-2 text-right shadow-sm sm:block"><p className="text-2xl font-bold text-forest">{activeTodoCount}</p><p className="text-xs text-slate-500">aktif görev</p></div></div></div>
      <TodoFilters /><TodoList todos={todos} onNewTodo={openModal} onToggle={toggleTodo} onDelete={deleteTodo} />
    </main></div></div><Modal isOpen={isModalOpen} title="Yeni görev oluştur" onClose={closeModal}><TodoForm onSubmit={addTodo} onCancel={closeModal} /></Modal></>
  )
}
