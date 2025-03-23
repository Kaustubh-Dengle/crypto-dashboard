import bitcoin from "../assets/bitcoin-btc-logo.svg"

export default function Nav() {
  return (
    <nav className="flex items-center w-full p-2 h-20 shadow-md bg-white">
      <div className="flex items-center gap-4 pl-10">
        <img src={bitcoin} alt="Bitcoin" className="h-14 w-14 object-contain" />
        <p className="text-2xl font-bold text-gray-800">CryptoMetrics</p>
      </div>
    </nav>
  );
}
