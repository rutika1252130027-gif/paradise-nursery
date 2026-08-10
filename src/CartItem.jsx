import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper to parse numeric cost from string (e.g. "$15" -> 15)
  const parseCost = (costStr) => {
    return parseFloat(costStr.replace('$', '')) || 0;
  };

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  // Calculate total cost per plant item
  const calculateSubtotal = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for testing Paradise Nursery.');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="continue-btn" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <div>
          <h3 className="total-amount">Total Cart Amount: ${calculateTotalAmount()}</h3>
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-cost">Unit Price: {item.cost}</p>
                  <p className="cart-item-subtotal">Subtotal: ${calculateSubtotal(item)}</p>
                  <div className="cart-quantity-controls">
                    <button className="qty-btn" onClick={() => handleDecrement(item)}>-</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <button className="continue-btn" onClick={onContinueShopping}>Continue Shopping</button>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
