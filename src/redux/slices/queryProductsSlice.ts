/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsByQuery } from '../../api/products';
import { Product } from '../../types';

export interface QueryProductsState {
  items: Product[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: QueryProductsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fecthQueryProducts = createAsyncThunk(
  'queryProducts/fetch',
  (query: string) => {
    return productsByQuery(query);
  },
);

export const queryProductsSlice = createSlice({
  name: 'queryProducts',
  initialState,
  reducers: {
    clearQueryProducts: (state) => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthQueryProducts.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fecthQueryProducts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fecthQueryProducts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearQueryProducts } = queryProductsSlice.actions;

export default queryProductsSlice.reducer;
