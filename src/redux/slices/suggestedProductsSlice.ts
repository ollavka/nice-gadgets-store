/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSuggestedProducts } from '../../api/products';
import { SuggestedProducts } from '../../types';

export interface SuggestedProductsState {
  data: SuggestedProducts;
  loaded: boolean;
  hasError: boolean;
}

const initialState: SuggestedProductsState = {
  data: {
    discount: [],
    newest: [],
  },
  loaded: false,
  hasError: false,
};

export const fecthSuggestedProducts = createAsyncThunk(
  'suggestedProducts/fetch',
  () => getSuggestedProducts(),
);

export const suggestedProductsSlice = createSlice({
  name: 'suggestedProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthSuggestedProducts.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fecthSuggestedProducts.fulfilled, (state, action) => {
        state.loaded = true;
        state.data = action.payload;
      })
      .addCase(fecthSuggestedProducts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default suggestedProductsSlice.reducer;
