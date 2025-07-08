import React, { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l focus:outline-none"
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
       
        className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm; 