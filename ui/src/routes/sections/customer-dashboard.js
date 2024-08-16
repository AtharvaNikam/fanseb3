import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
// components
import { LoadingScreen } from 'src/components/loading-screen';
import MainLayout from 'src/layouts/main/layout';
import { RolesAuthRoute } from './rolesAuthRoutes';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/customer-dashboard/app'));

// ORDERS
// const OrdersListPage = lazy(() => import('src/pages/customer-dashboard/orders/list'));
// const OrdersEditPage = lazy(() => import('src/pages/customer-dashboard/orders/edit'));
const OrdersDetailsPage = lazy(() => import('src/pages/customer-dashboard/orders/details'));

// ----------------------------------------------------------------------

export const customerDashboardRoutes = [
  {
    path: 'customer-dashboard',
    element: (
      <AuthGuard>
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      </AuthGuard>
    ),
    children: [
      {
        element: (
          <RolesAuthRoute roles={['customer']}>
            <IndexPage />
          </RolesAuthRoute>
        ),
        index: true,
      },
      {
        path: 'orders',
        children: [
          {
            element: <RolesAuthRoute>{/* <OrdersListPage /> */}</RolesAuthRoute>,
            index: true,
          },
          {
            path: ':id/edit',
            element: <RolesAuthRoute roles={['admin']}>{/* <OrdersEditPage /> */}</RolesAuthRoute>,
          },
          {
            path: ':id_order',
            element: (
              <RolesAuthRoute roles={['customer']}>
                <OrdersDetailsPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
    ],
  },
];
