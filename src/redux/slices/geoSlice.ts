import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { ILocation } from '../../@types/coordinate';
import { IForcast, IForecasts } from '../../@types/forecast';

interface geoSliceState {
  isAllow: boolean;
  geolocation: IForecasts[];
  day: number;
  sevenForcast: IForcast[];
  dayView: IForecasts | IForcast | null;
  status: 'loading' | 'success' | 'error';
}

export const fetchForecast = createAsyncThunk('forecast/fetchItems', async (params: ILocation) => {
  const { lat, lon } = params;
  const options = {
    method: 'GET',
    url: 'https://weeeeather.onrender.com/',
    params: { lat: +lat, lon: +lon },
  };
  const { data } = await axios.request<IForecasts>(options);
  return data;
});

const initialState: geoSliceState = {
  isAllow: false,
  geolocation: [],
  day: 0,
  sevenForcast: [],
  dayView: null,
  status: 'loading',
};

const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    currentDay(state) {
      state.dayView = state.geolocation[0];
    },
    changeDayView(state, action: PayloadAction<IForcast>) {
      state.dayView = action.payload;
    },
    changeAllow(state, action: PayloadAction<boolean>) {
      state.isAllow = action.payload;
    },
    changeDay(state, action: PayloadAction<number>) {
      state.day = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.geolocation = [action.payload];
      state.sevenForcast = action.payload.forecasts;
      state.status = 'success';
      state.dayView = action.payload.forecasts[state.day];
    });
    builder.addCase(fetchForecast.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const { changeDayView, changeAllow, changeDay, currentDay } = geoSlice.actions;

export default geoSlice.reducer;
