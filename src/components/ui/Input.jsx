export default function Input({ label, id, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor={id}>{label}</label>}
      <input id={id} className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-forest focus:ring-3 focus:ring-mint ${className}`} {...props} />
    </div>
  )
}
