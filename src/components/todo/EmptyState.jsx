import Button from '../ui/Button.jsx'

export default function EmptyState({ onNewTodo }) {
  return (
    <section className="mt-6 grid min-h-96 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="max-w-sm"><div className="mx-auto grid size-20 place-items-center rounded-3xl bg-mint text-4xl text-forest" aria-hidden="true">✓</div><h2 className="mt-6 text-xl font-bold tracking-tight text-ink">Henüz görev yok</h2><p className="mt-2 text-sm leading-6 text-slate-500">Bugün için ilk görevini oluştur ve yapacaklarını adım adım tamamlamaya başla.</p><Button className="mt-6" onClick={onNewTodo}><span aria-hidden="true">＋</span>Yeni görev oluştur</Button></div>
    </section>
  )
}

export function NoFilterResults({ onClearFilters }) {
  return (
    <section className="mt-6 grid min-h-80 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="max-w-sm"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-slate-100 text-3xl text-slate-500" aria-hidden="true">⌕</div><h2 className="mt-5 text-xl font-bold tracking-tight text-ink">Filtrelere uygun görev bulunamadı</h2><p className="mt-2 text-sm leading-6 text-slate-500">Arama metnini veya seçili filtreleri değiştirerek tekrar deneyebilirsin.</p><Button variant="secondary" className="mt-5" onClick={onClearFilters}>Filtreleri temizle</Button></div>
    </section>
  )
}
