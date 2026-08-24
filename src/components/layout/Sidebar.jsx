import { categories } from '../../constants/todoOptions.js'

export default function Sidebar({ todos }) {
  const today = new Date().toISOString().slice(0, 10)
  const counts = {
    all: todos.length,
    today: todos.filter((todo) => todo.dueDate === today).length,
    upcoming: todos.filter((todo) => todo.dueDate && todo.dueDate > today && !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  }

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white px-5 py-7 lg:flex lg:flex-col">
      <a href="#main-content" className="flex items-center gap-3 px-2" aria-label="Focus ana sayfa"><span className="grid size-10 place-items-center rounded-xl bg-forest text-xl text-white">✓</span><span className="text-xl font-extrabold tracking-tight">focus</span></a>
      <nav className="mt-10" aria-label="Görev kategorileri"><p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Görevler</p><ul className="mt-3 space-y-1">
        {categories.map((category, index) => <li key={category.id}><button type="button" className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${index === 0 ? 'bg-mint text-forest' : 'text-slate-600 hover:bg-slate-50'}`}><span aria-hidden="true" className="w-5 text-center text-base">{category.icon}</span><span className="flex-1">{category.label}</span><span className="text-xs tabular-nums text-slate-400">{counts[category.id]}</span></button></li>)}
      </ul></nav>
      <div className="mt-auto rounded-2xl bg-[#f2eee4] p-4"><p className="text-sm font-semibold text-slate-800">Küçük adımlar, büyük ilerleme.</p><p className="mt-1 text-xs leading-5 text-slate-500">Bugünün en önemli işine odaklan.</p></div>
    </aside>
  )
}
