// src/components/EmergencyAppointment.jsx
import React, { useState } from 'react';
import axios from 'axios';

const 

EmergencyAppointment = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to create a new appointment
    axios.post('http://localhost:3001/appointments', {
      name,          // Include name
      email,         // Include email
      date,          // Include date
      time,          // Include time
      description,   // Include description
    })
    .then(() => {
      // Reset form and close the form after successful submission
      setName('');
      setEmail('');
      setDate('');
      setTime('');
      setDescription('');
      onClose(); // Close the form
    })
    .catch((error) => {
      console.error('Error creating appointment:', error);
    });
  };

  return (
    <div className="modal">
      <h2 className="text-2xl mb-4">Create Emergency Appointment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          required
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          required
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Create Appointment
        </button>
        <button type="button" onClick={onClose} className="text-red-500 underline">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmergencyAppointment;
