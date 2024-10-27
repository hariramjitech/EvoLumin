import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { images } from '../assets/images';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AllAppointment = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [sortCriterion, setSortCriterion] = useState('date'); // State for sort criterion
  const [sortDirection, setSortDirection] = useState('asc'); // State for sort direction
  const { email } = useParams();
  console.log(email);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/appointments/my-appointments?email=${email}`)
      .then((response) => {
        setAppointmentsData(response.data.data);
        console.log(response.data);
      });
  }, [email]);

  // Function to sort appointments
  const sortAppointments = () => {
    const sortedAppointments = [...appointmentsData].sort((a, b) => {
      if (sortCriterion === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortCriterion === 'prescription') {
        return (a.prescription ? 1 : 0) - (b.prescription ? 1 : 0); // Sort by prescription presence
      }
      return 0; // Fallback
    });
    setAppointmentsData(sortedAppointments);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); // Toggle sort direction
  };

  // Handle sorting criteria change
  const handleCriterionChange = (event) => {
    setSortCriterion(event.target.value);
    sortAppointments(); // Sort immediately when criterion changes
  };

  console.log(appointmentsData);
  return (
    <div className='mb-96'>
      <div>
        <p className='mb-10 font-medium text-3xl ml-5'>ALL APPOINTMENTS</p>
        
        <div className="mb-4">
          <label className="mr-2">Sort by:</label>
          <select value={sortCriterion} onChange={handleCriterionChange} className="p-2 border rounded">
            <option value="date">Date</option>
            <option value="prescription">Prescription Added</option>
          </select>
          <button onClick={sortAppointments} className="ml-2 p-2 bg-blue-500 text-white rounded">
            Sort {sortDirection === 'asc' ? '↓' : '↑'}
          </button>
        </div>

        <div>
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded-md'>No</th>
                <th className='border border-slate-600 rounded-md'>Email</th>
                <th className='border border-slate-600 rounded-md max-md:hidden'>Date</th>
                <th className='border border-slate-600 rounded-md'>Time</th>
                <th className='border border-slate-600 rounded-md'>Info</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((appointment, index) => {
                return (
                  <tr key={appointment._id} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{appointment.email}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{appointment.date}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{appointment.time}</td>
                    <td className='border border-slate-700 rounded-md text-center'>
                      <div className='flex justify-center'>
                        <Link to={`/appointmentDetails/${appointment._id}`}>
                          <img className='w-6' src={images.info} alt=''></img>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAppointment;
