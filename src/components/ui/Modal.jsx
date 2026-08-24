import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, title, children, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm" role="presentation" onMouseDown={onClose}>
      <section className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#18241e] dark:text-slate-100 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4"><h2 id="modal-title" className="text-lg font-bold">{title}</h2><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Pencereyi kapat" className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest dark:text-slate-300 dark:hover:bg-slate-700">×</button></div>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  )
}
