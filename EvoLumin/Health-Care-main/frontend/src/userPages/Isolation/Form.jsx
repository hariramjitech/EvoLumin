import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [symptoms, setSymptoms] = useState('');
  const [illness, setIllness] = useState('');
  const [days, setDays] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      email,
      symptoms,
      isolated: true,
      illness,
      isolationenddate: new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000),
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/user/illness/form',
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Form submitted successfully:', response.data);
      navigate('/isolation/home');
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className='flex'>
      <SideBar />
      <div className='flex justify-center items-center w-full min-h-screen'>
        <div className='flex flex-col bg-white shadow-lg rounded-[20px] p-8 w-[450px]'>
          <h2 className='text-3xl font-semibold text-[#333] mb-6'>Isolation Request Form</h2>
          <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
            <input
              type="text"
              className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e62e62] transition'
              placeholder='Enter Symptoms'
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <input
              type="text"
              className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e62e62] transition'
              placeholder='Enter the name of illness'
              value={illness}
              onChange={(e) => setIllness(e.target.value)}
            />
            <input
              type="number"
              placeholder='How many days'
              className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e62e62] transition'
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            <button
              type='submit'
              className='bg-[#c9184a] text-white py-3 rounded-md font-semibold hover:bg-[#9b1339] transition-all shadow-sm hover:shadow-lg hover:shadow-[#ff5678]/60'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
