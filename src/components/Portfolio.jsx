import { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import symbolSelector from "../util/currencySymbol";
Chart.register(ArcElement, Tooltip, Legend);

export default function Portfolio() {
  const { selectedCurrency } = useSelector((state) => state.currency);
  const [portfolioData, setPortfolioData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ["#50A3F0", "#F98E8E", "#5AC8AE", "#FFB800", "#FF6B6B"],
    }],
  });
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        // Fetch top 5 cryptocurrencies by market cap
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.toLowerCase()}&order=market_cap_desc&per_page=5&sparkline=false`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }

        const data = await response.json();
        
        // Calculate total market value
        const total = data.reduce((sum, coin) => sum + coin.market_cap, 0);
        setTotalValue(total);

        // Update chart data
        setPortfolioData({
          labels: data.map(coin => coin.name),
          datasets: [{
            data: data.map(coin => coin.market_cap),
            backgroundColor: ["#50A3F0", "#F98E8E", "#5AC8AE", "#FFB800", "#FF6B6B"],
          }],
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [selectedCurrency]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = ((value / totalValue) * 100).toFixed(1);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    },
  };

  const formatValue = (value) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(2);
  };

  return (
    <div className="grid col-span-2 row-span-1">
      <div className="grid grid-cols-2 grid-rows-[56px_200px] shadow-md rounded-xl bg-white border border-gray-300">
        <p className="font-bold p-4 col-span-1">Market Overview</p>
        <p className="font-light p-4 col-span-1">
          Total Market Cap: <b className="font-bold">{symbolSelector(selectedCurrency)} {formatValue(totalValue)}</b>
        </p>
        <div className="flex justify-center items-center col-span-2 row-span-1">
          {loading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <div className="w-full h-full p-4">
              <Pie data={portfolioData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
