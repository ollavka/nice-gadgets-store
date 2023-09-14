/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsStats } from '../../api/products';
import { getInitialCategoriesStats } from '../../helpers/getInitialCategoriesStats';
import { CategoryMap } from '../../types';

export interface ProductsStatsState {
  countByGroup: CategoryMap;
  loaded: boolean;
  hasError: boolean;
}

const initialState: ProductsStatsState = {
  countByGroup: getInitialCategoriesStats(),
  loaded: false,
  hasError: false,
};

export const fecthProductsStats = createAsyncThunk('productsStats/fetch', () => getProductsStats());

export const productsStatsSlice = createSlice({
  name: 'productsStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthProductsStats.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fecthProductsStats.fulfilled, (state, action) => {
        state.countByGroup = action.payload;
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(fecthProductsStats.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default productsStatsSlice.reducer;
