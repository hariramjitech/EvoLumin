import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Importing the left arrow icon

const Back = () => {
  return (
    <div>
      <div className='ml-6'>
        <button className='flex items-center bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50'>
          <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
          Back
        </button>
      </div>
    </div>
  );
};

export default Back;
