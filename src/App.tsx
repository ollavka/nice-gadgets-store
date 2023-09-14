/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { FC, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { NotFound } from './pages/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';
import { Cart } from './pages/Cart';
import { FavoritesPage } from './pages/Favourites';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ThemeContext } from './context/ThemeContext';
import { ProductCategory } from './types';
import { HomePage } from './pages/HomePage';
import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          {Object.values(ProductCategory).map((category) => (
            <Route path={category} key={category}>
              <Route
                index
                element={<ProductsPage productCategory={category} />}
              />
              <Route path=":productId?" element={<ProductDetailsPage />} />
            </Route>
          ))}

          <Route path="cart" element={<Cart />} />
          <Route path="favorites" element={<FavoritesPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
};
