import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrackList = () => {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    axios.get('http://localhost:3000/user/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setErrorMsg('Error fetching users');
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="container mx-auto pt-10 p-8 shadow-lg bg-white rounded-md w-11/12 max-w-6xl">
      <h2 className="text-4xl font-bold text-[#2b2b2b] mb-8">User List</h2>
      {errorMsg && <p className="text-[#970202] text-lg mb-4">{errorMsg}</p>}
      
      {users.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 bg-gray-100 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-4 text-left text-gray-700 text-[20px]">Name</th>
              <th className="border border-gray-300 p-4 text-left text-gray-700 text-[20px]">Email</th>
              <th className="border border-gray-300 p-4 text-left text-gray-700 text-[20px]">Latitude</th>
              <th className="border border-gray-300 p-4 text-left text-gray-700 text-[20px]">Longitude</th>
              <th className="border border-gray-300 p-4 text-left text-gray-700 text-[20px]">Map</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="transition-all duration-200 ease-in-out bg-white hover:bg-gray-100">
                <td className="border border-gray-300 p-4 text-gray-700">{user.name}</td>
                <td className="border border-gray-300 p-4 text-gray-700">{user.email}</td>
                <td className="border border-gray-300 p-4 text-gray-700">{user.location?.latitude || 'N/A'}</td>
                <td className="border border-gray-300 p-4 text-gray-700">{user.location?.longitude || 'N/A'}</td>
                <td className="border border-gray-300 p-4">
                  <button 
                    onClick={() => navigate(`/map/${user._id}`)}
                    className="bg-[#e62e62] hover:bg-[#ff5678] text-white font-semibold py-2 px-6 rounded-md 
                      transition-all shadow-sm hover:shadow-lg hover:shadow-[#ff5678]/60"
                  >
                    View Map
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-xl text-[#97022d] mt-6">No users found.</p>
      )}
    </div>
  );
};

export default TrackList;
