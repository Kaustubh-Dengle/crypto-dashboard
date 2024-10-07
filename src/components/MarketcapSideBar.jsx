import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

export default function MarketcapSideBar() {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  function handleNextPage(pageNumber) {
    setCurrentPage(pageNumber);
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
    <div className="p-4 row-span-3 shadow-md rounded-xl bg-white relative">
      <p className="font-bold text-xl pb-[18px] text-center">
        Cryptocurrency by marketcap
      </p>
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
              <p className="flex items-center">{parseFloat(coin.price_change_percentage_24h).toFixed(3)}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="flex absolute bottom-0 left-0 right-0 text-center pb-2 justify-evenly font-semibold text-gray-500">
        <button
          disabled={currentPage === 1}
          onClick={() => handleNextPage(currentPage - 1)}
        >
          <FaArrowLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleNextPage(currentPage + 1)}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
