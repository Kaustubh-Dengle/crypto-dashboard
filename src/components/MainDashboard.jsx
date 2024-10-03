import Exchange from "./Exchange";
import LineChart from "./LineChart";
import MarketcapSideBar from "./MarketcapSideBar";
import Portfolio from "./Portfolio";
import SearchBar from "./SearchBar";
import DropDown from "./UI/DropDown";


export default function MainDashboard() {
  return (
    <div className="bg-gray-100 p-[16px] rounded-xl grid grid-cols-[1fr_2fr_3fr_2fr] grid-rows-[56px_400px_300px] gap-[12px] ">
      <DropDown />
      <SearchBar />
      <MarketcapSideBar />
      <LineChart />
      <Portfolio />
      <Exchange />
    </div>
  );
}
