import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './slices/geoSlice';
import locationsReducer from './slices/locationsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    geo: geoReducer,
    locations: locationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
