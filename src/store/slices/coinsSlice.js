import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCoins = createAsyncThunk(
  'coins/fetchCoins',
  async (currency) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&sparkline=false`
    );
    const data = await response.json();
    return data;
  }
);

const coinsSlice = createSlice({
  name: 'coins',
  initialState: {
    coins: [],
    loading: false,
    error: null,
    selectedCoin: null,
  },
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCoin } = coinsSlice.actions;
export default coinsSlice.reducer; 