import React from "react";

const ClaimTypeCard = ({ title, vmp, warranty, tyre, allow, x, y }) => {
  // Calculate the total for the circle
  const total = vmp + warranty;

  return (
    <div className="flex flex-col  space-y-4 w-5/12 h-container">
      {/* Title Outside the Card */}
      <h2 className="text-sm font-bold">{title}</h2>

      {/* Card Container */}
      <div className="w-full bg-white p-6 border border-gray-300 shadow-xl rounded-2xl h-full">
        {/* Circle with Completion Data */}
        <div className="flex justify-center mb-6">
          <div className="relative flex justify-center items-center w-40 h-40 rounded-full border-4 border-sky-500">
            <span className="text-xl font-bold text-sky-500">{total}</span>
            {/* Inner Completion Text */}
            {/* <div className="absolute text-sm text-gray-500 bottom-0 left-1/2 transform -translate-x-1/2">
              {x}/{y}
            </div> */}
          </div>
        </div>

        {/* Data Items */}
        <div className="flex flex-col space-y-2 ">
          <div className="flex justify-between">
            <span className="font-bold">VMP: </span>
            <span>{vmp}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Warranty: </span>
            <span>{warranty}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Tyre: </span>
            <span>{tyre}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Allow: </span>
            <span>{allow}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimTypeCard;
