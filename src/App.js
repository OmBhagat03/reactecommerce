import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [view, setView] = useState('login'); // 'login', 'register', 'home', or 'cart'
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegister = (userInfo) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userInfo);
    localStorage.setItem('users', JSON.stringify(users));
    setView('login');
  };

  const handleLogin = (loginInfo) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === loginInfo.username && user.password === loginInfo.password);
    if (user) {
      setCurrentUser(user.username);
      setView('home');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };

  return (
    <div className="App">
      <Header currentUser={currentUser} onLogout={handleLogout} onViewChange={setView} />
      <main className="App-content">
        {view === 'login' ? (
          <Login onLogin={handleLogin} onViewChange={setView} />
        ) : view === 'register' ? (
          <Register onRegister={handleRegister} onViewChange={setView} />
        ) : view === 'home' ? (
          <Home currentUser={currentUser} onLogout={handleLogout} />
        ) : (
          <Cart currentUser={currentUser} onViewChange={setView} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
