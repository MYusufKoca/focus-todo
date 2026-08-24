import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'

export default function TodoForm() {
  return <form className="space-y-4"><Input id="todo-title" label="Görev adı" placeholder="Örn. Haftalık planı hazırla" /><Button type="submit" className="w-full">Görevi kaydet</Button></form>
}
