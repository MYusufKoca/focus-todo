import { categoryOptions, priorityOptions } from '../../constants/todoOptions.js'
import { getDueDateStatus } from '../../utils/dateHelpers.js'

const priorityStyles = {
  low: 'border border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300',
  medium: 'border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300',
  high: 'border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
}

const dueDateStyles = {
  overdue: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  today: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
  upcoming: 'text-slate-500 dark:text-slate-400',
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const category = categoryOptions.find((option) => option.value === todo.category)?.label
  const priority = priorityOptions.find((option) => option.value === todo.priority)?.label
  const dueDateStatus = getDueDateStatus(todo)

  return (
    <li className={`overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition dark:bg-[#18241e] sm:p-5 ${todo.completed ? 'border-slate-200/70 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60' : 'border-slate-200 hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:hover:border-slate-600'}`}>
      <div className="flex items-start gap-3 sm:gap-4">
        <button type="button" onClick={() => onToggle(todo.id)} aria-label={todo.completed ? `${todo.title} görevini aktif olarak işaretle` : `${todo.title} görevini tamamlandı olarak işaretle`} aria-pressed={todo.completed} className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${todo.completed ? 'border-forest bg-forest text-white' : 'border-slate-300 text-transparent hover:border-forest'}`}>✓</button>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><p className={`break-words font-semibold text-ink dark:text-slate-100 ${todo.completed ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>{todo.title}</p><div className="flex shrink-0 items-center gap-1 self-end sm:self-auto"><button type="button" onClick={(event) => onEdit(todo, event.currentTarget)} aria-label={`${todo.title} görevini düzenle`} className="rounded-lg px-2 py-1 text-sm font-medium text-slate-400 transition hover:bg-mint hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest dark:hover:bg-slate-700 dark:hover:text-emerald-300">Düzenle</button><button type="button" onClick={() => onDelete(todo.id)} aria-label={`${todo.title} görevini sil`} className="rounded-lg px-2 py-1 text-sm font-medium text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-red-950 dark:hover:text-red-300">Sil</button></div></div>
          {todo.description && <p className={`mt-1.5 break-words text-sm leading-6 text-slate-500 dark:text-slate-400 ${todo.completed ? 'line-through' : ''}`}>{todo.description}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs"><span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-200">{category}</span><span className={`rounded-full px-2.5 py-1 font-semibold ${priorityStyles[todo.priority]}`}>{priority} öncelik</span>{dueDateStatus.type !== 'none' && <span className={`rounded-full px-2.5 py-1 font-semibold ${dueDateStyles[dueDateStatus.type]}`}>{dueDateStatus.label}</span>}</div>
        </div>
      </div>
    </li>
  )
}
