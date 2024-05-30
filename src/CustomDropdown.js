import React, { useState } from 'react';
import './App.css'; 

function CustomDropdown({ options, value, onChange, className }) {
    const [showOptions, setShowOptions] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');
    const [localOptions, setLocalOptions] = useState(options);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleOptionClick = (option) => {
        onChange(option); 
        setInputValue(option);
        setShowOptions(false);
    };

    const handleAddCompany = () => {
        if (inputValue && !localOptions.includes(inputValue)) {
            setLocalOptions([...localOptions, inputValue]);
            handleOptionClick(inputValue);
        }
    };

    return (
        <div className="custom-dropdown-container">
            <div className={`custom-dropdown ${className}`} onClick={toggleOptions}>
                {inputValue || "Company"}
                <span className="dropdown-arrow">&#9660;</span>
            </div>
            {showOptions && (
                <div className="custom-dropdown-options">
                    <input 
                        type="text" 
                        placeholder="Add a company" 
                        value={inputValue} 
                        onChange={handleInputChange} 
                        className="dropdown-input"
                    />
                    <button onClick={handleAddCompany} className="dropdown-button">Add</button>
                    {localOptions.map(option => (
                        <div 
                            key={option} 
                            onClick={() => handleOptionClick(option)} 
                            className="dropdown-option"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomDropdown;
