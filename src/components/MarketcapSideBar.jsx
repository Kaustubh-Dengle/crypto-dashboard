// const crypto = [
//   {
//     id: 1,
//     name: "Bitcoin",
//     marketCap: "1.01T",
//     dayChange: "+2.34%",
//   },
//   {
//     id: 2,
//     name: "Ethereum",
//     marketCap: "200B",
//     dayChange: "-1.56%",
//   },
//   {
//     id: 3,
//     name: "Binance Coin",
//     marketCap: "50B",
//     dayChange: "+0.87%",
//   },
//   {
//     id: 4,
//     name: "Tether",
//     marketCap: "80B",
//     dayChange: "-0.02%",
//   },
//   {
//     id: 5,
//     name: "Dogecoin",
//     marketCap: "10B",
//     dayChange: "+3.21%",
//   },
//   {
//     id: 6,
//     name: "Cardano",
//     marketCap: "15B",
//     dayChange: "-0.45%",
//   },
//   {
//     id: 7,
//     name: "Solana",
//     marketCap: "12B",
//     dayChange: "+1.98%",
//   },
//   {
//     id: 8,
//     name: "Polkadot",
//     marketCap: "8B",
//     dayChange: "-0.72%",
//   },
//   {
//     id: 9,
//     name: "Ripple",
//     marketCap: "20B",
//     dayChange: "+0.31%",
//   },
//   {
//     id: 10,
//     name: "Litecoin",
//     marketCap: "5B",
//     dayChange: "-1.24%",
//   },
// ];

// export default function MarketcapSideBar() {
//   return (
//     <>
//       <aside className=" w-1/4">
//         <div className="bg-white rounded-xl shadow-md p-4">
//           <p className="font-bold">Crypto by market cap</p>
//           <div>
//             {crypto.map((curr, id) => (
//               <li key={id}>
//                 {curr.name} {curr.marketCap}
//               </li>
//             ))}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

import { useState, useEffect } from "react";

export default function MarketcapSideBar() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
        );

        const data = await response.json();

        setCoins(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoinData();
  }, []);

  return (
    <div className="p-4 row-span-3 shadow-md rounded-xl bg-white">
      <p className="font-bold pt-2 pb-2">Cryptocurrency by marketcap</p>
      {coins.map((coin) => (
        <div key={coin.id} className="grid">
          <img className="h-[24px] w-[24px]" src={coin.image} alt={coin.name} />
          <div className="">
            <h2>
              {coin.name} ({coin.symbol})
            </h2>
            <div className="flex gap-3">
              <p>Price: ${coin.current_price}</p>
              <p>Market Cap: ${coin.market_cap}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
