import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const ImageUpload = ({ userId }) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showImage, setShowImage] = useState(false); // Track when "Show" is clicked
    
    const email = localStorage.getItem('email');

    const onDrop = (acceptedFiles) => {
        setImage(acceptedFiles[0]);
        setError('');
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image) {
            setError('Please select an image to upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('userId', userId);

        try {
            setUploading(true);
            const response = await axios.post(`http://localhost:3000/user/upload/${email}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Image uploaded successfully!');
            setError('');
            setImage(null);
            setShowImage(false); // Reset the show state after upload
        } catch (err) {
            setError('Failed to upload image');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-6 space-y-6">
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold text-gray-800"
            >
                Upload an Image
            </motion.h2>

            <motion.div
                {...getRootProps()}
                className={`w-full max-w-lg p-10 border-4 border-dashed rounded-lg cursor-pointer 
                    ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'}`}
                whileHover={{ scale: 1.05 }}
            >
                <input {...getInputProps()} />
                <p className="text-center text-gray-700">
                    {isDragActive ? 'Drop the file here...' : 'Drag & Drop an image or click to select'}
                </p>
            </motion.div>

            {image && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-gray-700"
                    >
                        <p>Selected file: {image.name}</p>
                    </motion.div>

                    {/* Show button to preview image */}
                    <motion.button
                        onClick={() => setShowImage(!showImage)}
                        whileHover={{ scale: 1.05 }}
                        className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md 
                            transition duration-300 transform hover:scale-105 hover:bg-gray-600"
                    >
                        {showImage ? 'Hide' : 'Show'}
                    </motion.button>
                </>
            )}

            {/* Display image preview if "Show" is clicked */}
            {showImage && image && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4"
                >
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-64 h-auto rounded-md shadow-md"
                    />
                </motion.div>
            )}

            <motion.button
                onClick={handleUpload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={uploading}
                className={`py-3 px-6 bg-[#e62e62] text-white font-semibold rounded-lg shadow-lg 
                    transition duration-300 transform hover:scale-105 hover:bg-[#d52a2a] 
                    ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </motion.button>

            {uploading && (
                <motion.div
                    className="spinner"
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                        loop: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                >
                    <div className="w-11 h-11 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </motion.div>
            )}

            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 mt-4"
                >
                    {error}
                </motion.p>
            )}
            {message && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-500 mt-4"
                >
                    {message}
                </motion.p>
            )}
        </div>
    );
};

export default ImageUpload;
