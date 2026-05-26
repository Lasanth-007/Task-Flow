import React from 'react';

function Sidebar({ filter, setFilter, tasks, isDarkMode, toggleDarkMode }) {
    const completedCount = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const percentage = total ? Math.round((completedCount / total) * 100) : 0;

    return (
        <aside className="sidebar">
            <div className="brand">
                <i className="fa-solid fa-check-double"></i>
                <h2>TaskFlow</h2>
            </div>

            {/* Dark Mode Toggle */}
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <button 
                    onClick={toggleDarkMode}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.4rem',
                        cursor: 'pointer',
                        color: '#94a3b8'
                    }}
                >
                    <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
            </div>

            {/* Filter Navigation Links */}
            <nav className="filter-nav">
                <button 
                    className={`nav-btn ${filter === 'all' ? 'active' : ''}`} 
                    onClick={() => setFilter('all')}
                >
                    <i className="fa-solid fa-list"></i> All Tasks
                </button>
                <button 
                    className={`nav-btn ${filter === 'pending' ? 'active' : ''}`} 
                    onClick={() => setFilter('pending')}
                >
                    <i className="fa-solid fa-clock"></i> Pending
                </button>
                <button 
                    className={`nav-btn ${filter === 'completed' ? 'active' : ''}`} 
                    onClick={() => setFilter('completed')}
                >
                    <i className="fa-solid fa-circle-check"></i> Completed
                </button>
            </nav>

            {/* Stats Summary Panel */}
            <div className="stats-panel">
                <p>Progress: {percentage}%</p>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;