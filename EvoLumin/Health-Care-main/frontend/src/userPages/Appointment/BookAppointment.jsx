import React, { useState } from 'react';
import { images } from '../../assets/images'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import './CalendarCustom.css';
import SideBar from '../../components/SideBar';

// Mock function for checking if a slot is already booked
const isSlotAvailable = (date, time) => {
  // Example of booked slots (you will fetch this from your backend in a real app)
  const bookedSlots = [
    { date: '2024-10-24', time: '10:00' },
    { date: '2024-10-24', time: '11:00' }
  ];

  const selectedDate = date.toISOString().split('T')[0];
  return !bookedSlots.some(slot => slot.date === selectedDate && slot.time === time);
};

// Generate time slots every 15 minutes (08:00 to 18:00 as an example)
const generateTimeSlots = () => {
  const slots = [];
  const startTime = 8 * 60; // 8:00 in minutes
  const endTime = 18 * 60; // 18:00 in minutes
  for (let minutes = startTime; minutes <= endTime; minutes += 15) {
    const hour = Math.floor(minutes / 60).toString().padStart(2, '0');
    const minute = (minutes % 60).toString().padStart(2, '0');
    slots.push(`${hour}:${minute}`);
  }
  return slots;
};

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [description, setDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value); // Use the value selected from dropdown
  };

  const triggerAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (date && time && description) {
      if (isSlotAvailable(date, time)) {
        triggerAlert('success', 'Your appointment has been booked successfully!');

        // Construct the confirmation URL with the selected date and time
        const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        navigate(`/confirm/${formattedDate}/${time}/${description}`); // Send only selected date and time
      } else {
        triggerAlert('error', 'The selected time slot is unavailable. Please choose another slot.');
      }
    } else {
      triggerAlert('error', 'Please provide date, time, and description!');
    }
  };

  return (
    <div className='flex'>
    <div > <SideBar></SideBar> </div>
    <div className='flex justify-center mt-20 ml-40'>
      {/* Doctor Card */}
      <div className='md:w-[66vh] flex flex-col items-center relative mb-2'>
        <div className='absolute inset-0'>
          <img 
            src={images.doctor} 
            alt="Doctor" 
            className='w-full h-full object-cover border-4 border-gray-300 mb-1  ml-3 rounded-xl shadow-lg'
          />
        </div>
        <div className='relative z-10 p-4 bg-white shadow-lg flex flex-col items-center '>
          <p className='text-gray-800 text-xl font-semibold'>Dr. Hermione M.B.B.S M.S.</p>
          <p className='text-gray-600'>Specialist in Cardiology</p>
        </div>
      </div>

      <div className='appointment-form'>
        <h2 className="form-title">DOCTOR APPOINTMENT</h2>
        <div className="calendar-container">
          <Calendar 
            onChange={handleDateChange} 
            value={date} 
            minDate={new Date()} 
            className="calendar"
          />
        </div>
        <div className="time-picker-container">
          <select onChange={handleTimeChange} value={time} className="time-picker">
            {generateTimeSlots().map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <div>
          <textarea 
            onChange={handleDescription} 
            value={description}  
            placeholder='Enter your description here' 
            className='description-textarea'
          ></textarea>
        </div>
        <button 
          onClick={handleSubmit} 
          className="submit-button"
        >
          Submit
        </button>

        {/* Alert Window */}
        {showAlert && (
          <div 
            className={`fixed top-4 right-4 ${
              alertType === 'success' ? 'bg-green-600' : 'bg-red-600'
            } text-white px-6 py-3 rounded-md shadow-lg z-50 flex items-center`}
          >
            {alertType === 'success' ? (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6 mr-2"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M13.875 18.825A9 9 0 105.175 10.125a9 9 0 008.7 8.7zm0 0l5.25 5.25" 
                  />
                </svg>
                <span>{alertMessage}</span>
              </>
            ) : (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6 mr-2"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v3.75m0 3.75h.008v-.008H12v.008zm9-7.5A9 9 0 1112 3a9 9 0 019 9z" 
                  />
                </svg>
                <span>{alertMessage}</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default BookAppointment;
