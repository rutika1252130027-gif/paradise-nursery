import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?q=80&w=400", description: "Produces oxygen at night and improves air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=400", description: "Filters formaldehyde and xylene from indoor air.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?q=80&w=400", description: "Removes mold spores and airborne toxins.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400", description: "Restores humidity and purifies indoor air.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=400", description: "Sturdy foliage that cleans harmful toxins.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=400", description: "Cleans air and provides soothing gel.", cost: "$10" },
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=400", description: "Relaxing fragrance that promotes better sleep.", cost: "$16" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=400", description: "Sweet floral scent that reduces stress.", cost: "$22" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?q=80&w=400", description: "Aromatic herb useful for cooking and focus.", cost: "$12" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?q=80&w=400", description: "Refreshing fragrance with culinary uses.", cost: "$8" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=400", description: "Invigorating scent that clears air passages.", cost: "$19" },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=400", description: "Citrusy aroma that boosts mood.", cost: "$11" },
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Echinacea", image: "https://images.unsplash.com/photo-1584447128309-b66b7a4d1b63?q=80&w=400", description: "Known for boosting immune health.", cost: "$14" },
        { name: "Peppermint", image: "https://images.unsplash.com/photo-1603569283847-be29b8b3bc36?q=80&w=400", description: "Soothes digestion and provides fresh scent.", cost: "$9" },
        { name: "Chamomile", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400", description: "Calming herb used widely in soothing teas.", cost: "$13" },
        { name: "Calendula", image: "https://images.unsplash.com/photo-1595152230535-0434bd082a8e?q=80&w=400", description: "Promotes skin healing and health.", cost: "$15" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1508748303406-7bc5a5726c6d?q=80&w=400", description: "Antimicrobial properties for home remedies.", cost: "$10" },
        { name: "Holy Basil (Tulsi)", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=400", description: "Adaptogenic herb that fights stress.", cost: "$16" },
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => setShowCart(false)}>Plants</button>
          <button className="nav-btn cart-btn" onClick={() => setShowCart(true)}>
            🛒 Cart ({totalCartCount})
          </button>
        </div>
      </nav>

      {/* Content */}
      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="product-cards">
                {categoryObj.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3 className="product-name">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-cost">{plant.cost}</p>
                    <button
                      className={`add-to-cart-btn ${addedToCart[plant.name] || cartItems.some(i => i.name === plant.name) ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(i => i.name === plant.name)}
                    >
                      {addedToCart[plant.name] || cartItems.some(i => i.name === plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
