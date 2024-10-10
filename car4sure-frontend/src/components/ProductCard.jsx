import React from 'react';
import SubmitButton from './SubmitButton';

const ProductCard = ({ review, link }) => {
  return (
    <div className="p-10 mx-4 bg-white rounded-lg shadow-lg w-11/12 min-h-[400px]">
      <img src="images/logo.png" className="mb-16 h-[80px] w-auto"/>
      <h3 className="text-secondary text-xl font-normal font-Petrona leading-2">{review.title}</h3>
      <p className="text-black text-sm font-normal font-Poppins leading-tight mt-2">{review.content}</p>
      <div className="flex justify-between mt-10 w-full">
        <SubmitButton buttonText="Select" onClick={() => console.log("Selected")} />
      </div>
    </div>
  );
};

export default ProductCard;