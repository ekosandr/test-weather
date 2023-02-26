import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocation } from '../../@types/coordinate';

interface geoSliceState {
  locations: ILocation[];
  locationsName: string[];
  lat: string;
  lon: string;
  currrentLocation: number;
  name: string;
}

const initialState: geoSliceState = {
  locations: [],
  locationsName: ['Текущее место'],
  lat: '',
  lon: '',
  currrentLocation: 0,
  name: '',
};

const locationsSlice = createSlice({
  name: 'newLocation',
  initialState,
  reducers: {
    addLocation(state) {
      if (!isNaN(+state.lat) && !isNaN(+state.lon)) {
        state.locations.push({ lat: state.lat, lon: state.lon });
        state.locationsName.push(`${state.lat}:${state.lon}`);
        state.currrentLocation = state.locations.length - 1;
        const locations = state.locations;
        const locationsName = state.locationsName;
        localStorage.setItem('locations', JSON.stringify({ locations, locationsName }));
      }
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
      state.locationsName = [
        ...state.locationsName.filter((item: string, i: number) => i !== action.payload),
      ];
    },
    setCurrentLocation(state, action: PayloadAction<number>) {
      state.currrentLocation = action.payload;
    },
    setLocations(state, action: PayloadAction<ILocation[]>) {
      state.locations = action.payload;
    },
    setLocationsName(state, action: PayloadAction<string[]>) {
      state.locationsName = [...action.payload];
    },
    editLocationName(state, action: PayloadAction<number>) {
      state.locationsName[action.payload] = state.name;
      state.name = '';
      const locations = state.locations;
      const locationsName = state.locationsName;
      localStorage.setItem('locations', JSON.stringify({ locations, locationsName }));
    },
    cancelLocationName(state) {
      state.name = '';
    },
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
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
  setLocations,
  editLocationName,
  changeName,
  cancelLocationName,
  setLocationsName,
} = locationsSlice.actions;

export default locationsSlice.reducer;
