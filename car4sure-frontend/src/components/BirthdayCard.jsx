import React from 'react';

const BirthdayCard = ({ people }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 w-full">
            {people.map((person, index) => (
                <div key={index} className="flex items-center p-4 border-b border-gray-300">
                    {/* Profile Picture */}
                    <img
                        src={person.profilePic}
                        alt={`${person.name}'s profile`}
                        className="w-16 h-16 rounded-full mr-4"
                    />

                    {/* Name and Birthdate */}
                    <div className="flex-grow">
                        <h2 className="text-sm font-semibold">{person.name} <span className='text-sky-500'>({person.age})</span></h2>
                        <p className="text-sm text-sky-500">
                            {person.birthdate}
                        </p>
                    </div>

                    {/* Send a Wish Button */}
                    <button className="flex items-center text-sky-500 py-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                        </svg>
                        <span className='text-xs'>Send a Wish</span>
                    </button>

                </div>
            ))}
        </div>
    );
};

export default BirthdayCard;
