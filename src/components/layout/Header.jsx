import Button from '../ui/Button.jsx'

export default function Header({ onNewTodo, theme, onToggleTheme }) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/80 px-5 py-4 backdrop-blur dark:border-slate-700/80 dark:bg-[#16211b]/90 md:px-8">
      <div className="min-w-0"><p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-forest dark:text-emerald-300">24 Ağustos, Pazartesi</p><h1 className="mt-1 truncate text-xl font-bold tracking-tight text-ink dark:text-white sm:text-2xl">Günaydın 👋</h1></div>
      <div className="flex shrink-0 items-center gap-2"><button type="button" onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'} className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-slate-700"><span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span></button><Button className="shrink-0" onClick={onNewTodo}><span aria-hidden="true" className="text-lg leading-none">＋</span><span className="hidden sm:inline">Yeni Görev</span></Button></div>
    </header>
  )
}
