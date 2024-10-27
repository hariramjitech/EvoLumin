import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Button1 from '../components/ui/Button1';
import Back from '../components/Back';

// Register necessary components
Chart.register(...registerables);

function InventoryChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/tablets/tablets')
      .then(response => {
        const data = response.data;
        const labels = data.map(item => item.name);
        const quantities = data.map(item => item.quantity);
        
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Tablet Stock Levels',
              data: quantities,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching tablet data:', error);
      });
  }, []);

  if (!chartData) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Link to={'/admin/all-appointment'}>
          <Back />
        </Link>
      <div className="flex justify-end mr-10">
        <Link to={'/tablets'}>
            <Button1 contain="Tablets" />
          </Link>
          </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-white pt-8 -mt-32"> {/* Added pt-8 to shift content slightly up */}
      <div className="w-full max-w-4xl mb-4 flex justify-start">
        
      </div>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">Tablet Inventory</h2>
          
        </div>
        <div style={{ width: '100%', height: '400px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default InventoryChart;
