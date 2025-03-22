import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import chartReducer from './slices/chartSlice';
import exchangeReducer from './slices/exchangeSlice';

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    chart: chartReducer,
    exchange: exchangeReducer
  }
});

export default store;