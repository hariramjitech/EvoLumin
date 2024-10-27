import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Back from '../components/Back';
import Loading from '../components/ui/Loading';

const InfoTablet = () => {
  const { _id } = useParams();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [lastUpdated, setLastUpdated] = useState();
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
        setLastUpdated(response.data.lastUpdated);
        setLoading(false);
      })
      .catch((error) => {
        alert('An error happened. Please check console!');
        console.log(error);
      });
  }, [_id]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-10 mb-40">
          <Loading />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center mb-8">
           
          </div>
          <div className="flex justify-center">
            <div className="p-10 bg-white shadow-xl rounded-lg max-w-lg w-full">
              <p className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Tablet Information</p>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">Name:</p>
                  <p className="text-lg font-medium text-gray-900">{name}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">Category:</p>
                  <p className="text-lg font-medium text-gray-900">{category}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">Quantity:</p>
                  <p className="text-lg font-medium text-gray-900">{quantity}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">Price:</p>
                  <p className="text-lg font-medium text-gray-900">${price}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">Last Entry:</p>
                  <p className="text-lg font-medium text-gray-900">{new Date(lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-10 flex justify-center">
              <Link to={'/tablets'}>
              
                <button
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                  >
                  Go Back
                </button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoTablet;
