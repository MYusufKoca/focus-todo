const variants = {
  primary: 'bg-forest text-white shadow-sm hover:bg-[#194a37] focus-visible:ring-forest',
  secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
}

export default function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  return <button type={type} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${className}`} {...props}>{children}</button>
}
