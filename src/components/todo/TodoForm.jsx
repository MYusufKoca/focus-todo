import { useState } from 'react'
import { categoryOptions, priorityOptions } from '../../constants/todoOptions.js'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'

const initialForm = {
  title: '',
  description: '',
  category: 'personal',
  priority: 'medium',
  dueDate: '',
}

const fieldClassName = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-forest focus:ring-3 focus:ring-mint'

export default function TodoForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm)
  const [titleError, setTitleError] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (name === 'title' && value.trim()) setTitleError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTitle = form.title.trim()

    if (!trimmedTitle) {
      setTitleError('Başlık alanı boş bırakılamaz.')
      return
    }

    onSubmit({ ...form, title: trimmedTitle, description: form.description.trim() })
    setForm(initialForm)
    setTitleError('')
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <Input id="todo-title" name="title" label="Başlık" value={form.title} onChange={updateField} maxLength={100} required autoFocus placeholder="Örn. Haftalık planı hazırla" error={titleError} />
      <div><label htmlFor="todo-description" className="mb-1.5 block text-sm font-medium text-slate-700">Açıklama <span className="font-normal text-slate-400">(isteğe bağlı)</span></label><textarea id="todo-description" name="description" rows="3" value={form.description} onChange={updateField} className={`${fieldClassName} resize-none`} placeholder="Görevle ilgili kısa bir not ekle..." /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="todo-category" className="mb-1.5 block text-sm font-medium text-slate-700">Kategori</label><select id="todo-category" name="category" value={form.category} onChange={updateField} className={fieldClassName}>{categoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
        <div><label htmlFor="todo-priority" className="mb-1.5 block text-sm font-medium text-slate-700">Öncelik</label><select id="todo-priority" name="priority" value={form.priority} onChange={updateField} className={fieldClassName}>{priorityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
      </div>
      <Input id="todo-due-date" name="dueDate" type="date" label="Son tarih" value={form.dueDate} onChange={updateField} />
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end"><Button variant="secondary" onClick={onCancel}>Vazgeç</Button><Button type="submit">Görevi oluştur</Button></div>
    </form>
  )
}
