import React, { useState } from 'react';
import SuccessPopup from './SuccessPopup';

// OverdueTasksCarousel Component
const OverdueTasksCarousel = ({ messages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);


  // Function to go to the next message
  const nextMessage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  // Function to go to the previous message
  const prevMessage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  return (
    <div className="p-6  w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-light">Overdue Tasks</h2>
        <div className="flex space-x-4">
          <button
            className="p-2 g-white border border-zinc-200 shadow-md rounded-md hover:bg-gray-300 focus:outline-none"
            onClick={prevMessage}
          >
            ◀
          </button>
          <button
            className="p-2 bg-white border border-zinc-200 shadow-md rounded-md hover:bg-gray-300 focus:outline-none"
            onClick={nextMessage}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden bg-white rounded-lg shadow-xl border border-zinc-300 w-full">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${messages.length * 100}%` }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 p-6"
              style={{ minWidth: '100%' }}
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{message.title}</h3>
                <span className="text-sm font-semibold">#{index + 1}</span>
              </div>
              {message.overdueDays && (
                <p className="text-sm text-sky-500 mb-6">
                  {message.overdueDays} days overdue
                </p>
              )}
              <p className="text-sm text-gray-700 mb-6">{message.body}</p>
              <div className="flex w-full ">
                <button className="px-4 py-2 w-26 bg-neutral-700 text-white rounded-lg hover:bg-neutral-500" onClick={() => setShowPopup(true)}>
                  Open Claim
                </button>
                <button className="px-4 py-2 w-24 bg-zinc-500 text-white rounded-lg hover:bg-zinc-600 ml-32">
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
                  <SuccessPopup
                    status="Opening claim..."
                    message="Dylan you madhir ;)"
                    onClose={() => setShowPopup(false)}
                  />
                )}
    </div>
  );
};

export default OverdueTasksCarousel;
