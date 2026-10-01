import React, { useEffect, useMemo, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'react-task-manager-tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [search, setSearch] = useState('');

  // Load saved tasks once when the application starts.
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error('Could not load saved tasks:', error);
    }
  }, []);

  // Persist the latest task state.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, category) => {
    const newTask = {
      id: Date.now(),
      text,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks((current) => [newTask, ...current]);
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const editTask = (id, text) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, text } : task))
    );
  };

  const clearCompleted = () => {
    setTasks((current) => current.filter((task) => !task.completed));
  };

  const visibleTasks = useMemo(() => {
    const result = tasks.filter((task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);

      const matchesSearch = task.text
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'alphabetical') {
        return a.text.localeCompare(b.text);
      }
      if (sortBy === 'completed') {
        return Number(a.completed) - Number(b.completed);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, filter, sortBy, search]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-inner">
          <div>
            <p className="eyebrow">REACT PROJECT</p>
            <h1>Task<span>Flow</span></h1>
            <p className="hero-subtitle">
              A simple, fast and persistent task manager built with React.
            </p>
          </div>
          <div className="stats">
            <div><strong>{tasks.length}</strong><span>Total</span></div>
            <div><strong>{activeCount}</strong><span>Active</span></div>
            <div><strong>{completedCount}</strong><span>Done</span></div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="panel">
          <TaskInput onAddTask={addTask} />

          <div className="toolbar">
            <div className="filters">
              {[
                ['all', 'All'],
                ['active', 'Active'],
                ['completed', 'Completed']
              ].map(([value, label]) => (
                <button
                  key={value}
                  className={filter === value ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="controls">
              <input
                className="search"
                type="search"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search tasks"
              />
              <select
                className="sort-select"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort tasks"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="alphabetical">A-Z</option>
                <option value="completed">Active first</option>
              </select>
            </div>
          </div>

          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />

          {completedCount > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear completed tasks
            </button>
          )}
        </section>

        <section className="concepts">
          <div><span>01</span><h3>Components</h3><p>Reusable UI with TaskInput, TaskList and TaskItem.</p></div>
          <div><span>02</span><h3>Hooks</h3><p>useState manages state and useEffect handles persistence.</p></div>
          <div><span>03</span><h3>Persistence</h3><p>Tasks remain available after refreshing the browser.</p></div>
        </section>
      </main>

      <footer>Built with React.js • TaskFlow Project</footer>
    </div>
  );
}

export default App;