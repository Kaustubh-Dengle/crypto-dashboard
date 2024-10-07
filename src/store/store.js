import { createStore } from "redux";

const baseCurrencyReducer = (state = { baseCurrency: "USD" }, action) => {
  if (action.type === "INR") {
    return {
      baseCurrency: "INR",
    };
  }

  if (action.type === "EUR") {
    return {
      baseCurrency: "EUR",
    };
  }
  return state;

};

const store = createStore(baseCurrencyReducer);
export default store;
