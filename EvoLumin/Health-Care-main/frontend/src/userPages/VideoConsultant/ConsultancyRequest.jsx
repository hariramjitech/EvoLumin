import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import { images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const ConsultancyRequest = () => {
  const email = localStorage.getItem('email');
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctorId, setDoctorId] = useState('');
  const [description, setDescription] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [duration] = useState(15);
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem('token');

  const doctors = [
    { id: 'doctor1', name: 'Dr. Hermoine Granger', image: images.doctor1, qualifications: 'M.B.B.S' },
    { id: 'doctor2', name: 'Dr. John Snow', image: images.doctor2, qualifications: 'M.B.B.S, M.D' }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate && doctorId) {
      const date = selectedDate.toISOString().split('T')[0]; // Only fetch appointments for the selected date
      setLoading(true); // Start loading
      axios
        .get('http://localhost:3000/user/appointments', {
          headers: {
            'Authorization': `Bearer ${token}` // Attach the token in the Authorization header
          },
          params: { doctorId, date } // Query params sent to backend
        })
        .then((response) => {
          setBookedSlots(response.data.map((slot) => new Date(slot.date)));
        })
        .catch((error) => console.error('Error fetching booked slots:', error))
        .finally(() => setLoading(false)); // Stop loading
    }
  }, [selectedDate, doctorId]);

  const handleBookSlot = () => {
    if (!selectedDate || !doctorId || !description.trim()) {
      alert('Please select a doctor, date, time, and enter a description.');
      return;
    }

    const appointment = {
      doctorId,
      date: selectedDate.toISOString().split('.')[0] + 'Z', // Standardize to UTC
      duration,
      email,
      description,
    };

    axios
      .post(
        'http://localhost:3000/user/appointments',
        appointment, // Request body
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      )
      .then((response) => {
        alert('Appointment booked successfully');
        setBookedSlots([...bookedSlots, selectedDate]); // Add booked slot to the list
        navigate('/video/all');
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Error booking appointment';
        alert(errorMessage);
      });
  };

  const isSlotBooked = (time) => {
    return bookedSlots.some((slot) => slot.getTime() === time.getTime());
  };

  const filterTime = (time) => {
    return !isSlotBooked(time);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col p-4 w-full">
        <h1 className="text-3xl font-bold text-[#c9184a] mb-6">Book a Video Consultancy</h1>

        <motion.div
          className="flex justify-evenly w-full mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className={`w-[200px] pt-4 rounded-lg shadow-lg transition-transform duration-300 cursor-pointer ${doctorId === doctor.id ? 'scale-105' : ''}`}
                onClick={() => setDoctorId(doctor.id)} // Update doctorId on image click
              />
              <p className="mt-2 text-lg font-medium">{doctor.name} <br /> {doctor.qualifications}</p>
              <label className="flex items-center mt-2 cursor-pointer">
                <input
                  type="radio"
                  name="doctor"
                  value={doctor.id}
                  checked={doctorId === doctor.id}
                  onChange={() => setDoctorId(doctor.id)} // Keep this for compatibility
                  className="hidden"
                />
                <span className={`w-6 h-6 mr-2 border-2 rounded-full flex justify-center items-center transition-all duration-300 ${doctorId === doctor.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                  {doctorId === doctor.id && (
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                  )}
                </span>
                <span className="text-gray-700 text-lg">Select Doctor</span>
              </label>
            </motion.div>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
          </div>
        ) : (
          <motion.div
  className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 ml-[404px] justify content-center
  "
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    showTimeSelect
    dateFormat="MMMM d, yyyy h:mm aa"
    timeIntervals={15}
    minTime={new Date().setHours(9, 0)}
    maxTime={new Date().setHours(17, 0)}
    filterTime={filterTime}
    minDate={new Date()}
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    placeholderText="Select a date and time"
  />

  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="mt-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    placeholder="Enter a description for your consultation"
  />

  {/* Centering the button using flex utilities */}
  <div className="flex justify-center">
    <motion.button
      onClick={handleBookSlot}
      className="mt-4 bg-[#c9184a] text-white py-2 px-4 rounded-md hover:bg-[#9b1339] transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      Book Slot
    </motion.button>
  </div>
</motion.div>

        )}
      </div>
    </div>
  );
};

export default ConsultancyRequest;
