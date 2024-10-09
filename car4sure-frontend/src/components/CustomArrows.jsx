import React from 'react';

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
    onClick={onClick}
    aria-label="Previous"
  >
    &lt;
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
    onClick={onClick}
    aria-label="Next"
  >
    &gt;
  </button>
);

export { CustomPrevArrow, CustomNextArrow };
