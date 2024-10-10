import React, { useState, useEffect, useRef } from "react";

const TickerBanner = ({ messages, speed = 50 }) => {
  const tickerRef = useRef(null);
  const doubledMessages = messages.concat(messages);

  // Repeatedly moves the ticker content from right to left
  useEffect(() => {
    const ticker = tickerRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      if (ticker) {
        scrollAmount += 1;
        if (scrollAmount >= ticker.scrollWidth / 2) {
          scrollAmount = 0; // Reset when it reaches the end
        }
        ticker.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(scroll, speed);

     // Doubling messages for seamless loop

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="relative overflow-hidden bg-sky-500 py-2 px-4 shadow-xl rounded-md h-14">
      <div
        className="ticker-animation flex space-x-8"
        style={{ animationDuration: `${speed}s` }} // Adjust speed dynamically
      >
        {doubledMessages.map((message, index) => (
          <div
            key={index}
            className="inline-block px-4 text-md text-white whitespace-nowrap mt-2"
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBanner;
