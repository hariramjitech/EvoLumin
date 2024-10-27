import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Appointment = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [prescription, setPrescription] = useState('');
  const [fees, setFees] = useState('');

  const { _id } = useParams();

  // Fetch appointment details
  useEffect(() => {
    if (_id) {
      axios
        .get(`http://localhost:3001/appointments/appointment-info?appointmentId=${_id}`)
        .then((response) => {
          const data = response.data.data;
          setEmail(data.email);
          setDate(data.date);
          setTime(data.time);
          setDescription(data.description);
          setFees(data.fees);
          setPrescription(data.prescription);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [_id]);

  // Fetch patient name based on email
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3001/users/appointment-name?email=${email}`)
        .then((response) => {
          setName(response.data.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [email]);

  function dele() {
    if (window.confirm("Are you sure about deleting this appointment?")) {
      axios
        .delete(`http://localhost:3001/appointments/deleteAppointment/${_id}`)
        .then(() => {
          console.log("Appointment Deleted Successfully");
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // CSV download function for all details
  const downloadCSV = () => {
    const data = [
      ["Field", "Value"],
      ["Patient Name", name || "N/A"],
      ["Email", email || "N/A"],
      ["Date", date || "N/A"],
      ["Time", time || "N/A"],
      ["Description", description || "N/A"],
      ["Fees", fees || "N/A"],
      ["Prescription", prescription || "N/A"],
    ];

    const csvContent = data.map(row => row.map(field => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "appointment_prescription.csv";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    URL.revokeObjectURL(url);
  };

  // Function to print only the prescription, fees, and patient name
  const printPrescriptionAndFees = () => {
    const content = `
      <h3>Patient Name: ${name || "N/A"}</h3>
      <h3>Prescription</h3>
      <p>${prescription || "No prescription available"}</p>
      <h3>Fees</h3>
      <p>${fees || "No fees available"}</p>
    `;

    const newWindow = window.open('', '', 'width=800, height=600');
    newWindow.document.write(`
      <html>
      <head>
        <title>Prescription & Fees</title>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="relative flex justify-center pt-10 pb-12 bg-gradient-to-r from-gray-50 to-gray-200">
      {/* Delete Button */}
      <button
        onClick={() => dele()}
        className="absolute top-0 right-0 mt-6 mr-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-200 transform hover:scale-105"
      >
        Delete Appointment
      </button>

      {/* Appointment Details */}
      <div className="flex flex-col justify-between bg-white shadow-xl p-10 rounded-xl w-11/12 max-w-5xl ">
        <h2 className="text-4xl font-semibold mb-9 text-teal-600 text-center">Appointment Details</h2>

        {/* Appointment Info */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          <div className="flex flex-col">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">Patient Name:</span>
                <span className="text-gray-600">{name}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-600">{email}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">Date:</span>
                <span className="text-gray-600">{date}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">Time:</span>
                <span className="text-gray-600">{time}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">Description:</span>
                <span className="text-gray-600">{description}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">Fees:</span>
                <span className="text-gray-600">{fees}</span>
              </div>
            </div>
          </div>

          {/* Prescription Section */}
          <div className="border-l pl-6 mb-9 w-full">
            <h3 className="text-2xl font-semibold mb-1 text-teal-600">Prescription</h3>
            <div className="bg-gray-100 p-4 rounded-md shadow-md h-full max-h-96 overflow-auto w-full">
              <p className="text-gray-600">{prescription || "No prescription available"}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {fees !== "No prescription added" && (
          <div className="flex justify-start mt-9 space-x-4">
            <Link to="/payment">
              <button className="px-4 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition duration-200 transform hover:scale-105">
                Pay Online
              </button>
            </Link>
            <button
              onClick={downloadCSV}
              className="px-4 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-200 transform hover:scale-105"
            >
              Download Prescription
            </button>
            <button
              onClick={printPrescriptionAndFees}
              className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
            >
              Print Prescription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
