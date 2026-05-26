function TaskCard({ task, onToggle, onEdit, onDelete }) {
    return (
        <div className={`task-card ${task.completed ? 'completed-state' : 'pending-state'}`}>
            <div className="task-main-content">
                <div className="task-title-row">
                    <h3>{task.title}</h3>
                    <span className={`status-pill ${task.completed ? 'pill-completed' : 'pill-pending'}`}>
                        {task.completed ? 'Completed' : 'Pending'}
                    </span>
                </div>
                <p className="task-desc">{task.description}</p>
                <div className="task-meta">
                    <span><i className="fa-solid fa-fingerprint"></i> #{task.id}</span>
                    <span><i className="fa-solid fa-calendar-day"></i> {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="task-actions">
                <button className="action-btn" onClick={() => onToggle(task.id, task.completed)} title="Toggle Status">
                    <i className={`fa-solid fa-${task.completed ? 'rotate-left' : 'check'}`}></i>
                </button>
                <button className="action-btn" onClick={() => onEdit(task)} title="Edit">
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="action-btn" onClick={() => onDelete(task.id)} title="Delete">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
}

export default TaskCard;