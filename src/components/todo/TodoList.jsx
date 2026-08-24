import EmptyState from './EmptyState.jsx'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos, onNewTodo, onToggle, onDelete }) {
  if (todos.length === 0) return <EmptyState onNewTodo={onNewTodo} />
  return <ul className="mt-6 space-y-3" aria-label="Görev listesi">{todos.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />)}</ul>
}
