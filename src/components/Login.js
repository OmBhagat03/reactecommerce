import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ onLogin, onViewChange }) {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginInfo);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={loginInfo.username} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={loginInfo.password} onChange={handleChange} required />
        </label>
        <button type="submit">Login</button>
        <button type="button" onClick={() => onViewChange('register')}>Register</button>
      </form>
    </div>
  );
}

export default Login;
