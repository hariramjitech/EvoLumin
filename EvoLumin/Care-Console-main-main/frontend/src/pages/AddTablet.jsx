import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Back from '../components/Back';

const AddTablet = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });

    function create(e) {
        e.preventDefault();
        const data = {
            name,
            category,
            quantity,
            price,
        };

        axios
            .post('http://localhost:3001/tablets/add-tablet', data)
            .then(() => {
                setAlert({ message: 'Tablet added successfully!', type: 'success', visible: true });
                setTimeout(() => {
                    setAlert({ ...alert, visible: false }); // Hide alert after 3 seconds
                }, 3000);
                navigate('/tablets');
            })
            .catch((error) => {
                setAlert({ message: 'An error occurred. Please try again.', type: 'error', visible: true });
                console.error(error);
            });
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='bg-white p-10 rounded-lg shadow-lg w-1/3'>
                <Link to={'/tablets'}>
                    <Back />
                </Link>
                <h2 className='text-3xl font-bold text-teal-600 text-center mb-10'>Add Tablets</h2>

                {/* Alert section */}
                {alert.visible && (
                    <div
                        className={`p-4 mb-4 border-l-4 rounded ${
                            alert.type === 'success'
                                ? 'bg-teal-100 border-teal-500 text-teal-700'
                                : 'bg-red-100 border-red-500 text-red-700'
                        }`}
                        role="alert"
                    >
                        <p>{alert.message}</p>
                    </div>
                )}

                <form className='flex flex-col'>
                    <input
                        className='mb-5 p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder='Enter Tablet Name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className='mb-5 p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder='Enter Tablet Category'
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <input
                        className='mb-5 p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder='Enter Tablet Quantity'
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    <input
                        className='mb-5 p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder='Enter Tablet price'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <button
                        onClick={create}
                        className='bg-teal-600 text-white rounded-lg p-3 hover:bg-teal-700 transition duration-200'
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddTablet;
