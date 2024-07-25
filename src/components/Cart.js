import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';

function Cart({ currentUser, onViewChange }) {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const userCart = JSON.parse(localStorage.getItem(`${currentUser}_cart`)) || [];
    const updatedCart = userCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(updatedCart);
  }, [currentUser]);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem(`${currentUser}_cart`, JSON.stringify(newCart));
  };

  const handleRemoveItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const handleIncreaseQuantity = (index) => {
    const newCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const handleDecreaseQuantity = (index) => {
    const newCart = cartItems.map((item, i) =>
      i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCart(newCart);
  };

  const handleCheckout = () => {
    updateCart([]);
    setNotification('Thank you for your purchase!');
    setTimeout(() => {
      setNotification('');
    }, 3000); // Notification disappears after 3 seconds
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 1), 0)
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>{currentUser}'s Cart</h2>
      {notification && <div className="notification">{notification}</div>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                    <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                    <button onClick={() => handleRemoveItem(index)} className="remove-button">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${calculateTotal()}</h3>
            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
