import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import SideBar from '../components/SideBar';

const EcommerceStore = () => {
  const [tablets, setTablets] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  // Load Stripe script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script when the component unmounts
    };
  }, []);

  // Fetch data from backend API
  useEffect(() => {
    axios
      .get('http://localhost:3001/tablets/tablets')
      .then((response) => {
        setTablets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const addToCart = (tablet) => {
    const existingItem = cart.find((item) => item._id === tablet._id);

    if (existingItem) {
      const totalQuantityInCart = existingItem.quantity + count;
      if (totalQuantityInCart > tablet.quantity) {
        alert(`Cannot add more than available stock of ${tablet.quantity}.`);
      } else {
        setCart(
          cart.map((item) =>
            item._id === tablet._id
              ? { ...item, quantity: totalQuantityInCart }
              : item
          )
        );
      }
    } else {
      setCart([...cart, { ...tablet, quantity: count }]);
    }

    setCount(1);
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getRemainingQuantity = (tablet) => {
    const cartItem = cart.find((item) => item._id === tablet._id);
    return cartItem ? tablet.quantity - cartItem.quantity : tablet.quantity;
  };

  return (
    <div className="flex min-h-screen  bg-gray-100">
      {/* Sidebar on the left */}
      <div className="w-1/5">
        <SideBar />
      </div>
      
      {/* Main Content on the right */}
      <div className="w-4/5 px-5 py-6 ml-9">
        <div className="flex justify-between items-center mb-9">
          <h1 className="text-5xl font-extrabold text-gray-800">E-Commerce Store</h1>
          <button
            className="relative text-3xl text-blue-600 transition-transform duration-300 hover:scale-110"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <FiShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Cart Sidebar */}
        <div
          className={`fixed top-0 bottom-0 right-0 w-[300px] bg-white shadow-lg transform ${
            cartOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
        >
          <div className="flex justify-between items-center p-4 border-b bg-gray-100">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={() => setCartOpen(false)} className="text-2xl">
              <FiX />
            </button>
          </div>
          <div className="p-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center mb-4 border-b py-2"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>Quantity: {item.quantity}</p>
                      <p className="text-green-600 font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="bg-[#c9184a] hover:bg-[#9b1339] text-white px-2 py-1 rounded mr-2 transition"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="bg-[#c9184a] hover:bg-[#9b1339] text-white px-2 py-1 rounded transition"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <div className="mt-4">
                <div className="text-lg font-bold">
                  Total: ${calculateTotal().toFixed(2)}
                </div>
                <div className="mt-4">
                  <stripe-buy-button
                    buy-button-id="buy_btn_1QBsqyA8rOpgSZXFT1anwNB4"
                    publishable-key="pk_test_51QBsnrA8rOpgSZXFJR15RjHesCGVKNrfYPmgQy21q7mRCXCqaMF1uhKK88u4rUYz4SRyVvAwcu203ezh0OrpTP1R00cYcKisgI"
                  ></stripe-buy-button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
            {tablets.map((tablet) => (
              <div
                key={tablet._id}
                className="border rounded-lg shadow-lg overflow-hidden bg-white transition transform hover:shadow-xl hover:scale-105"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold">{tablet.name}</h2>
                  <p className="text-gray-600">{tablet.category}</p>
                  <p className="text-lg font-semibold mt-2">
                    Available: {tablet.quantity}
                  </p>
                  <p className="text-lg font-semibold">Price: ${tablet.price}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Remaining Stock: {getRemainingQuantity(tablet)}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {tablet.description || 'No description available.'} {/* Product description */}
                  </p>
                  <div className="flex items-center mt-4 space-x-3">
                    <button
                      onClick={() => addToCart(tablet)}
                      className="bg-[#c9184a] hover:bg-[#9b1339] text-white px-4 py-2 rounded-lg transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcommerceStore;
