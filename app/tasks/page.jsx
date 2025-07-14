'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockTasks = [
  {
    id: 1,
    title: 'Design new landing page',
    category: 'Design',
    priority: 'High',
    completed: false,
    starred: true,
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Review code for authentication',
    category: 'Development',
    priority: 'Medium',
    completed: true,
    starred: false,
    date: '2024-01-12'
  },
  {
    id: 3,
    title: 'Update project documentation',
    category: 'Documentation',
    priority: 'Low',
    completed: false,
    starred: false,
    date: '2024-01-18'
  },
  {
    id: 4,
    title: 'Client meeting preparation',
    category: 'Business',
    priority: 'High',
    completed: false,
    starred: true,
    date: '2024-01-14'
  },
  {
    id: 5,
    title: 'Database optimization',
    category: 'Development',
    priority: 'Medium',
    completed: false,
    starred: false,
    date: '2024-01-20'
  }
];

export default function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState('All');
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Development',
    priority: 'Medium'
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const starredTasks = tasks.filter(task => task.starred).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'High').length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Starred') return task.starred;
    return true;
  });

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false,
        starred: false,
        date: new Date().toISOString().split('T')[0]
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', category: 'Development', priority: 'Medium' });
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleStar = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, starred: !task.starred } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <nav className="nav">
        <div className="container nav-container">
          <div className="logo">
            <div className="logo-icon">✅</div>
            <span>TaskFlow Pro</span>
          </div>
          <div className="nav-actions">
            <Link href="/blog" className="btn btn-primary">📖 Blog</Link>
          </div>
        </div>
      </nav>

      <div className="tasks-container">
        <div className="tasks-header">
          <h1 className="tasks-title">
            Manage Your Tasks Like a <span className="highlight">Pro</span>
          </h1>
          <p className="tasks-subtitle">
            Organize, prioritize, and accomplish your goals with our beautiful and
            intuitive task management system
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-content">
              <div className="stat-number">{totalTasks}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-icon">📊</div>
          </div>
          
          <div className="stat-card completed">
            <div className="stat-content">
              <div className="stat-number">{completedTasks}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-icon">✅</div>
          </div>
          
          <div className="stat-card pending">
            <div className="stat-content">
              <div className="stat-number">{pendingTasks}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-icon">⏰</div>
          </div>
          
          <div className="stat-card starred">
            <div className="stat-content">
              <div className="stat-number">{starredTasks}</div>
              <div className="stat-label">Starred</div>
            </div>
            <div className="stat-icon">⭐</div>
          </div>
          
          <div className="stat-card high-priority">
            <div className="stat-content">
              <div className="stat-number">{highPriorityTasks}</div>
              <div className="stat-label">High Priority</div>
            </div>
            <div className="stat-icon">🚀</div>
          </div>
        </div>

        <div className="tasks-main">
          <div className="create-task-panel">
            <h2 className="panel-title">➕ Create New Task</h2>
            <div className="form-group">
              <label>Task Title</label>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className="form-select"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Documentation">Documentation</option>
                <option value="Testing">Testing</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority Level</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className="form-select"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button onClick={addTask} className="btn btn-primary add-task-btn">
              ➕ Add Task
            </button>
          </div>

          <div className="tasks-list-panel">
            <div className="tasks-header-controls">
              <h2 className="panel-title">🔍 Your Tasks</h2>
              <div className="filter-buttons">
                {['All', 'Pending', 'Completed', 'Starred'].map(filterType => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`filter-btn ${filter === filterType ? 'active' : ''}`}
                  >
                    {filterType}
                  </button>
                ))}
              </div>
            </div>

            <div className="tasks-list">
              {filteredTasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-left">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <div className="task-content">
                      <div className="task-title">{task.title}</div>
                      <div className="task-meta">
                        <span className={`category-badge ${task.category.toLowerCase()}`}>
                          {task.category}
                        </span>
                        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                          {task.priority}
                        </span>
                        <span className="task-date">📅 {task.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      onClick={() => toggleStar(task.id)}
                      className={`action-btn star ${task.starred ? 'starred' : ''}`}
                    >
                      ⭐
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="action-btn delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}