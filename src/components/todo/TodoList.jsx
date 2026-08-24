import EmptyState from './EmptyState.jsx'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos = [] }) {
  if (todos.length === 0) return <EmptyState />
  return <ul className="mt-6 space-y-3">{todos.map((todo) => <TodoItem key={todo.id} {...todo} />)}</ul>
}
