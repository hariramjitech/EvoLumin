import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';

const IsolationInfo = () => {
  const [response, setResponse] = useState({});
  const [profileData, setProfileData] = useState({});
  const { _id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const userType = localStorage.getItem('type');
    if (userType === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/user/illness/request-info/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResponse(result.data);
        setPermissionGranted(result.data.isolated);

        if (result.data.email) {
          fetchProfileData(result.data.email);
        }
      } catch (error) {
        console.error('Error fetching isolation request info:', error);
      }
    };
    fetchData();
  }, [_id]);

  const fetchProfileData = async (email) => {
    try {
      const result = await axios.get(`http://localhost:3000/user/profile/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(result.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handlePermissionChange = async () => {
    try {
      await axios.put(
        `http://localhost:3000/user/illness/update-permission/${_id}`,
        { isolated: !permissionGranted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPermissionGranted(!permissionGranted);
      alert('Permission status updated successfully');
    } catch (error) {
      console.error('Error updating permission:', error);
      alert('Failed to update permission');
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="flex flex-col bg-white p-10 rounded-[20px] shadow-lg w-2/3 max-w-[600px]">
          <p className="text-3xl mb-10 text-[#c9184a]">Isolation Request Info</p>
          <div className="flex mb-5 text-gray-800">
            <p className="font-semibold w-40">Name:</p>
            <p>Jayasurya R</p>
          </div>
          <div className="flex mb-5 text-gray-800">
            <p className="font-semibold w-40">Email:</p>
            <p>{response.email || 'N/A'}</p>
          </div>
          <div className="flex mb-5 text-gray-800">
            <p className="font-semibold w-40">Illness:</p>
            <p>{response.illness || 'N/A'}</p>
          </div>
          <div className="flex mb-5 text-gray-800">
            <p className="font-semibold w-40">Symptoms:</p>
            <p>{response.symptoms || 'N/A'}</p>
          </div>
          <div className="flex mb-5 text-gray-800">
            <p className="font-semibold w-40">Permission:</p>
            <p>{permissionGranted ? 'Granted' : 'Not Granted Yet'}</p>
          </div>
          <div className="flex mb-5 text-gray-800">
            <p className="font-semibold w-40">Isolation Start Date:</p>
            <p>{response.updatedAt || 'N/A'}</p>
          </div>
          <div className="flex mb-5 text-gray-800">
            <p className="font-semibold w-40">Isolation End Date:</p>
            <p>{response.isolationenddate || 'N/A'}</p>
          </div>

          {isAdmin && (
            <div className="mt-5">
              <button
                className={`${
                  permissionGranted ? 'bg-[#c9184a]' : 'bg-green-500'
                } hover:bg-[#9b1339] text-white py-2 px-4 rounded transition-all`}
                onClick={handlePermissionChange}
              >
                {permissionGranted ? 'Revoke Permission' : 'Grant Permission'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IsolationInfo;
