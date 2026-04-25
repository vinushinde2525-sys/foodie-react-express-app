import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import PageLoader from './components/ui/PageLoader';

// Lazy-loaded pages for code splitting
const Home       = lazy(() => import('./pages/Home'));
const Menu       = lazy(() => import('./pages/Menu'));
const FoodDetail = lazy(() => import('./pages/FoodDetail'));
const Cart       = lazy(() => import('./pages/Cart'));
const Checkout   = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const Wishlist   = lazy(() => import('./pages/Wishlist'));
const Analytics  = lazy(() => import('./pages/Analytics'));
const NotFound   = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/"           element={<Home />} />
            <Route path="/menu"       element={<Menu />} />
            <Route path="/food/:id"   element={<FoodDetail />} />
            <Route path="/cart"       element={<Cart />} />
            <Route path="/checkout"   element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="/wishlist"   element={<Wishlist />} />
            <Route path="/analytics"  element={<Analytics />} />
            <Route path="*"           element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
