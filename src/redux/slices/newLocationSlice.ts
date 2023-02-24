import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocation } from '../../@types/coordinate';

interface geoSliceState {
  locations: ILocation[];
  lat: string;
  lon: string;
  currrentLocation: number;
}

const initialState: geoSliceState = {
  locations: [],
  lat: '',
  lon: '',
  currrentLocation: 0,
};

const newLocationSlice = createSlice({
  name: 'newLocation',
  initialState,
  reducers: {
    addLocation(state: geoSliceState) {
      if (!isNaN(+state.lat) && !isNaN(+state.lon)) {
        state.locations.push({ lat: state.lat, lon: state.lon });
      }
      state.currrentLocation += 1;
      state.lat = '';
      state.lon = '';
    },
    onChangeLat(state, action: PayloadAction<string>) {
      state.lat = action.payload;
    },
    onChangeLon(state, action: PayloadAction<string>) {
      state.lon = action.payload;
    },
    firstAddLocation(state, actio: PayloadAction<ILocation>) {
      state.locations.push(actio.payload);
    },
    deleteLocation(state, action: PayloadAction<number>) {
      state.locations = [
        ...state.locations.filter((item: ILocation, i: number) => i !== action.payload),
      ];
    },
    setCurrentLocation(state, action: PayloadAction<number>) {
      state.currrentLocation = action.payload;
    },
  },
});

export const {
  addLocation,
  deleteLocation,
  onChangeLat,
  onChangeLon,
  firstAddLocation,
  setCurrentLocation,
} = newLocationSlice.actions;

export default newLocationSlice.reducer;
