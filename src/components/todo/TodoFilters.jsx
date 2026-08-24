import { categories, filterOptions } from '../../constants/todoOptions.js'
import Input from '../ui/Input.jsx'

export default function TodoFilters() {
  return (
    <section aria-label="Görevleri ara ve filtrele">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">{categories.map((category, index) => <button key={category.id} type="button" className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${index === 0 ? 'bg-forest text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>{category.label}</button>)}</div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-0">
        <div className="relative flex-1"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">⌕</span><Input id="task-search" type="search" aria-label="Görevlerde ara" placeholder="Görevlerde ara..." className="pl-11" /></div>
        <div><label htmlFor="status-filter" className="sr-only">Duruma göre filtrele</label><select id="status-filter" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 outline-none focus:border-forest focus:ring-3 focus:ring-mint sm:w-44">{filterOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
      </div>
    </section>
  )
}
