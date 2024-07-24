import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

function Home({ currentUser }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Store, {currentUser}!</h2>
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
