export default function Input({ label, id, className = '', error, ...props }) {
  return (
    <div className="w-full">
      {label && <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor={id}>{label}</label>}
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-3 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-forest focus:ring-mint dark:border-slate-600'} ${className}`} {...props} />
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  )
}
