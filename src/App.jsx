import "./App.css";
import MarketcapSideBar from "./components/MarketcapSideBar";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <div>
        <div>
          <Nav />
        </div>
        <div className="h-full w-full p-10 bg-gray-200 rounded-md max-h-screen">
          <MarketcapSideBar />
        </div>
      </div>
    </>
  );
}

export default App;
