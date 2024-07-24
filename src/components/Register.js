import React, { useState } from 'react';
import '../styles/Register.css';

function Register({ onRegister, onViewChange }) {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userInfo);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={userInfo.username} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={userInfo.password} onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
        <button type="button" onClick={() => onViewChange('login')}>Back to Login</button>
      </form>
    </div>
  );
}

export default Register;
