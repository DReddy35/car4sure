import React, { useState, useEffect, useRef } from 'react';

const InputField = ({ label, id, type, name, value: propValue, onChange, placeholder, required, fromLoginPage }) => {
    const [value, setValue] = useState(propValue || '');
    const [error, setError] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        // Initialize with prop value
        setValue(propValue || (type === 'tel' ? '+27' : ''));
    }, [propValue, type]);

    useEffect(() => {
        if (type === 'text' || type === 'tel') {
            adjustTextareaHeight();
        }
    }, [value, type]);

    const validateInput = (value) => {
        let isValid = true;
        let errorMessage = '';

        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (type === 'password' && !fromLoginPage) {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(value);
            const hasMinLength = value.length >= 8;

            if (!hasUpperCase) {
                errorMessage = 'Password must contain at least one uppercase letter.';
            } else if (!hasNumber) {
                errorMessage = 'Password must contain at least one number.';
            } else if (!hasSpecialChar) {
                errorMessage = 'Password must contain at least one special character.';
            } else if (!hasMinLength) {
                errorMessage = 'Password must be at least 8 characters long.';
            }
        } else if (type === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid email address';
        } else if (type === 'tel') {
            isValid = /^\+27\d{9}$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid South African phone number';
        }

        setError(errorMessage);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setValue(value);
        const isValid = validateInput(value); // Capture validation result
        // Call parent onChange handler with both event and validation state
        onChange(e, isValid);
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scrollHeight
        }
    };

    return (
        <div className="flex flex-col gap-2 mt-8">
            <label htmlFor={id} className="text-indigo-900 text-base font-normal font-Poppins">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === 'text' || type === 'tel' ? (
                <textarea
                    ref={textareaRef}
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`block w-full px-3 bg-white border ${error ? 'border-red-500' : 'border-slate-200'} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none overflow-hidden`}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${id}-error` : undefined}
                    rows={1} // Start with one row
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`block w-full px-3 bg-white border ${error ? 'border-red-500' : 'border-slate-200'} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            )}
            {error && (
                <p className="text-sm text-red-600" id={`${id}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;
