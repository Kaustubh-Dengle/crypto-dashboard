import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExchangeRate = createAsyncThunk(
  'exchange/fetchRate',
  async ({ fromCurrency, toCurrency, amount }) => {
    // If converting between cryptocurrencies
    if (fromCurrency !== 'usd' && toCurrency !== 'usd') {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency},${toCurrency}&vs_currencies=usd`
      );
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      const data = await response.json();
      const rate = data[fromCurrency].usd / data[toCurrency].usd;
      return { rate, amount };
    }
    
    // If converting to/from USD
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency === 'usd' ? toCurrency : fromCurrency}&vs_currencies=usd`
    );
    if (!response.ok) throw new Error('Failed to fetch exchange rate');
    const data = await response.json();
    const rate = fromCurrency === 'usd' ? 1 / data[toCurrency].usd : data[fromCurrency].usd;
    return { rate, amount };
  }
);

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    fromCurrency: 'bitcoin',
    toCurrency: 'usd',
    amount: '',
    convertedAmount: '',
    rate: null,
    loading: false,
    error: null,
    inputError: null
  },
  reducers: {
    setFromCurrency: (state, action) => {
      state.fromCurrency = action.payload;
      state.convertedAmount = '';
    },
    setToCurrency: (state, action) => {
      state.toCurrency = action.payload;
      state.convertedAmount = '';
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
      state.inputError = null;
      state.convertedAmount = '';
    },
    setInputError: (state, action) => {
      state.inputError = action.payload;
    },
    resetConversion: (state) => {
      state.convertedAmount = '';
      state.rate = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.loading = false;
        state.rate = action.payload.rate;
        if (action.payload.amount && !isNaN(action.payload.amount)) {
          state.convertedAmount = (action.payload.amount * action.payload.rate).toFixed(2);
        }
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setFromCurrency, setToCurrency, setAmount, setInputError, resetConversion } = exchangeSlice.actions;
export default exchangeSlice.reducer;