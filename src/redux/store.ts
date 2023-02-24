import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './slices/geoSlice';
import newLocationReducer from './slices/newLocationSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    geo: geoReducer,
    locations: newLocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
