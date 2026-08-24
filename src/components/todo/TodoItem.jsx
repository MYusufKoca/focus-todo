import { categoryOptions, priorityOptions } from '../../constants/todoOptions.js'
import { formatDueDate } from '../../utils/dateHelpers.js'

const priorityStyles = {
  low: 'bg-sky-50 text-sky-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-red-50 text-red-700',
}

export default function TodoItem({ todo, onToggle, onDelete }) {
  const category = categoryOptions.find((option) => option.value === todo.category)?.label
  const priority = priorityOptions.find((option) => option.value === todo.priority)?.label

  return (
    <li className={`rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 ${todo.completed ? 'border-slate-200/70 opacity-70' : 'border-slate-200 hover:border-slate-300'}`}>
      <div className="flex items-start gap-3 sm:gap-4">
        <button type="button" onClick={() => onToggle(todo.id)} aria-label={todo.completed ? `${todo.title} görevini aktif olarak işaretle` : `${todo.title} görevini tamamlandı olarak işaretle`} aria-pressed={todo.completed} className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${todo.completed ? 'border-forest bg-forest text-white' : 'border-slate-300 text-transparent hover:border-forest'}`}>✓</button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3"><p className={`font-semibold text-ink ${todo.completed ? 'line-through' : ''}`}>{todo.title}</p><button type="button" onClick={() => onDelete(todo.id)} aria-label={`${todo.title} görevini sil`} className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">Sil</button></div>
          {todo.description && <p className={`mt-1.5 text-sm leading-6 text-slate-500 ${todo.completed ? 'line-through' : ''}`}>{todo.description}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs"><span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">{category}</span><span className={`rounded-full px-2.5 py-1 font-medium ${priorityStyles[todo.priority]}`}>{priority} öncelik</span>{todo.dueDate && <span className="text-slate-500">Son tarih: {formatDueDate(todo.dueDate)}</span>}</div>
        </div>
      </div>
    </li>
  )
}
