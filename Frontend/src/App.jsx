import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import { ProductProvider } from './context/ProductContext';
import ProductDetails from './pages/ProductDetails';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import PublicRoute from './components/PublicRoute';
import AdressPage from './pages/AdressPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importação do CSS do Toastify
import { AdressProvider } from './context/AdressProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <AdressProvider>
            <Routes>
              <Route
                path="/"
                element={<PublicRoute element={<RegisterPage />} />}
              />
              <Route
                path="/signup"
                element={<PublicRoute element={<SignUpPage />} />}
              />
              <Route
                path="/signin"
                element={<PublicRoute element={<SignInPage />} />}
              />
              <Route
                path="/catalog"
                element={<ProtectedRoute element={<ProductPage />} />}
              />

              <Route
                path="/adress"
                element={<ProtectedRoute element={<AdressPage />} />}
              />
              <Route
                path="/checkout"
                element={<ProtectedRoute element={<CheckoutPage />} />}
              />
              <Route
                path="/catalog/:id"
                element={<ProtectedRoute element={<ProductDetails />} />}
              />
              <Route
                path="/cart"
                element={<ProtectedRoute element={<CartPage />} />}
              />
            </Routes>
            {/* Adicionando o ToastContainer para que os toasts sejam exibidos */}
            <ToastContainer
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </AdressProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
