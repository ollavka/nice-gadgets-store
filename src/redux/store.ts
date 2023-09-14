import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import queryProductsReducer from './slices/queryProductsSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';
import productsStatsReducer from './slices/productsStatsSlice';
import suggestedProductsReducer from './slices/suggestedProductsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    queryProducts: queryProductsReducer,
    productDetails: productDetailsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    productsStats: productsStatsReducer,
    suggestedProducts: suggestedProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
