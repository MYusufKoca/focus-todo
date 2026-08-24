export default function TodoItem({ title, category, dueDate }) {
  return <li className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="size-5 rounded-full border-2 border-slate-300" aria-hidden="true" /><div className="min-w-0 flex-1"><p className="truncate font-medium text-ink">{title}</p><p className="mt-1 text-xs text-slate-500">{category} · {dueDate}</p></div></li>
}
