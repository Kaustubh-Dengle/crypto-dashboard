import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import chartReducer from './slices/chartSlice'
import coinSlice from './slices/coinSlice'

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    chart: chartReducer,
    coins: coinSlice
  },
});

export default store;
