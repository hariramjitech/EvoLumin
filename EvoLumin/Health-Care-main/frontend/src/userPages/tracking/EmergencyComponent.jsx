import React, { useState } from 'react';
import axios from 'axios';
import { FaAmbulance, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import SideBar from '../../components/SideBar';

const EmergencyComponent = () => {
  const [messageStatus, setMessageStatus] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [followUpSent, setFollowUpSent] = useState(false);

  const playAlertSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  };

  const handleClick = async () => {
    playAlertSound();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const geocodingResponse = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );

            const address = geocodingResponse.data.display_name || 'Address not found';
            const locationMessage = `I am currently at ${address} (latitude: ${latitude}, longitude: ${longitude})  ,Email :  ${email}.`;

            // Make call with location message
            await axios.post('http://localhost:3000/user/make-call', {
              to_number: '+917418507391',
              location_message: locationMessage,
            });

            const emergencyMessage = `Emergency! My current location is https://maps.google.com/?q=${latitude},${longitude} Email : ${email}`;

            await axios.post('https://api.twilio.com/2010-04-01/Accounts/ACa9a0206ffbc0dd43b5103a451eb579b0/Messages.json',
              new URLSearchParams({
                'To': '+917418507391',
                'From': '+14109412314',
                'Body': emergencyMessage,
              }),
              {
                auth: {
                  username: 'ACa9a0206ffbc0dd43b5103a451eb579b0',
                  password: '01b35d6a904714d70db58e78cadb3567'
                },
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }
            );

            setMessageStatus('Emergency message sent successfully!');

            // Fetch nearby hospitals
            await fetchNearbyHospitals(latitude, longitude);

            // Set a timeout for 3 minutes to check if hospitals are found
            setTimeout(() => {
              if (latitude !== hospital.lat && longitude !== hospital.lon) {
                sendFollowUpAlert(latitude, longitude);
              }
            }, 2000); // 3 minutes in milliseconds

          } catch (error) {
            setMessageStatus('Failed to send emergency message. Error: ' + error.message);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          showError(error);
        }
      );
    } else {
      setMessageStatus("Geolocation is not supported by this browser.");
    }
  };

  const fetchNearbyHospitals = async (lat, lon) => {
    try {
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="hospital"](around:5000,${lat},${lon});out;`;
      const response = await axios.get(overpassUrl);

      const hospitalsData = response.data.elements.map(hospital => ({
        name: hospital.tags?.name || 'Unnamed Hospital',
        address: hospital.tags?.addr_full || 'Address not available',
        lat: hospital.lat,
        lon: hospital.lon,
      }));

      setHospitals(hospitalsData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
      setMessageStatus('Failed to fetch hospitals. Error: ' + error.message);
    }
  };

  const sendFollowUpAlert = async (latitude, longitude) => {
    try {
      const followUpMessage = `Help! I did not receive assistance yet. My location: https://maps.google.com/?q=${latitude},${longitude}`;
      
      await axios.post('https://api.twilio.com/2010-04-01/Accounts/ACfe06c50596d14e7ad2f2d10c10331682/Messages.json',
        new URLSearchParams({
          'To': '+917418507391',
          'From': '+14109412314',
          'Body': followUpMessage,
        }),
        {
          auth: {
            username: 'ACa9a0206ffbc0dd43b5103a451eb579b0',
            password: '01b35d6a904714d70db58e78cadb3567'
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      playAlertSound(); // Play sound alert
      setMessageStatus('No hospitals found. Follow-up message sent!');
      setFollowUpSent(true);
    } catch (error) {
      console.error('Failed to send follow-up message:', error);
      setMessageStatus('Failed to send follow-up message. Error: ' + error.message);
    }
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setMessageStatus('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setMessageStatus('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setMessageStatus('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        setMessageStatus('An unknown error occurred.');
        break;
      default:
        setMessageStatus('Error occurred while fetching location.');
    }
  };

  const email = localStorage.getItem('email')
  return (
    <div className='flex'>
      <SideBar/>
      <div className="ml-52 mt-5 flex flex-col justify-center items-center min-h-screen bg-white">
        <div className="shadow-lg rounded-lg p-8 md:p-12 max-w-lg mx-auto text-center bg-white">
          <h1 className="text-4xl font-bold mb-4 text-red-600">🚑 Emergency Alert 🚑</h1>
          <p className="text-lg mb-8">
            In case of an emergency, click the button below to send your location and alert your emergency contact.
          </p>

          <button
            onClick={handleClick}
            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white uppercase px-6 py-4 rounded-lg text-xl font-bold tracking-widest transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg"
          >
            <FaPhoneAlt className="mr-2" /> Emergency Call   
          </button>

          {messageStatus && (
            <p className={`mt-6 text-lg font-semibold ${messageStatus.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>
              {messageStatus}
            </p>
          )}
        </div>

        {/* Display nearby hospitals in a separate section */}
        {hospitals.length > 0 && (
          <div className="mt-8 w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Nearby Hospitals:</h2>
            <ul className="list-disc pl-5">
              {hospitals.map((hospital, index) => (
                <li key={index}>
                  <strong>{hospital.name}</strong><br />
                  <span>{hospital.address}</span><br />
                  <a href={`https://maps.google.com/?q=${hospital.lat},${hospital.lon}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    <FaMapMarkerAlt className="inline mr-1" /> View on Map
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyComponent;
