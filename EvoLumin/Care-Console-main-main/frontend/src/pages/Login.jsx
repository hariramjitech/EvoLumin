import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';  // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toSignup = () => {
    navigate('/signup');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Please provide valid data');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/users/find-user', {
        params: { email, password },
      });

      if (!response.data || !response.data.data) {
        alert('User not found!');
      } else {
        const userId = response.data.data._id;
        navigate(`/${userId}`);
        localStorage.setItem('userId', userId);
        localStorage.setItem('login-type', 'user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <p className="title">Login</p>
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
        <p className="sign-up-label">
          New here? 
          <span className="sign-up-link" onClick={toSignup}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
