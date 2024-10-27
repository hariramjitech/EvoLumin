import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { images } from '../assets/images';
import { Link } from 'react-router-dom';
import EmergencyAppointment from './EmergencyAppointment';

const AllAppointment = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('normal'); // Default sort option
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

  useEffect(() => {
    axios
      .get('http://localhost:3001/appointments/admin/all-appointments')
      .then((response) => {
        const data = response.data.data;
        setAppointmentsData(data);
        filterAppointments(searchTerm, sortBy, data); // Filter and sort upon data load
      })
      .catch((error) => console.log(error));
  }, []);

  // Filter appointments based on the search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterAppointments(term, sortBy, appointmentsData);
  };

  // Sort appointments based on the selected option
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    filterAppointments(searchTerm, sortValue, appointmentsData);
  };

  // Function to filter appointments
  const filterAppointments = (term, sortValue, data) => {
    const filtered = data.filter((appointment) => {
      const matchesEmail = appointment.email.toLowerCase().includes(term);
      const appointmentDate = new Date(appointment.slot).toLocaleDateString();
      const todayDate = new Date().toLocaleDateString();

      // Check if we are filtering by today
      const matchesToday = sortValue === 'today' ? appointmentDate === todayDate : true;

      return matchesEmail && matchesToday;
    });

    // Sort the filtered data and update the state
    sortAppointments(filtered, sortValue);
  };

  // Function to sort appointments
  const sortAppointments = (appointments, sortValue) => {
    const sortedAppointments = [...appointments].sort((a, b) => {
      const appointmentDateA = new Date(a.slot).getTime();
      const appointmentDateB = new Date(b.slot).getTime();

      if (sortValue === 'normal') {
        return appointmentDateB - appointmentDateA; // Sort by date descending (latest first)
      } else if (sortValue === 'date') {
        return appointmentDateA - appointmentDateB; // Sort by date ascending
      }
      return 0; // Default case, no sorting
    });

    setFilteredData(sortedAppointments); // Update the state with sorted appointments
  };

  // Function to open the appointment form
  const handleEmergencyClick = () => setIsFormVisible(true);

  // Function to close the appointment form
  const closeForm = () => setIsFormVisible(false);

  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="mb-8 text-4xl font-bold text-gray-800 text-center">All Appointments</h2>
      
      <div className="mb-4 flex space-x-4">
        <button 
          onClick={handleEmergencyClick} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Emergency Appointment
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by email..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="normal">Latest First</option>
          <option value="today">Today</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      {isFormVisible && <EmergencyAppointment onClose={closeForm} />}

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-600 border-r">No</th>
              <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-600 border-r">Email</th>
              <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-600 border-r">Date</th>
              <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-600 border-r">Time</th>
              <th className="border-b border-gray-300 px-6 py-4 text-center text-sm font-semibold text-gray-600">Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((appointment, index) => (
              <tr key={appointment._id} className="hover:bg-gray-50 transition duration-200">
                <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700 text-center border-r">{index + 1}</td>
                <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700 text-center border-r">{appointment.email}</td>
                <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700 text-center border-r">
                  {new Date(appointment.slot).toLocaleDateString()}
                </td>
                <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700 text-center border-r">
                  {new Date(appointment.slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="border-b border-gray-300 px-6 py-4 text-center">
                  <Link to={`/appointment/${appointment._id}`}>
                    <img className="w-8 h-8 mx-auto" src={images.info} alt="Info" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointment;
