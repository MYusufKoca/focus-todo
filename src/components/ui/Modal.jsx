export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4" role="presentation" onMouseDown={onClose}>
      <section className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4"><h2 id="modal-title" className="text-lg font-bold">{title}</h2><button type="button" onClick={onClose} aria-label="Pencereyi kapat" className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100">×</button></div>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  )
}
