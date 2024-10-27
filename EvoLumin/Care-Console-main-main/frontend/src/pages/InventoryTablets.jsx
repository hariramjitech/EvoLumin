import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { images } from '../assets/images';
import Loading from '../components/ui/Loading';
import Button1 from '../components/ui/Button1';
import Back from '../components/Back';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const InventoryTablets = () => {
  const [tabletsInfo, setTabletsInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/tablets/tablets')
      .then((response) => {
        setTabletsInfo(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Loading />
        </div>
      ) : (
        <div className="container mx-auto px-6 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link to={'/inventory-chart'} className="text-blue-600 hover:text-blue-800">
              <Back />
            </Link>
          </div>

          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-800">Tablet Inventory</h1>
            <Link to={'/addTablets'}>
              <button
                className="bg-[#e62e62] text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-[#d1265a] transition duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Tablet
              </button>
            </Link>
          </div>

          {/* Tablets Table */}
          <div className="shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-left">
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-center">No</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-center">Name</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-center max-md:hidden">Category</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-center">Quantity</th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm text-center">Options</th>
                </tr>
              </thead>
              <tbody>
                {tabletsInfo.map((tablet, index) => (
                  <tr key={tablet._id} className="hover:bg-gray-100 transition-all duration-200">
                    <td className="py-4 px-6 border-b border-gray-200 text-center">{index + 1}</td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center">{tablet.name}</td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center max-md:hidden">{tablet.category}</td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center">{tablet.quantity}</td>
                    <td className="py-4 px-6 border-b border-gray-200 text-center">
                      <div className="flex justify-around items-center">
                        <Link to={`/infoTablets/${tablet._id}`}>
                          <img className="w-6 h-6 hover:scale-110 transition-transform" src={images.info} alt="info" />
                        </Link>
                        <Link to={`/editTablets/${tablet._id}`}>
                          <img className="w-6 h-6 hover:scale-110 transition-transform" src={images.edit} alt="edit" />
                        </Link>
                        <Link to={`/deleteTablets/${tablet._id}`}>
                          <img className="w-6 h-6 hover:scale-110 transition-transform" src={images.dele} alt="delete" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryTablets;
