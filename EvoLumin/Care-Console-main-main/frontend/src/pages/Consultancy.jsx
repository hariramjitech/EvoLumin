import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Consultancy = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch all appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/appointments/all');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments based on search input
  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName = appointment.doctorId === 'doctor1' ? 'Dr.Hermoine' : 'Dr.John Snow';
    return (
      doctorName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.email.toLowerCase().includes(search.toLowerCase()) ||
      new Date(appointment.date).toLocaleDateString().includes(search)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Video Consultations</h1>
      <input
        type="text"
        placeholder="Search by Doctor, Date, or Email"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 border-b text-left w-1/6">Doctor ID</th>
              <th className="py-3 px-6 border-b text-left w-1/5">Date</th>
              <th className="py-3 px-6 border-b text-center w-1/6">Duration (min)</th>
              <th className="py-3 px-6 border-b text-left w-1/4">Email</th>
              <th className="py-3 px-6 border-b text-left w-1/5">Description</th>
              <th className="py-3 px-6 border-b text-center w-1/5">Video Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-gray-100">
                <td className="py-2 px-6 border-b">
                  {appointment.doctorId === 'doctor1' ? <p>Dr.Hermoine</p> : <p>Dr.John Snow</p>}
                </td>
                <td className="py-2 px-6 border-b">
                  {new Date(appointment.date).toLocaleString()}
                </td>
                <td className="py-2 px-6 border-b text-center">{appointment.duration}</td>
                <td className="py-2 px-6 border-b">{appointment.email}</td>
                <td className="py-2 px-6 border-b">{appointment.description || 'N/A'}</td>
                <td className="py-2 px-6 border-b text-center">
                  {appointment.videolink ? (
                    <Link to={`/jitsimeet/${appointment.videolink}`}>
                      <p className="text-blue-700 underline">Join</p>
                    </Link>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAppointments.length === 0 && <p className="text-center mt-4">No results found.</p>}
      </div>
    </div>
  );
};

export default Consultancy;
