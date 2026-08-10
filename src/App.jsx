import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1 className="landing-title">Welcome To Paradise Nursery</h1>
            <p className="landing-description">
              Where Green Meets Serenity. Explore our wide collection of indoor plants to bring fresh energy and natural beauty to your living space.
            </p>
            <AboutUs />
            <button className="get-started-btn" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;
