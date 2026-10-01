import React, { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const saveEdit = () => {
    if (!editText.trim()) return;
    onEdit(task.id, editText.trim());
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditText(task.text);
    setEditing(false);
  };

  return (
    <article className={`task-item ${task.completed ? 'is-completed' : ''}`}>
      <input
        className="task-check"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.text} complete`}
      />

      <div className="task-content">
        {editing ? (
          <div className="edit-row">
            <input
              autoFocus
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') saveEdit();
                if (event.key === 'Escape') cancelEdit();
              }}
              aria-label="Edit task"
            />
            <button className="small-btn save" onClick={saveEdit}>Save</button>
            <button className="small-btn" onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <>
            <h3>{task.text}</h3>
            <div className="task-meta">
              <span className={`category category-${task.category.toLowerCase()}`}>
                {task.category}
              </span>
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </>
        )}
      </div>

      {!editing && (
        <div className="task-actions">
          <button className="icon-btn" onClick={() => setEditing(true)} aria-label="Edit task">✎</button>
          <button className="icon-btn delete" onClick={() => onDelete(task.id)} aria-label="Delete task">×</button>
        </div>
      )}
    </article>
  );
}

export default TaskItem;