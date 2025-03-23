import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useSelector } from "react-redux";
import currencySymbol from "../util/currencySymbol"

export default function MarketcapSideBar() {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const entriesPerPage = 11;
  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc`
        );

        const data = await response.json();

        setCoins(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoinData();
  }, [selectedCurrency]);

  const totalPages = Math.ceil(coins.length / entriesPerPage);

  function handleNextPage() {
    if (currentPage < totalPages && !isAnimating) {
      setAnimationDirection("next");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage + 1);
        setIsAnimating(false);
        setAnimationDirection(null);
      }, 200);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1 && !isAnimating) {
      setAnimationDirection("prev");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage - 1);
        setIsAnimating(false);
        setAnimationDirection(null);
      }, 200);
    }
  }

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedCoins = coins.slice(startIndex, endIndex);

  function numberFormatter(number) {
    const formatter = new Intl.NumberFormat("en-us", {
      notation: "compact",
    });

    return formatter.format(number);
  }

  return (
    <div className="p-4 row-span-3 shadow-md rounded-xl bg-white relative border border-gray-300 flex flex-col">
      <div className="flex items-center justify-center mb-4  border-gray-200">
        <h2 className="font-bold text-md text-gray-800">Cryptocurrency by Market Cap</h2>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ul
          className={`transition-transform duration-200 ease-in-out h-full ${
            animationDirection === "next"
              ? "translate-x-full opacity-0"
              : animationDirection === "prev"
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="h-full overflow-y-auto pr-2">
            {displayedCoins.map((coin) => (
              <div 
                key={coin.id} 
                className="flex items-start py-2 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                  <img
                    src={coin.image}
                    alt={`${coin.name} Logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 ml-2">
                  <h3 className="font-semibold text-gray-800 text-sm break-words">{coin.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Market Cap: {currencySymbol(selectedCurrency)}{numberFormatter(coin.market_cap)}
                  </p>
                </div>
                <div className="flex items-center ml-3 flex-shrink-0">
                  <div
                    className={`flex items-center gap-0.5 font-semibold text-xs ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h > 0 ? (
                      <TiArrowSortedUp className="text-base" />
                    ) : (
                      <TiArrowSortedDown className="text-base" />
                    )}
                    <span>{parseFloat(coin.price_change_percentage_24h).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <span className="text-sm font-medium text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FaArrowRight className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
