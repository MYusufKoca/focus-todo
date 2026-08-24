import Header from './components/layout/Header.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import TodoFilters from './components/todo/TodoFilters.jsx'
import TodoList from './components/todo/TodoList.jsx'

export default function App() {
  return (
    <div className="min-h-screen lg:flex"><Sidebar /><div className="min-w-0 flex-1"><Header /><main id="main-content" className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-10">
      <div className="mb-7"><p className="text-sm font-medium text-forest">Odak alanın</p><div className="mt-1 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Tüm görevler</h2><p className="mt-2 text-sm text-slate-500">Planını sade tut, önemli olana yer aç.</p></div><div className="hidden rounded-xl bg-white px-4 py-2 text-right shadow-sm sm:block"><p className="text-2xl font-bold text-forest">0</p><p className="text-xs text-slate-500">aktif görev</p></div></div></div>
      <TodoFilters /><TodoList />
    </main></div></div>
  )
}
