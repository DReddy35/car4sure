import React, { useState } from 'react';

// InformationCardsList Component
const NewsCards = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(10); // Start by showing 10 items

  // Function to handle "Show More" button click
  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Show 10 more items on each click
  };

  return (
    <div className="max-w-md mx-auto my-8 ">
    {/* Information Cards */}
    <div className="flex flex-col space-y-4 h-fit container">
      {data.slice(0, visibleCount).map((item, index) => (
        <div
          key={index}
          className="flex items-stretch shadow-md rounded-md h-full bg-white"
        >
          {/* Left section (Image and Title) */}
          <div className="flex text-black h-full">
  {/* Dynamic Image */}
  <img
    src={item.image}
    alt={item.title}
    className="w-[150px] h-auto object-cover rounded-l-md min-w-[150px] max-w-[150px]"
  />
</div>
  
          {/* Right section (Blue background with View More link) */}
          <div className="bg-sky-500 text-white h-container flex flex-col w-4/5 rounded-r-md  justify-between">
            <p className="text-md font-semibold p-4">{item.title}</p>
            <a
              href={item.link}
              className="text-xs text-white underline self-end p-4"
            >
              View More
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default NewsCards;
