import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Dashboard from "./components/Dashboard";
import CoinDetails from "./components/CoinDetails";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:coinId" element={<CoinDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
