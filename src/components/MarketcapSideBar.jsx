import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

export default function MarketcapSideBar() {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const entriesPerPage = 12;

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`
        );

        const data = await response.json();

        setCoins(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoinData();
  }, []);

  const totalPages = Math.ceil(coins.length / entriesPerPage);
  // function handleNextPage(pageNumber) {
  //   setCurrentPage(pageNumber);
  // }

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
    <div className="p-4 row-span-3 shadow-md rounded-xl bg-white relative overflow-hidden">
      <p className="font-bold text-xl pb-[8px] text-center">
        Cryptocurrency by marketcap
      </p>
      
        <ul
        className={`transition-transform duration-200 ease-in-out ${
          animationDirection === "next"
            ? "translate-x-full opacity-0"
            : animationDirection === "prev"
            ? "-translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
        style={{width : '100%'}}
      >
        {displayedCoins.map((coin) => (
          <div key={coin.id} className="flex border-b py-[1px]">
            <div className="p-[10px]">
              <img
                src={coin.image}
                alt="Cryptocurrency Logo"
                className="h-[32px] w-[32px]"
              ></img>
            </div>
            <div className="p-[4px] font-semibold grow">
              <h2 className="">{coin.name}</h2>
              <p className="text-sm text-gray-500">
                Market Cap: ${numberFormatter(coin.market_cap)}
              </p>
            </div>
            <div className="flex w-[80px] items-center pr-2">
              <div
                className={`flex font-semibold text-sm ${
                  coin.price_change_percentage_24h > 0
                    ? "text-[#4C9D8A]"
                    : "text-[#EC7622]"
                }`}
              >
                <div className="flex items-center text-2xl">
                  {coin.price_change_percentage_24h > 0 ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  )}
                </div>
                <p className="flex items-center">
                  {parseFloat(coin.price_change_percentage_24h).toFixed(3)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </ul>

      <div className="flex absolute bottom-0 left-0 right-0 text-center pb-2 justify-evenly font-semibold">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          className="bg-gray-300 p-2 rounded disabled:opacity-25"
        >
          <FaArrowLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="bg-gray-300 p-2 rounded disabled:opacity-25"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
