const crypto = [
  {
    id: 1,
    name: 'Bitcoin',
    marketCap: '1.01T',
    dayChange: '+2.34%'
  },
  {
    id: 2,
    name: 'Ethereum',
    marketCap: '200B',
    dayChange: '-1.56%'
  },
  {
    id: 3,
    name: 'Binance Coin',
    marketCap: '50B',
    dayChange: '+0.87%'
  },
  {
    id: 4,
    name: 'Tether',
    marketCap: '80B',
    dayChange: '-0.02%'
  },
  {
    id: 5,
    name: 'Dogecoin',
    marketCap: '10B',
    dayChange: '+3.21%'
  },
  {
    id: 6,
    name: 'Cardano',
    marketCap: '15B',
    dayChange: '-0.45%'
  },
  {
    id: 7,
    name: 'Solana',
    marketCap: '12B',
    dayChange: '+1.98%'
  },
  {
    id: 8,
    name: 'Polkadot',
    marketCap: '8B',
    dayChange: '-0.72%'
  },
  {
    id: 9,
    name: 'Ripple',
    marketCap: '20B',
    dayChange: '+0.31%'
  },
  {
    id: 10,
    name: 'Litecoin',
    marketCap: '5B',
    dayChange: '-1.24%'
  }
];

export default function MarketcapSideBar() {
  return (
    <>
      <div>
        <p>Crypto by market cap</p>
        <div>
          {crypto.map((curr, id)=>(<li key={id}>{curr.name}{curr.marketCap}</li>)) }
        </div>
      </div>
    </>
  );
}
