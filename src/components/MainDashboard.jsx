import Exchange from "./Exchange";
import MarketcapSideBar from "./MarketcapSideBar";
import Portfolio from "./Portfolio";
import SearchBar from "./SearchBar";
import CurrencyDropdown from "./CurrencyDropdown";
import MainChart from "./MainChart";


export default function MainDashboard() {
  return (
    <div className="bg-gray-100 p-[16px] rounded-xl grid grid-cols-[1fr_2fr_3fr_2fr] grid-rows-[56px_400px_300px] gap-[12px] ">
      <CurrencyDropdown />
      <SearchBar />
      <MarketcapSideBar />
      <MainChart />
      <Portfolio />
      <Exchange />
    </div>
  );
}
