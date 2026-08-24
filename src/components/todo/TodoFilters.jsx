import { categoryOptions, filterOptions, priorityOptions } from '../../constants/todoOptions.js'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'

const selectClassName = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 outline-none focus:border-forest focus:ring-3 focus:ring-mint'

export default function TodoFilters({ filters, onFilterChange, onClearFilters, showClearButton }) {
  const updateFilter = (event) => onFilterChange(event.target.name, event.target.value)

  return (
    <section aria-label="Görevleri ara ve filtrele">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
        <button type="button" onClick={() => onFilterChange('category', 'all')} aria-pressed={filters.category === 'all'} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${filters.category === 'all' ? 'bg-forest text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>Tümü</button>
        {categoryOptions.map((option) => <button key={option.value} type="button" onClick={() => onFilterChange('category', option.value)} aria-pressed={filters.category === option.value} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${filters.category === option.value ? 'bg-forest text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>{option.label}</button>)}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:grid-cols-[minmax(220px,1fr)_repeat(3,minmax(130px,160px))]">
        <div className="relative sm:col-span-2 lg:col-span-1"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">⌕</span><Input id="task-search" name="search" type="search" aria-label="Görevlerde ara" placeholder="Görevlerde ara..." className="pl-11" value={filters.search} onChange={updateFilter} /></div>
        <div><label htmlFor="status-filter" className="sr-only">Duruma göre filtrele</label><select id="status-filter" name="status" value={filters.status} onChange={updateFilter} className={selectClassName}>{filterOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
        <div><label htmlFor="category-filter" className="sr-only">Kategoriye göre filtrele</label><select id="category-filter" name="category" value={filters.category} onChange={updateFilter} className={selectClassName}><option value="all">Tüm kategoriler</option>{categoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
        <div><label htmlFor="priority-filter" className="sr-only">Önceliğe göre filtrele</label><select id="priority-filter" name="priority" value={filters.priority} onChange={updateFilter} className={selectClassName}><option value="all">Tüm öncelikler</option>{priorityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
      </div>
      {showClearButton && <div className="mt-3 flex justify-end"><Button variant="secondary" className="px-3 py-2" onClick={onClearFilters}>Filtreleri temizle</Button></div>}
    </section>
  )
}
