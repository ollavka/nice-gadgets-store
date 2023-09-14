/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductDescription, getProductInfo } from '../../api/products';
import { ProductDetails } from '../../types';

export interface ProductDetailsState {
  item: ProductDetails;
  loaded: boolean;
  hasError: boolean;
}

const initialState: ProductDetailsState = {
  item: {} as ProductDetails,
  loaded: false,
  hasError: false,
};

export const fecthProductDetails = createAsyncThunk(
  'productDetails/fetch',
  (productId: string) => {
    return Promise.all([
      getProductInfo(productId),
      getProductDescription(productId),
    ]);
  },
);

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    clearDetails: (state) => {
      state.hasError = false;
      state.loaded = false;
      state.item = {} as ProductDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthProductDetails.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
        state.item = {} as ProductDetails;
      })
      .addCase(fecthProductDetails.fulfilled, (state, action) => {
        const [productDetails, productDescription] = action.payload;

        state.item = {
          ...productDetails,
          description: productDescription,
        };

        state.hasError = false;
        state.loaded = true;
      })
      .addCase(fecthProductDetails.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
        state.item = {} as ProductDetails;
      });
  },
});

export const { clearDetails } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
