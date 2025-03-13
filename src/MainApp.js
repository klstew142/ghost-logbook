import React, { useState, useEffect } from 'react';
import AddLogEntry from './components/AddLogEntry';
import SavedSightings from './components/SavedSightings';
import './styles.css';

const MainApp = () => {
    const [sightings, setSightings] = useState([]);
    const [currentView, setCurrentView] = useState('home');

    // Load saved entries from localStorage on initial render
    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem('ghostLogEntries')) || [];
        setSightings(savedEntries);
    }, []);

    const handleAddEntry = (entry) => {
        const updatedSightings = [...sightings, entry];
        setSightings(updatedSightings);
        localStorage.setItem('ghostLogEntries', JSON.stringify(updatedSightings));
    };

    const handleDeleteEntry = (indexToDelete) => {
        const updatedSightings = sightings.filter((_, index) => index !== indexToDelete);
        setSightings(updatedSightings);
        localStorage.setItem('ghostLogEntries', JSON.stringify(updatedSightings));
    };

    return (
        <div className="container">
            {/* Navbar Component */}
            <nav className="navbar">
                <button onClick={() => setCurrentView('home')}>Home</button>
                <button onClick={() => setCurrentView('saved-sightings')}>View Saved Sightings</button>
            </nav>

            {/* Conditional Rendering of Views */}
            {currentView === 'home' ? (
                <div className="form-container">
                    <h1>Ghost Logbook</h1>
                    <AddLogEntry onAddEntry={handleAddEntry} />
                </div>
            ) : (
                <SavedSightings
                    sightings={sightings}
                    onBack={() => setCurrentView('home')}
                    onDelete={handleDeleteEntry}
                />
            )}
        </div>
    );
};

export default MainApp;
