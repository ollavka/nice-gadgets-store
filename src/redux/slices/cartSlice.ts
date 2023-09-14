/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

const CART = 'cart';

type CartItem = {
  item: Product;
  count: number;
};

export type CartState = {
  items: Record<string, CartItem>;
  totalPrice: number;
  totalCount: number;
};

const storageValue = localStorage.getItem(CART);
const initialState: CartState = storageValue
  ? JSON.parse(storageValue)
  : {
    items: {},
    totalCount: 0,
    totalPrice: 0,
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOneModel: (state, action: PayloadAction<Product>) => {
      const productId = action.payload.itemId;

      if (!(productId in state.items)) {
        state.items[productId] = {
          item: action.payload,
          count: 0,
        };
      }

      state.items[productId].count++;
      state.totalCount++;
      state.totalPrice += action.payload.price;

      localStorage.setItem(CART, JSON.stringify(state));
    },
    removeOneModel: (state, action: PayloadAction<Product>) => {
      const productId = action.payload.itemId;

      if (!(productId in state.items) || state.items[productId].count <= 1) {
        return;
      }

      state.items[productId].count--;
      state.totalCount--;
      state.totalPrice -= action.payload.price;
      localStorage.setItem(CART, JSON.stringify(state));
    },
    removeModelsByType: (state, action: PayloadAction<Product>) => {
      const { price, itemId: productId } = action.payload;

      state.totalPrice -= price * state.items[productId].count;
      state.totalCount -= state.items[productId].count;
      delete state.items[productId];

      localStorage.setItem(CART, JSON.stringify(state));
    },
    clear: (state) => {
      state.items = {};
      state.totalCount = 0;
      state.totalPrice = 0;

      localStorage.setItem(CART, JSON.stringify(state));
    },
  },
});

export const {
  addOneModel, removeOneModel, removeModelsByType, clear,
}
  = cartSlice.actions;

export default cartSlice.reducer;
