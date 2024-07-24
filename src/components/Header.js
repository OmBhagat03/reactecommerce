import React from 'react';
import '../styles/Header.css';

function Header({ currentUser, onLogout, onViewChange }) {
  return (
    <header className="App-header">
      <h2 className='head'>Welcome, {currentUser || 'Guest'}</h2>
      <div className="header-actions">
        <button onClick={() => onViewChange('home')}>Home</button>
        {currentUser && (
          <>
            <button onClick={onLogout}>Logout</button>
            <div className="cart-icon" onClick={() => onViewChange('cart')}>
              <span role="img" aria-label="cart">🛒</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
