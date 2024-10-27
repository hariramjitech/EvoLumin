import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CartPage = () => {
  const location = useLocation();
  const initialCartItems = location.state.cartItems || [];

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  // Handle the alert system
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const item = cartItems[index];
    const maxQuantity = item.availableQuantity || item.maxQuantity || 10; // Use availableQuantity from backend

    // Ensure the quantity stays within the valid range
    if (newQuantity < 1) {
      newQuantity = 1; // Set to 1 if it goes below
    } else if (newQuantity > maxQuantity) {
      showAlert(`You cannot exceed the maximum quantity of ${maxQuantity} for ${item.name}.`);
      newQuantity = maxQuantity; // Set to maxQuantity if it exceeds
    }

    // Update the cart with the new quantity
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity;
      return updatedItems;
    });
  };

  const removeItemFromCart = (index) => {
    const item = cartItems[index];
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    showAlert(`Removed ${item.name} from your cart.`);
  };

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [alertVisible]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.category}</p>

              <div className="flex items-center mb-4">
                <label className="text-lg font-semibold mr-4">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={item.availableQuantity || item.maxQuantity || 10} // Fetch available quantity from backend
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                  className="border rounded px-2 py-1 w-16"
                />
              </div>

              <p className="text-lg font-bold">Price: ${item.price}</p>
              <p className="text-lg font-semibold">
                Max Quantity: {item.availableQuantity || item.maxQuantity || 10}
              </p>

              <button
                onClick={() => removeItemFromCart(index)}
                className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Alert Message */}
      {alertVisible && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white rounded-lg p-4 shadow-lg z-50">
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
