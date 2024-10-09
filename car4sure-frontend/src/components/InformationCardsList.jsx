import React, { useState } from 'react';

// InformationCardsList Component
const InformationCardsList = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(10); // Start by showing 10 items

  // Function to handle "Show More" button click
  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Show 10 more items on each click
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6">
      {/* Show More Button */}
      <div className='w-full flex justify-between'>
        <p className='py-2 text-zinc-600' >Recent Claims</p>
      {data.length > 10 && visibleCount < data.length && (
        <button
          className="mb-4 px-4 py-2  text-sky-500 rounded"
          onClick={showMore}
        >
          Show More
        </button>
      )}
      </div>

      {/* Information Cards */}
      <div className="flex flex-col space-y-4 h-full container">
  {data.slice(0, visibleCount).map((item, index) => (
    <div
      key={index}
      className="flex justify-between items-center  rounded-lg shadow-md h-full bg-white"
    >
      {/* Information Section with blue background */}
      <div className="flex flex-grow flex-col  bg-sky-500 text-white p-2 pl-2 rounded-lg">
        <p className="text-md font-semibold">Product: {item.product}</p>
        <p className="text-sm text-zinc-700">Claim No: {item.claimNo}</p>
        <p className="text-xs text-black">Status: {item.status}</p>
      </div>

      {/* View Button */}
      <div className="mr-2 ml-6">
        <button className="px-4 py-2 bg-white text-sky-500 font-semibold rounded-r-lg hover:bg-gray-100">
          <span className='-ml-4'>View</span>
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default InformationCardsList;
