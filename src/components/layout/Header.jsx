import Button from '../ui/Button.jsx'

export default function Header({ onNewTodo }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white/80 px-5 py-4 backdrop-blur md:px-8">
      <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">24 Ağustos, Pazartesi</p><h1 className="mt-1 text-xl font-bold tracking-tight text-ink sm:text-2xl">Günaydın 👋</h1></div>
      <Button className="shrink-0" onClick={onNewTodo}><span aria-hidden="true" className="text-lg leading-none">＋</span><span className="hidden sm:inline">Yeni Görev</span></Button>
    </header>
  )
}
