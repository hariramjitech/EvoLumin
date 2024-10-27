import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyProfile = () => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userLanguage, setUserLanguage] = useState('');
  const [userBloodGroup, setUserBloodGroup] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // BMI calculator states
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  // Initial user data fetched from backend
  const [initialUserData, setInitialUserData] = useState({});

  // Fetch user data from backend on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      // Fetch user details from backend
      axios
        .get(`http://localhost:3001/users/my-profile?userId=${storedUserId}`)
        .then((response) => {
          const { data } = response.data;
          setInitialUserData(data); // Save the initial user data
          setUserName(data.name);
          setUserEmail(data.email);
          setUserPassword(data.password);
          setUserNumber(data.number);
          setUserLanguage(data.language || '');
          setUserBloodGroup(data.BloodGroup || '');
          setUserBirth(data.birth || '');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to toggle between edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to save updated user details
  const handleSave = () => {
    const updatedUser = {
      userId,
      name: userName,
      email: userEmail,
      password: userPassword,
      number: userNumber,
      language: userLanguage,
      BloodGroup: userBloodGroup,
      birth: userBirth,
    };

    axios
      .put(`http://localhost:3000/users/edit-profile`, updatedUser)
      .then((response) => {
        console.log('Profile updated', response.data);
        setIsEditing(false); // Switch back to non-editing mode
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to revert changes made in edit mode
  const handleCancel = () => {
    setUserName(initialUserData.name);
    setUserEmail(initialUserData.email);
    setUserPassword(initialUserData.password);
    setUserNumber(initialUserData.number);
    setUserLanguage(initialUserData.language || '');
    setUserBloodGroup(initialUserData.BloodGroup || '');
    setUserBirth(initialUserData.birth || '');
    setIsEditing(false);
  };

  // Function to calculate BMI
  const calculateBMI = () => {
    if (weight && height) {
      let heightInMeters;

      switch (heightUnit) {
        case 'cm':
          heightInMeters = height / 100; 
          break;
        case 'm':
          heightInMeters = height; 
          break;
        case 'inches':
          heightInMeters = height * 0.0254; 
          break;
        case 'feet':
          heightInMeters = height * 0.3048; 
          break;
        default:
          heightInMeters = height / 100; 
      }

      const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBMI);

      // Determine BMI category
      if (calculatedBMI < 18.5) {
        setBmiCategory('Underweight');
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
        setBmiCategory('Normal weight');
      } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obesity');
      }
    }
  };

  // Function to get BMI category class for styling
  const getBmiClass = () => {
    if (bmiCategory === 'Underweight') return 'text-blue-500';
    if (bmiCategory === 'Normal weight') return 'text-green-500';
    if (bmiCategory === 'Overweight') return 'text-yellow-500';
    if (bmiCategory === 'Obesity') return 'text-red-500';
    return '';
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-8 flex flex-col space-y-8">
        
        {/* Profile Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
          <h2 className="text-3xl font-semibold text-center mb-6">Patient Profile</h2>
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-full mb-6"
            />
          </div>

          <div className="space-y-6">
            {/* Name */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{userName || 'N/A'}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Email:</span>
              {isEditing ? (
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{userEmail || 'N/A'}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Phone Number:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={userNumber}
                  onChange={(e) => setUserNumber(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{userNumber || 'N/A'}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Password:</span>
              {isEditing ? (
                <input
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">••••••</span>
              )}
            </div>

            {/* Language */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Language:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={userLanguage}
                  onChange={(e) => setUserLanguage(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{userLanguage || 'N/A'}</span>
              )}
            </div>

            {/* Blood Group */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Blood Group:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={userBloodGroup}
                  onChange={(e) => setUserBloodGroup(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{userBloodGroup || 'N/A'}</span>
              )}
            </div>

            {/* Birth Date */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Date of Birth:</span>
              {isEditing ? (
                <input
                  type="date"
                  value={userBirth}
                  onChange={(e) => setUserBirth(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{userBirth || 'N/A'}</span>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* BMI Calculator */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full mt-8">
          <h2 className="text-3xl font-semibold text-center mb-6">BMI Calculator</h2>

          <div className="space-y-6">
            {/* Weight */}
            <div className="flex justify-between items-center mr-8">
              <span className="font-medium text-gray-600">Weight (kg):</span>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"
              />
            </div>

            {/* Height */}
            <div className="flex justify-between items-center mr-8">
              <span className="font-medium text-gray-600">Height:</span>
              <div className="flex">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px] mr-1"
                />
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="cm">CM</option>
                  <option value="m">M</option>
                  <option value="inches">Inches</option>
                  <option value="feet">Feet</option>
                </select>
              </div>
            </div>

            {/* BMI Button */}
            <div className="flex justify-center">
              <button
                onClick={calculateBMI}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Calculate BMI
              </button>
            </div>

            {/* BMI Result */}
            {bmi && (
              <div className="text-center mt-6">
                <p className="text-lg font-medium">Your BMI: {bmi}</p>
                <p className={`text-lg font-semibold ${getBmiClass()}`}>
                  Category: {bmiCategory}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
