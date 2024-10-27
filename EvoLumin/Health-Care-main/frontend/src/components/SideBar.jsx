 import React, { useEffect, useState } from 'react';
import { images } from '../assets/images';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem('type');
    setIsAdmin(type === 'admin');
  }, []);

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  const menuItems = isAdmin 
    ? [
        { to: '/track', img: images.info, text: 'Track Info' },
        { to: '/isolation/info/all', img: images.tablet, text: 'Isolation' },
      ]
    : [
        { to: '/info', img: images.info, text: 'My Info' },
        { to: '/isolation/home', img: images.isolation, text: 'Isolation' },
        { to: '/video/all', img: images.video, text: 'Consultancy' },
        { to: '/ecommerce-store', img: images.medicine, text: 'Pharmacy' },
        { to: '/appointment', img: images.isolation, text: 'Appoinment' },
      ];

  return (
    <div className="bg-white w-[350px] h-screen flex flex-col justify-between shadow-lg ">
      <div>
        <div className="flex items-center py-6 px-8 border-b border-gray-300">
          <img src={images.logo} alt="Logo" className="w-10" />
          <span className="ml-3 text-xl font-semibold text-black">Health Care</span>
        </div>

        <div className="px-9 mt-3">
          <p className="text-sm font-bold mb-6 text-black">MENU</p>
          {menuItems.map(item => (
            <Link to={item.to} key={item.text}>
              <div className="flex items-center py-2 mt-2 px-9 hover:bg-[#e62e62] rounded-md cursor-pointer transition-all bg-gray-100">
                <img src={item.img} className="w-5 h-5 mr-4 opacity-60" alt={item.text} />
                <p className="text-black">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-8 mb-6">
        <Link to='/emergency'>
        <button
          
          className="w-full bg-[#c9184a] hover:bg-[#9b1339] text-white py-2 rounded-md transition-all 
            shadow-sm hover:shadow-lg hover:shadow-[#ff5678]/60 mb-5"
        >
       
          EMERGENCY
        </button>
        </Link>
        <button
          onClick={logout}
          className="w-full bg-[#c9184a] hover:bg-[#9b1339] text-white py-2 rounded-md transition-all 
            shadow-sm hover:shadow-lg hover:shadow-[#ff5678]/60"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default SideBar;
 