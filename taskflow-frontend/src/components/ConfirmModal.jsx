import { useEffect } from 'react';

function ConfirmModal({ isOpen, onCancel, onConfirm }) {
    useEffect(() => {
        if (isOpen) {
            // Small delay to trigger animation
            setTimeout(() => {
                document.querySelector('.modal-overlay').classList.add('show');
            }, 10);
        }
    }, [isOpen]);

    const handleCancel = () => {
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) overlay.classList.remove('show');
        
        setTimeout(() => {
            onCancel();
        }, 300); // Wait for animation to finish
    };

    const handleConfirm = () => {
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) overlay.classList.remove('show');
        
        setTimeout(() => {
            onConfirm();
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-body">
                    <h3>Delete Task?</h3>
                    <p>This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-btn cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="modal-btn delete" onClick={handleConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;