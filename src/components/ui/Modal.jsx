import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, title, children, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const returnTarget = returnFocusRef?.current ?? document.activeElement
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => {
      const initialFocus = dialogRef.current?.querySelector('[autofocus]')
        ?? dialogRef.current?.querySelector('input, textarea, select')
        ?? dialogRef.current?.querySelector('button')
      initialFocus?.focus()
    })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return

      const focusableElements = [...(dialogRef.current?.querySelectorAll('button, input, textarea, select, [href], [tabindex]:not([tabindex="-1"])') ?? [])]
        .filter((element) => !element.disabled && element.getAttribute('aria-hidden') !== 'true')
      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
      returnTarget?.focus()
    }
  }, [isOpen, onClose, returnFocusRef])

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#18241e] dark:text-slate-100 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4"><h2 id="modal-title" className="text-lg font-bold">{title}</h2><button type="button" onClick={onClose} aria-label="Pencereyi kapat" className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest dark:text-slate-300 dark:hover:bg-slate-700">×</button></div>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  )
}
