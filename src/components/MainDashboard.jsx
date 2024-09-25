import Exchange from "./Exchange";
import LineChart from "./LineChart";
import MarketcapSideBar from "./MarketcapSideBar";
import Portfolio from "./Portfolio";
import SearchBar from "./SearchBar";
import DropDown from "./UI/DropDown";


export default function MainDashboard() {
  return (
    <div className="bg-gray-100 p-5 rounded-xl grid grid-cols-[1fr_2fr_3fr_2fr] grid-rows-[56px_500px_300px] gap-5 ">
      <DropDown />
      <SearchBar />
      <MarketcapSideBar />
      <LineChart />
      <Portfolio />
      <Exchange />
    </div>
  );
}
