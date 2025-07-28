import React from 'react';

const DeadlineDisplay = () => {
    // Calculate deadline as today + 7 days
    const getDeadline = () => {
        const today = new Date();
        const deadline = new Date(today);
        deadline.setDate(today.getDate() + 7);

        // Format the date as a readable string
        return deadline.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const deadline = getDeadline();

    return (
        <div className="container mt-4">
            <div className="alert alert-danger" role="alert" style={{backgroundColor: '#ffebee', borderColor: '#ffcdd2', color: '#c62828'}}>
                <h5 className="alert-heading">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Submission Deadline
                </h5>
                <p className="mb-0">
                    You should submit hard copy to the Student Services Division before{' '}
                    <strong>{deadline}</strong>
                </p>
            </div>
        </div>
    );
};

export default DeadlineDisplay;