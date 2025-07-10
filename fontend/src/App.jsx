
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const API_URL = "https://todo-web-2-5kiy.onrender.com/todos";

const FILTERS = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed,
};

const SECTIONS = [
  { label: "Year", value: "year" },
  { label: "Month", value: "month" },
  { label: "Day", value: "day" },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("year");

  // Fetch todos for the current section
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}?type=${section}`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, [section]);

  // Add new todo
  const addTodo = (title) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false, type: section }),
    })
      .then((res) => res.json())
      .then((newTodo) => setTodos((prev) => [...prev, newTodo]));
  };

  // Toggle todo completed
  const toggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((updated) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
      );
  };

  // Delete todo
  const deleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setTodos((prev) => prev.filter((t) => t.id !== id)));
  };

  // Edit todo
  const editTodo = (id, newTitle) => {
    const todo = todos.find((t) => t.id === id);
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, title: newTitle }),
    })
      .then((res) => res.json())
      .then((updated) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
      );
  };

  // Clear completed
  const clearCompleted = () => {
    fetch(`${API_URL}/completed`, { method: "DELETE" })
      .then(() => setTodos((prev) => prev.filter((t) => !t.completed)));
  };

  const filteredTodos = todos.filter(FILTERS[filter]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <div className="flex justify-center mb-6 space-x-2">
        {SECTIONS.map((s) => (
          <button
            key={s.value}
            className={`px-4 py-2 rounded font-semibold border transition-colors duration-150 ${section === s.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100'}`}
            onClick={() => { setSection(s.value); setFilter('all'); }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <TodoForm onAdd={addTodo} />
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button
            className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <button
          className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      )}
      <div className="mt-4 text-sm text-gray-500 text-center">
        {todos.filter(FILTERS.active).length} items left
      </div>
    </div>
  );
}

export default App;



