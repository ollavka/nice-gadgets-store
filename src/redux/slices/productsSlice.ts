/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../api/products';
import { ApiOptions, Product } from '../../types';

export interface ProductsState {
  items: Product[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: ProductsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fecthProducts = createAsyncThunk(
  'products/fetch',
  (options: ApiOptions) => {
    return getProducts(options);
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthProducts.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fecthProducts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fecthProducts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default productsSlice.reducer;
