import React, { useState } from 'react';
import Select from 'react-select';

const AddLogEntry = ({ onAddEntry }) => {
    const [formData, setFormData] = useState({
        date: '',
        location: '',
        ghostType: [],
        description: '',
        tags: '',
        equipmentUsed: [],
        teamLeaders: []
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDropdownChange = (field, selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData((prevData) => ({
            ...prevData,
            [field]: values,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const entry = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };

        // Retrieve existing entries from localStorage
        const savedEntries = JSON.parse(localStorage.getItem('ghostLogEntries')) || [];

        // Add the new entry to the existing ones
        localStorage.setItem('ghostLogEntries', JSON.stringify([...savedEntries, entry]));

        // Clear the form
        setFormData({
            date: '',
            location: '',
            ghostType: [],
            description: '',
            tags: '',
            equipmentUsed: [],
            teamLeaders: []
        });

        // Show success message
        setSuccessMessage('Ghost sighting added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
    };

    // Dropdown options
    const ghostOptions = [
        { value: 'poltergeist', label: 'Poltergeist' },
        { value: 'apparition', label: 'Apparition' },
        { value: 'badSmell', label: 'Bad Smell' },
        { value: 'goodSmell', label: 'Good Smell' },
        { value: 'shadow', label: 'Shadow' },
        { value: 'mist', label: 'Mist' },
        { value: 'lightAnomaly', label: 'Light Anomaly' },
        { value: 'bang', label: 'Banging/Tapping' },
        { value: 'voices', label: 'Voices' }
    ];

    const equipmentOptions = [
        { value: 'emf', label: 'EMF' },
        { value: 'thermalCamera', label: 'Thermal Camera' },
        { value: 'estesMethod', label: 'Estes Method' },
        { value: 'k2Meter', label: 'K2 Meter' },
        { value: 'dowsingRods', label: 'Dowsing Rods' }
    ];

    const teamleaderOptions = [
        { value: 'andy', label: 'Andy' },
        { value: 'angela', label: 'Angela' },
        { value: 'danielle', label: 'Danielle' },
        { value: 'deb', label: 'Deb' },
        { value: 'emmaR', label: 'Emma R' },
        { value: 'emmaW', label: 'Emma W' },
        { value: 'julia', label: 'Julia' },
        { value: 'peter', label: 'Peter' },
        { value: 'scott', label: 'Scott' },
        { value: 'steve', label: 'Steve' }
    ];

    return (
        <form onSubmit={handleSubmit}>
            {successMessage && <p className="success-message">{successMessage}</p>}

            <label className="form-label">
                <i className="fas fa-ghost"></i> Date:
                <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Select a date and time"
                    aria-label="Enter the date and time of the ghost sighting"
                />
            </label>

            <label className="form-label">
                <i className="fas fa-ghost"></i> Location:
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter a location"
                    aria-label="Enter the location of the ghost sighting"
                />
            </label>

            <label className="form-label">
                <i className="fas fa-ghost"></i> Manifestation Type (select one or more):
                <Select
                    className="ghost-type-dropdown"
                    options={ghostOptions}
                    isMulti
                    placeholder="Select one or more manifestation types"
                    onChange={(selectedOptions) => handleDropdownChange('ghostType', selectedOptions)}
                    value={ghostOptions.filter(option => formData.ghostType.includes(option.value))}
                    aria-label="Select one or more ghost manifestation types"
                />
            </label>

            <label className="form-label">
                <i className="fas fa-ghost"></i> Equipment Used (select one or more):
                <Select
                    className="equipment-used-dropdown"
                    options={equipmentOptions}
                    isMulti
                    placeholder="Select one or more equipment types"
                    onChange={(selectedOptions) => handleDropdownChange('equipmentUsed', selectedOptions)}
                    value={equipmentOptions.filter(option => formData.equipmentUsed.includes(option.value))}
                    aria-label="Select one or more types of equipment used"
                />
            </label>

            <label className="form-label">
                <i className="fas fa-ghost"></i> Team Leaders (select one or more):
                <Select
                    className="team-leaders-dropdown"
                    options={teamleaderOptions}
                    isMulti
                    placeholder="Select one or more team leaders"
                    onChange={(selectedOptions) => handleDropdownChange('teamLeaders', selectedOptions)}
                    value={teamleaderOptions.filter(option => formData.teamLeaders.includes(option.value))}
                    aria-label="Select one or more team leaders"
                />
            </label>

            <label className="form-label">
                <i className="fas fa-ghost"></i> Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the ghostly encounter"
                    aria-label="Describe the ghostly encounter in detail"
                />
            </label>

            <label className="form-label">
                <i className="fas fa-ghost"></i> Tags (comma-separated):
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Add tags (e.g., spooky, eerie)"
                    aria-label="Enter tags for the ghost sighting, separated by commas"
                />
            </label>

            <button type="submit">Add Entry</button>
        </form>
    );
};

export default AddLogEntry;
