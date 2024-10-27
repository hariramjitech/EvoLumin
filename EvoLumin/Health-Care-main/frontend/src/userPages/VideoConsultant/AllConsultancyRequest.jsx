import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import { Link } from 'react-router-dom';
import Button1 from '../../components/reuse/button1';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

const AllConsultancyRequest = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/user/appointments/all/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [email]);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col p-4 w-full">
        <div className="flex justify-end mb-4">
          <Link to="/video/request">
            <Button1 contain={'New Video Appointment Booking'} />
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#c9184a] mb-6">Appointments</h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
          </div>
        ) : (
          <div className="overflow-x-auto min-h-screen bg-white rounded-lg shadow-lg border border-gray-200">
            <motion.table
              className="min-w-full bg-white"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <thead>
                <tr className="bg-[#f3f3f3] text-gray-700">
                  <th className="py-2 px-4 border-b text-left">Appointment ID</th>
                  <th className="py-2 px-4 border-b text-left">Doctor</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Duration</th>
                  <th className="py-2 px-4 border-b text-left">Patient</th>
                  <th className="py-2 px-4 border-b text-left">Video Link</th>
                </tr>
              </thead>
              <motion.tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <motion.tr
                      key={appointment._id}
                      className="hover:bg-[#ffe6ea] transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <td className="py-2 px-4 border-b text-gray-800">{appointment._id}</td>
                      <td className="py-2 px-4 border-b text-gray-800">
                        {appointment.doctorId === 'doctor2' ? 'Dr. John Snow' : 'Dr. Hermione'}
                      </td>
                      <td className="py-2 px-4 border-b text-gray-800">
                        {new Date(appointment.date).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border-b text-gray-800">{appointment.duration} minutes</td>
                      <td className="py-2 px-4 border-b text-gray-800">{appointment.email}</td>
                      <td className="py-2 px-4 border-b">
                        <Link to={`/video/consultant/${appointment.videolink}`}>
                          <p className="text-[#c9184a] underline hover:text-[#9b1339] transition-all">Join Video</p>
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-600">
                      No appointments found
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </motion.table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllConsultancyRequest;
