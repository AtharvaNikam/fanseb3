import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { adminDashboardRoutes } from './admin-dashboard';
import { authRoutes } from './auth';
import { authAdminRoutes } from './auth-admin';
import { brandDashboardRoutes } from './brand-dashboard';
import { componentsRoutes } from './components';
import { customerDashboardRoutes } from './customer-dashboard';
import { influencerDashboardRoutes } from './influencer-dashboard';
import { HomePage, mainRoutes } from './main';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    {
      path: '/home',
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },

    // Auth routes
    ...authRoutes,

    // Admin routes
    ...authAdminRoutes,

    // Dashboard routes
    // ...dashboardRoutes,

    // Customer routes
    ...customerDashboardRoutes,

    // Brand routes
    ...brandDashboardRoutes,

    // Influencer routes
    ...influencerDashboardRoutes,

    // Admin routes
    ...adminDashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
