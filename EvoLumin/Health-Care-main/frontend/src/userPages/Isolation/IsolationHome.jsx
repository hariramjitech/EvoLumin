import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import Button1 from '../../components/reuse/button1';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IsolationHome = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      setError('Email not found in local storage. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/illness/my-requests/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Failed to fetch requests. Please try again later.');
        setLoading(false);
      }
    };

    fetchRequests();
  }, [email]);

  const handleInfoClick = (request) => {
    navigate(`/isolation/info/${request._id}`);
  };

  // Animation variants for row entry
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col p-8 w-full max-w-6xl mx-auto bg-white rounded-md shadow-lg">
        <Link to="/form">
          <div className="flex justify-end mb-4">
            <Button1 contain="New Request" />
          </div>
        </Link>
        <h1 className="text-4xl font-bold text-[#2b2b2b] mb-8">Isolation Requests</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto min-h-screen bg-white rounded-lg shadow-md border border-gray-300">
            <motion.table
              className="min-w-full bg-gray-100"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-3 px-4 border-b text-left">Email</th>
                  <th className="py-3 px-4 border-b text-left">Illness</th>
                  <th className="py-3 px-4 border-b text-left">Symptoms</th>
                  <th className="py-3 px-4 border-b text-left">Isolation Start Date</th>
                  <th className="py-3 px-4 border-b text-left">Isolation End Date</th>
                  <th className="py-3 px-4 border-b text-left">Info</th>
                </tr>
              </thead>
              <motion.tbody>
                {requests.length > 0 ? (
                  requests.map((request, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-200 transition-all"
                      variants={rowVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <td className="py-3 px-4 border-b text-gray-700">{request.email}</td>
                      <td className="py-3 px-4 border-b text-gray-700">{request.illness}</td>
                      <td className="py-3 px-4 border-b text-gray-700">{request.symptoms}</td>
                      <td className="py-3 px-4 border-b text-gray-700">
                        {new Date(request.isolationstartdate || request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-700">
                        {request.isolationenddate ? new Date(request.isolationenddate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <motion.button
                          className="bg-[#e62e62] hover:bg-[#ff5678] text-white py-1 px-3 rounded-md transition-all shadow-sm hover:shadow-lg hover:shadow-[#ff5678]/60"
                          onClick={() => handleInfoClick(request)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Info
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-600">
                      No requests found
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

export default IsolationHome;
