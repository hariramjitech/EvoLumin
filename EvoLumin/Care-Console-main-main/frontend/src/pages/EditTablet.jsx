import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTablet = () => {
  const { _id } = useParams();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tablets/tablet/${_id}`)
      .then((response) => {
        setName(response.data.name);
        setCategory(response.data.category);
        setQuantity(response.data.quantity);
        setPrice(response.data.price);
        setLoading(false);
      })
      .catch((error) => {
        alert('An error happened. Please check console!');
        console.log(error);
      });
  }, [_id]);

  function edit(e) {
    e.preventDefault();
    const data = {
      name,
      category,
      quantity,
      price,
    };

    axios
      .put(`http://localhost:3001/tablets/updateTablet/${_id}`, data)
      .then(() => {
        console.log('Edited Successfully');
        navigate('/tablets');
      })
      .catch((error) => {
        alert(`${error}An error happened. Please check console`);
        console.log(error);
      });
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-10 mb-40"></div>
      ) : (
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center">
            <form
              onSubmit={edit}
              className="bg-gray-50 shadow-lg rounded-lg p-10 max-w-lg w-full"
            >
              <p
                className="text-3xl font-bold text-gray-800 mb-6 pb-2"
                style={{
                  borderBottom: '2px solid #858181',
                }}
              >
                Edit Tablet
              </p>
              <div className="space-y-6">
                <input
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter Tablet Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter Tablet Category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />

                <input
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter Tablet Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />

                <input
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter Tablet Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTablet;
