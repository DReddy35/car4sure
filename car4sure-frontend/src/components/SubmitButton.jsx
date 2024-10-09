import React, { useState } from 'react';

const SubmitButton = ({ buttonText, onClick, bgChange, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);

  const buttonClasses = `w-full h-[65px] px-[34px] py-[17px] rounded-md flex justify-center items-center gap-2.5 text-center text-base font-normal leading-tight ${
    isLoading ? "bg-gray-200" : "bg-gray-400"
  } ${bgChange ? "border border-secondary text-secondary" : "text-white"}`

  const buttonStyle = bgChange ? { backgroundColor: bgChange } : {};

  const handleClick = async () => {
    if (disabled) return; // Prevent click if disabled

    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error("An error occurred", error);
    }
    setIsLoading(false);
  };

  return (
    <button
      className={buttonClasses}
      style={buttonStyle}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="loader"></div> // Placeholder for the loader
      ) : (
        buttonText
      )}
    </button>
  );
};

export default SubmitButton;