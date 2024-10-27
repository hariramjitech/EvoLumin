import React, { useEffect, useState } from "react";
import { images } from "../assets/images";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Header = () => {
  const [logged, setLogged] = useState(false);
  const [email, setUserEmail] = useState('');
  const [loginType, setLoginType] = useState(false);
  const navigate = useNavigate();

  // Use useEffect to check localStorage and set loginType without causing infinite renders
   // Empty dependency array to run only once on mount

  function appointments() {
    const userId = localStorage.getItem('userId');
    console.log(userId);

    axios
      .get(`http://localhost:3001/users/my-profile?userId=${userId}`)
      .then((response) => {
        setUserEmail(response.data.data.email);
        console.log(email);
        navigate(`/my-appointments/${email}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setLogged(true);
        console.log(logged);
      }
    }, 300); // Refresh every 300ms

    return () => clearInterval(interval);
  }, [logged]);
  useEffect(() => {
    const interval = setInterval(() => {
      const login = localStorage.getItem('login-type');
    if (login === "user") {
      setLoginType(true);
      console.log(loginType)
    }
    if(login ==="admin"){
      setLoginType(false);
      console.log(loginType)
    }
    }, 300); // Refresh every 300ms

    return () => clearInterval(interval);
  }, [loginType]);
  

  function logout() {
    setLogged(false);
    navigate('/');
    localStorage.removeItem('userId');
    localStorage.removeItem('login-type');
    setLoginType(true);

  }

  function myProfile() {
    navigate('/my-profile');
  }

  return (
    <div className="flex items-center justify-between px-10 mb-10" style={{ backgroundColor: '#225452' }}>
      
      {/* Logo */}
      <img className="w-40 py-5" src={images.logo} alt="Logo" />

      {/* Navigation Links */}
      {loginType ? (
        <div className="flex-grow flex justify-end space-x-8 items-center">
          {logged && (
            <>
              <Link to="/" className="text-white hover:scale-125 text-[18px] hidden lg:block">Home</Link>
              <Link to="/appointment" className="text-white hover:scale-125 text-[18px] hidden lg:block">Book Appointment</Link>
              <Link to="/ecommerce-store" className="text-white hover:scale-125 text-[18px] hidden lg:block">Pharmacy</Link>
              <Link to="/about" className="text-white hover:scale-125 text-[18px] hidden lg:block">About Us</Link>
              <p className="text-white hover:scale-125 text-[18px] cursor-pointer hidden lg:block" onClick={appointments}>My Appointments</p>
              <Link to="/contact" className="text-white hover:scale-125 text-[18px] hidden lg:block">Contact Us</Link>
              <Link to="/ai" className="text-white hover:scale-125 text-[18px] hidden lg:block">Care AI</Link>
            </>
          )}

          {/* Profile and Logout Button */}
          <div className="relative flex items-center gap-2 cursor-pointer group">
            {logged ? (
              <>
                <img className="w-8" src={images.profile} alt="Profile" />
                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p onClick={myProfile} className="hover:text-black cursor-pointer">My Profile</p>
                    <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/signup" className="ml-[900px] bg-slate-200 p-2 rounded-[10px] -m-2">Create Account</Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-end space-x-4 items-center">
          <Link to="/consultancy" className="bg-slate-200 text-black p-3 rounded-[10px]">Video Consultancy</Link>
          <Link to="/inventory-chart" className="bg-slate-200 p-3 rounded-[10px]">Inventory</Link>
          <Link to="/alert" className="bg-red-600 text-white p-3 rounded-[10px]">SOS</Link>
          <button onClick={logout} className="bg-slate-200 p-3 rounded-[10px]">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;