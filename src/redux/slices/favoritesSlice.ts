/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

const FAVORITES = 'favorites';

const storageValue = localStorage.getItem(FAVORITES);

const initialState: Product[] = storageValue ? JSON.parse(storageValue) : [];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
      localStorage.setItem(FAVORITES, JSON.stringify(state));
    },
    remove: (state, action: PayloadAction<string>) => {
      const newState = state.filter((product) => product.id !== action.payload);

      localStorage.setItem(FAVORITES, JSON.stringify(newState));

      return newState;
    },
  },
});

export const { add, remove } = favoritesSlice.actions;

export default favoritesSlice.reducer;
