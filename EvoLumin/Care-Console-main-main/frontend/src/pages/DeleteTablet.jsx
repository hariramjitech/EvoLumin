import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DeleteTablet = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  function dele() {
    console.log("Clicked");

    axios
      .delete(`http://localhost:3001/tablets/deleteTablets/${_id}`)
      .then(() => {
        console.log("Tablet Info Deleted Successfully");
        alert("Tablet Info Deleted Successfully");
        navigate('/tablets');
      })
      .catch((error) => {
        alert('An error happened. Please check console.');
        console.log(error);
      });
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className="group  select-none w-[800px] flex flex-col p-10 relative items-center justify-center bg-gray-200 border border-gray-300 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-2xl">
        <div className="">
          <div className="text-center p-4 flex-auto justify-center">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="group-hover:animate-bounce w-16 h-16 flex items-center text-gray-600 fill-red-500 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                fillRule="evenodd"
              ></path>
            </svg>
            <h2 className="text-3xl font-bold py-6 text-gray-800">Are you sure?</h2>
            <p className="font-semibold text-lg text-gray-600 px-2">
              Do you really want to continue? This process cannot be undone.
            </p>
          </div>
          <div className="p-4 mt-4 text-center space-x-3 md:block">
            <Link to={'/tablets'}>
              <button
                className="mb-4 md:mb-0 bg-gray-300 px-6 py-3 text-lg shadow-sm font-medium tracking-wider border-2 border-gray-400 hover:border-gray-500 text-gray-800 rounded-full hover:shadow-lg hover:bg-gray-400 transition ease-in duration-300"
              >
                Cancel
              </button>
            </Link>
            <button
              onClick={dele}
              className="bg-red-600 hover:bg-red-500 px-6 py-3 text-lg shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-600 text-white rounded-full transition ease-in duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTablet;
