import React, { useState } from "react";

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const handleEdit = (id) => {
    if (editValue.trim()) {
      onEdit(id, editValue);
      setEditingId(null);
      setEditValue("");
    }
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-2 border rounded shadow-sm ${todo.completed ? 'bg-green-100 line-through' : 'bg-white'}`}
        >
          {editingId === todo.id ? (
            <input
              className="flex-1 p-1 border rounded mr-2"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => handleEdit(todo.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit(todo.id);
                if (e.key === 'Escape') setEditingId(null);
              }}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => startEdit(todo)} className="flex-1 cursor-pointer">
              {todo.title}
            </span>
          )}
          <div className="flex gap-2 ml-2">
            <button
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => onToggle(todo.id)}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              className="px-2 py-1 text-xs bg-yellow-400 text-white rounded hover:bg-yellow-500"
              onClick={() => startEdit(todo)}
              disabled={editingId === todo.id}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList; 