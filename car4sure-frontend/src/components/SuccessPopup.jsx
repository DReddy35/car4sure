import React from 'react';

const SuccessPopup = ({ status, message, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50"></div>
            
            {/* Popup Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg relative z-60 max-w-xl w-full mx-4">
                <h2 className="text-xl font-semibold mb-4 font-Poppins">{status}</h2>
                <p className="font-Poppins">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-700 hover:bg-secondary text-white font-bold py-2 px-4 rounded font-Poppins"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessPopup;
