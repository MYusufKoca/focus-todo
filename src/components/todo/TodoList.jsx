import EmptyState, { NoFilterResults } from './EmptyState.jsx'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos, hasTodos, onNewTodo, onToggle, onDelete, onEdit }) {
  if (!hasTodos) return <EmptyState onNewTodo={onNewTodo} />
  if (todos.length === 0) return <NoFilterResults />
  return <ul className="mt-6 space-y-3" aria-label="Görev listesi">{todos.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />)}</ul>
}
