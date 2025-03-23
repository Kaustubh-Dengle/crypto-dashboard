import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import symbolSelector from '../util/currencySymbol';
import { FaArrowLeft } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CoinDetails() {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const { selectedCurrency } = useSelector((state) => state.currency);
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        // Fetch detailed coin data
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
        
        if (!response.ok) throw new Error('Failed to fetch coin data');
        const data = await response.json();
        setCoinData(data);

        // Fetch historical data for the chart
        const historyResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${selectedCurrency.toLowerCase()}&days=365&interval=daily`
        );
        
        if (!historyResponse.ok) throw new Error('Failed to fetch historical data');
        const historyData = await historyResponse.json();
        
        setChartData({
          labels: historyData.prices.map(price => new Date(price[0]).toLocaleDateString()),
          datasets: [{
            label: `${data.name} Price`,
            data: historyData.prices.map(price => price[1]),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching coin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId, selectedCurrency]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FaArrowLeft />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <img src={coinData.image.large} alt={coinData.name} className="w-16 h-16" />
          <div>
            <h1 className="text-2xl font-bold">{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
            <p className="text-gray-600">Rank #{coinData.market_cap_rank}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600">Current Price</h3>
            <p className="text-2xl font-bold">
              {symbolSelector(selectedCurrency)} {coinData.market_data.current_price[selectedCurrency.toLowerCase()].toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600">24h Change</h3>
            <p className={`text-2xl font-bold ${coinData.market_data.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600">Market Cap</h3>
            <p className="text-2xl font-bold">
              {symbolSelector(selectedCurrency)} {coinData.market_data.market_cap[selectedCurrency.toLowerCase()].toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Description</h3>
          <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: coinData.description.en }} />
        </div>
      </div>

      {chartData && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Price History (1 Year)</h2>
          <div className="h-[400px]">
            <Line data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `${coinData.name} Price Chart`
                }
              },
              scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                    callback: (value) => `${symbolSelector(selectedCurrency)} ${value.toLocaleString()}`
                  }
                }
              }
            }} />
          </div>
        </div>
      )}
    </div>
  );
} 