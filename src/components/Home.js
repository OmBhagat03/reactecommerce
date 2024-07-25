import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

function Home({ currentUser }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    const userCart = JSON.parse(localStorage.getItem(`${currentUser}_cart`)) || [];
    setCart(userCart);
  }, [currentUser]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem(`${currentUser}_cart`, JSON.stringify(updatedCart));

    setNotification(`${product.title} added to cart!`);
    setTimeout(() => {
      setNotification('');
    }, 3000); // Notification disappears after 3 seconds
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Store, {currentUser}!</h2>
      {notification && <div className="notification">{notification}</div>}
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
