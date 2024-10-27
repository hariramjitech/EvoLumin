import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Login.css'; // Import the CSS file for consistent styling
import Back from './Back';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Please provide valid data');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/admin/find-admin', {
        params: { email, password },
      });

      setAdminInfo(response.data);
      if (!response.data || !response.data.data) {
        alert('User not found!');
      } else {
        localStorage.setItem('userId', response.data.data._id);
        localStorage.setItem('login-type', 'admin');
        navigate('/admin/all-appointment');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>  <Link to={'/signup'}>
    <Back />
  </Link>>
    <div className="form-container">
     
      <p className="title">Admin Login</p>
      <form className="form" onSubmit={submit}>
        <input
          type="email"
          className="input"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
