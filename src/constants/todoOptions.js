export const categories = [
  { id: 'all', label: 'Tüm görevler', icon: '⌂', count: 0 },
  { id: 'today', label: 'Bugün', icon: '☀', count: 0 },
  { id: 'upcoming', label: 'Yaklaşan', icon: '◷', count: 0 },
  { id: 'completed', label: 'Tamamlanan', icon: '✓', count: 0 },
]

export const filterOptions = [
  { value: 'all', label: 'Tüm durumlar' },
  { value: 'active', label: 'Aktif' },
  { value: 'completed', label: 'Tamamlanan' },
]

export const categoryOptions = [
  { value: 'personal', label: 'Kişisel' },
  { value: 'work', label: 'İş' },
  { value: 'education', label: 'Eğitim' },
]

export const priorityOptions = [
  { value: 'low', label: 'Düşük' },
  { value: 'medium', label: 'Orta' },
  { value: 'high', label: 'Yüksek' },
]
