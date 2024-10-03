import "./App.css";
import MainDashboard from "./components/MainDashboard";
import Nav from "./components/Nav";

function App() {
  //   return (
  //     <>
  //       <div>
  //         <div>
  //           <Nav />
  //         </div>
  //         <div className="flex justify-center">
  //           <div className="flex justify-center h-full w-[90%] p-10 mt-5 bg-gray-100 rounded-md gap-2">

  //               <DropDown />
  //               <SearchBar />

  //             <MarketcapSideBar />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  return (
    <>
      <Nav />
      <div className="pr-[128px] pl-[128px] px-[16px] py-[16px]">
        <MainDashboard />
      </div>
    </>
  );
}

export default App;
