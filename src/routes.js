import { PDFViewer } from '@react-pdf/renderer';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ProductPage from './pages/ProductPage';
import BarangKeluarPage from './pages/BarangKeluarPage';
import BarangMasukPage from './pages/BarangMasukPage';
import MyDocument from './pages/MyDocument';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductPage /> },
        { path: 'barang-keluar', element: <BarangKeluarPage /> },
        { path: 'barang-masuk', element: <BarangMasukPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'pdf-barang-keluar', element: <MyDocument />
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}