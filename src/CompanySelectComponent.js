import React, { useState } from 'react';

function CompanySelectComponent({ options, value, onChange }) {
    const [inputValue, setInputValue] = useState(value || '');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                list="company-list"
                placeholder="Add a company"
                value={inputValue}
                onChange={handleInputChange}
            />
            <datalist id="company-list">
                {options.map((option, index) => (
                    <option key={index} value={option} />
                ))}
            </datalist>
        </div>
    );
}

export default CompanySelectComponent;
