import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/SignUp.css'; // Keep your existing custom CSS

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Alert state
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // success or error

  const navigate = useNavigate();

  // Stricter email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const createUser = (e) => {
    e.preventDefault();

    // Validate email format
    if (!emailRegex.test(email)) {
      setAlertMessage('Please enter a valid email address!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // Hide after 2 seconds
      return; // Stop the form submission if the email is invalid
    }

    const data = {
      name,
      email,
      password,
      number,
    };

    setLoading(true);

    axios
      .post('http://localhost:3001/users', data)
      .then(() => {
        setLoading(false);
        setAlertMessage('Sign up successful! Redirecting to login...');
        setAlertType('success');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate('/login');
        }, 2000); // Hide alert and navigate after 2 seconds
      })
      .catch((error) => {
        setLoading(false);
        setAlertMessage(`Error: ${error.message}. Please check the console for details.`);
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000); // Hide after 2 seconds
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      {loading ? <Spinner /> : ''}

      {/* Alert window */}
      {showAlert && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg text-white ${
            alertType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {alertMessage}
        </div>
      )}

      <h1 className="title">SIGN UP</h1>
      <form className="form" onSubmit={createUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
          placeholder="Enter Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
          placeholder="Enter Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
          placeholder="Enter Password"
          required
        />
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="input"
          type="text"
          placeholder="Enter mobile number"
          required
        />
        <button type="submit" className="form-btn">
          SUBMIT
        </button>
      </form>
      <div className="buttons-container">
        <p className="sign-up-label">Already have an account?</p>
        <button
          onClick={() => navigate('/login')}
          className="sign-up-link"
        >
          Login
        </button>
        <p className="sign-up-label">Are you an Admin?</p>
        <button
          onClick={() => navigate('/admin-login')}
          className="sign-up-link"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default SignUp;
