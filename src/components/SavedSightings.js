import React from 'react';

const SavedSightings = ({ sightings = [], onBack, onDelete }) => {
    return (
        <div className="saved-sightings-container">
            {/* Saved Sightings Header */}
            <h2>Saved Sightings</h2>

            {/* Empty State Message */}
            {!sightings.length ? (
                <p className="empty-message">
                    No sightings logged yet. Start adding some spooky entries!
                </p>
            ) : (
                <ul>
                    {sightings.map((entry, index) => (
                        <li key={index}>
                            {/* Date and Time with Error Handling */}
                            <strong className="date">
                                {entry.date 
                                    ? new Date(entry.date).toLocaleDateString('en-GB') 
                                    : 'Unknown Date'}
                            </strong>
                            <strong className="time">
                                {entry.date 
                                    ? entry.date.split('T')[1] 
                                    : 'Unknown Time'}
                            </strong>

                            {/* Location and Description */}
                            <span>{entry.location}</span>
                            <span>{entry.description}</span>

                            {/* Delete Button with Accessibility */}
                            <button
                                onClick={() => onDelete(index)}
                                className="delete"
                                aria-label={`Delete sighting from ${entry.date 
                                    ? new Date(entry.date).toLocaleDateString('en-GB') 
                                    : 'Unknown Date'}`}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
             {/* Back Button */}
             <button onClick={onBack} className="back-button">Back</button>
        </div>
    );
};

export default SavedSightings;
