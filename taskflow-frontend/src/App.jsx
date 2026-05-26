import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import ConfirmModal from './components/ConfirmModal';
import './index.css';

const API_BASE = 'http://localhost:8080/api/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load theme preference from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        fetchTasks();
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        
        if (newMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await fetch(API_BASE);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error(err);
            alert('Cannot connect to backend. Is Spring Boot running?');
        }
    };

    // Filter tasks
    const filteredTasks = tasks
        .filter(task => {
            if (filter === 'pending') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        })
        .filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Handlers
    const handleSubmit = async (taskData) => {
        try {
            if (editingTask) {
                await fetch(`${API_BASE}/${editingTask.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });
            } else {
                await fetch(API_BASE, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });
            }
            fetchTasks();
            setEditingTask(null);
        } catch (err) {
            alert('Operation failed');
        }
    };

    const toggleComplete = async (id, currentStatus) => {
        try {
            await fetch(`${API_BASE}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !currentStatus })
            });
            fetchTasks();
        } catch (err) {
            alert('Failed to update');
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleDeleteClick = (id) => {
        setTaskToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await fetch(`${API_BASE}/${taskToDelete}`, { method: 'DELETE' });
            fetchTasks();
        } catch (err) {
            alert('Delete failed');
        } finally {
            setShowModal(false);
            setTaskToDelete(null);
        }
    };

    return (
        <div className="app-container">
            <Sidebar 
                filter={filter} 
                setFilter={setFilter} 
                tasks={tasks}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />

            <main className="main-content">
                <header className="top-bar">
                    <h1>Workspace Dashboard</h1>
                    <div className="search-box">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <div className="dashboard-grid">
                    <TaskForm 
                        onSubmit={handleSubmit} 
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                    />

                    <div className="list-section">
                        <div className="list-header">
                            <h2>
                                {filter === 'all' ? 'All Tasks' :
                                 filter === 'pending' ? 'Pending Tasks' : 'Completed Tasks'}
                            </h2>
                            <span className="badge">{filteredTasks.length} Tasks</span>
                        </div>

                        <div className="task-cards-container">
                            {filteredTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleComplete}
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteClick}
                                />
                            ))}

                            {filteredTasks.length === 0 && (
                                <p style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                    No tasks found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <ConfirmModal
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

export default App;