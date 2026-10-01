import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');

  const submitTask = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onAddTask(text.trim(), category);
    setText('');
  };

  return (
    <form className="task-input" onSubmit={submitTask}>
      <input
        aria-label="Task title"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to be done?"
        maxLength="120"
      />
      <select
        aria-label="Task category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option>Personal</option>
        <option>College</option>
        <option>Work</option>
        <option>Shopping</option>
        <option>Other</option>
      </select>
      <button className="primary-btn" type="submit">+ Add Task</button>
    </form>
  );
}

export default TaskInput;