import React from 'react';
import { images } from '../assets/images';

const Footer = () => {
  return (
    <div id='footer'>
      <footer className='bg-gradient-to-t from-slate-100 to-slate-1 w-full p-4'>
      <div
    className='flex flex-col lg:flex-row justify-between bg-slate-100 rounded-lg p-4'
    style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)' }} // Example for all sides
>
          {/*--------Right Side------*/}
          <div className='flex-1 ml-5'>
            <p className='mt-2 text-lg font-semibold'>Address:</p>
            <p className='mt-1 ml-3 text-gray-700'>No:2010,<br /> Kamaraj Road,<br /> Kumbakonam, 614014.</p>
            <p className='font-medium mt-2'>Email: <span className='text-blue-600'>careconsole@gmail.com</span></p>
            <p className='font-medium'>Mobile No: <span className='text-blue-600'>6432467897</span></p>

            <div className='flex items-center mt-3'>
              <p className='font-semibold'>Follow Us:</p>
              <a href="https://www.instagram.com/" className='ml-2'>
                <img src={images.instagram} alt="Instagram" className='w-8 hover:scale-125 transition-transform duration-200' />
              </a>
              <a href="https://twitter.com" className='ml-2'>
                <img src={images.twitter} alt="Twitter" className='w-8 hover:scale-125 transition-transform duration-200' />
              </a>
            </div>
          </div>

          {/*--------Center Side------*/}
          <div className='flex flex-col items-center flex-1 mt-4 lg:mt-0'>
            <div className='text-center mb-4'>
              <p className='text-2xl font-bold text-slate-800'>CARE-CONSOLE</p>
            </div>
            <form className='w-full'>
              <p className='text-lg font-semibold mt-2'>Feedback Form</p>
              <input
                className='font-medium mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500'
                type='text'
                placeholder='Enter Your Feedback'
              />
              <button className='mt-2 bg-slate-400 text-white p-2 rounded-md hover:bg-slate-500 transition-colors duration-200'>
                SUBMIT
              </button>
            </form>
          </div>

          {/*------Left Side-------*/}
          <div className='flex-1 mr-9 ml-9 rounded-lg overflow-hidden shadow-lg mt-4 lg:mt-0'>
            <div id="my-map-display" style={{ height: "150px", width: "100%" }}>
              <iframe
                style={{ height: "100%", width: "100%", border:1 }}
                src="https://www.google.com/maps/embed/v1/place?q=banu+dental+clinic&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                allowFullScreen
              ></iframe>
                <p  className='mx-2'> our hospitals location</p> 
            </div>
            <style>
              {`#my-map-display img{max-height:none;max-width:none!important;background:none!important;}`}
            </style>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
