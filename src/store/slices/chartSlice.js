import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async ({ coinId, days, currency }) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch chart data');
    }
    const data = await response.json();
    if (!data || !data.prices || data.prices.length === 0) {
      throw new Error('Invalid chart data received');
    }
    return data;
  }
);

const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    selectedCoin: 'bitcoin',
    selectedDays: 1,
    chartType: 'Line Chart',
    chartData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
      state.chartData = null;
    },
    setSelectedDays: (state, action) => {
      state.selectedDays = action.payload;
      state.chartData = null;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
        state.error = null;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error('Chart data fetch error:', action.error.message);
      });
  },
});

export const { setSelectedCoin, setSelectedDays, setChartType } = chartSlice.actions;
export default chartSlice.reducer;