import { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editingTask, setEditingTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            completed: false
        });

        setTitle('');
        setDescription('');
    };

    return (
        <div className="card">
            <h3>
                <i className="fa-solid fa-plus-circle"></i> 
                {editingTask ? 'Edit Task' : 'Create New Task'}
            </h3>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="What needs to be done?"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Details..."
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        <i className="fa-solid fa-paper-plane"></i>
                        {editingTask ? 'Update Task' : 'Save Task'}
                    </button>
                    {editingTask && (
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingTask(null)}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default TaskForm;