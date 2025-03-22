import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "./UI/DropDown";
import chartOptions from "../util/chartOptions";
import coinOptions from "../util/coinOptions";
import { fetchChartData, setSelectedCoin, setSelectedDays, setChartType } from "../store/slices/chartSlice";
import currencySymbol from "../util/currencySymbol";

Chart.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement
);

export default function MainChart() {
  const dispatch = useDispatch();
  const { selectedCoin, selectedDays, chartType, chartData, loading, error } = useSelector((state) => state.chart);
  const { selectedCurrency } = useSelector((state) => state.currency);
  const [conversionRate, setConversionRate] = useState(1);

  // Fetch conversion rate when currency changes
  useEffect(() => {
    const fetchConversionRate = async () => {
      if (selectedCurrency === 'USD') {
        setConversionRate(1);
        return;
      }
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=${selectedCurrency.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch conversion rate');
        }
        const data = await response.json();
        setConversionRate(data.usd[selectedCurrency.toLowerCase()]);
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
        setConversionRate(1);
      }
    };

    fetchConversionRate();
  }, [selectedCurrency]);

  // Fetch chart data when dependencies change
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchChartData({ 
          coinId: selectedCoin, 
          days: selectedDays, 
          currency: selectedCurrency 
        })).unwrap();
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchData();
  }, [dispatch, selectedCoin, selectedDays, selectedCurrency]);

  const handleChartSelect = (type) => {
    dispatch(setChartType(type));
  };

  const handleCoinSelect = (coin) => {
    dispatch(setSelectedCoin(coin));
  };

  const handleTimeSelect = (days) => {
    dispatch(setSelectedDays(days));
  };

  const timeButtons = [
    { label: '1D', days: 1 },
    { label: '1W', days: 7 },
    { label: '1M', days: 30 },
    { label: '6M', days: 180 },
    { label: '1Y', days: 365 },
  ];

  const formatLabel = (timestamp) => {
    const date = new Date(timestamp);
    if (selectedDays === 1) {
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    }
    return date.toLocaleDateString();
  };

  const data = chartData?.prices ? {
    labels: chartData.prices.map((price) => formatLabel(price[0])),
    datasets: [
      {
        label: `${selectedCoin.toUpperCase()} Price`,
        data: chartData.prices.map((price) => price[1] * conversionRate),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  } : null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedCoin.toUpperCase()} Price Chart`
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${currencySymbol(selectedCurrency)}${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `${currencySymbol(selectedCurrency)}${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`
        }
      },
      x: {
        ticks: {
          maxRotation: selectedDays === 1 ? 45 : 0,
          minRotation: selectedDays === 1 ? 45 : 0
        }
      }
    }
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[400px] text-red-500">
          Error: {error}
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex items-center justify-center h-[400px] text-gray-500">
          No data available
        </div>
      );
    }

    switch (chartType) {
      case 'Line Chart':
        return <Line data={data} options={options} />;
      case 'Bar Chart-Vertical':
        return <Bar data={data} options={options} />;
      case 'Bar Chart-Horizontal':
        return <Bar data={data} options={{ ...options, indexAxis: 'y' }} />;
      default:
        return <Line data={data} options={options} />;
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-md bg-white col-span-3 row-span-1 border border-gray-300">
      <div className="grid col-span-13 gap-2">
        {timeButtons.map(({ label, days }) => (
          <button
            key={label}
            onClick={() => handleTimeSelect(days)}
            className={`col-span-1 border-2 rounded-xl shadow-md hover:bg-blue-100 h-[54px] ${
              selectedDays === days ? 'bg-blue-100' : ''
            }`}
          >
            {label}
          </button>
        ))}
        <div className="col-start-11 col-span-6 flex gap-4">
          <DropDown
            title="Chart Type"
            options={chartOptions}
            onSelect={handleChartSelect}
          />
          <DropDown
            title="Cryptocurrency"
            options={coinOptions}
            onSelect={handleCoinSelect}
          />
        </div>
      </div>

      <div className="flex justify-center items-center m-4 h-[300px]">
        <div className="h-full w-full">
          {renderChart()}
        </div>
      </div>
    </div>
  );
}