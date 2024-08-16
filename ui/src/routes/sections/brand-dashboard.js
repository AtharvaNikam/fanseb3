import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import { RolesAuthRoute } from './rolesAuthRoutes';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/brand-dashboard/brands/list'));

// Products
const ProductsListPage = lazy(() => import('src/pages/brand-dashboard/products/list'));
const ProductsNewPage = lazy(() => import('src/pages/brand-dashboard/products/new'));
const ProductsEditPage = lazy(() => import('src/pages/brand-dashboard/products/edit'));
// Questions
const QuestionsListPage = lazy(() => import('src/pages/brand-dashboard/questions/list'));
// Refunds
const RefundsListPage = lazy(() => import('src/pages/brand-dashboard/refunds/list'));
const RefundsDetailsPage = lazy(() => import('src/pages/brand-dashboard/refunds/edit'));
// Reviews
const ReviewsListPage = lazy(() => import('src/pages/brand-dashboard/reviews/list'));
// Staff
const StaffListPage = lazy(() => import('src/pages/brand-dashboard/staff/list'));
const StaffNewPage = lazy(() => import('src/pages/brand-dashboard/staff/new'));
// Withdrawals
const WithdrawalsListPage = lazy(() => import('src/pages/brand-dashboard/withdrawals/list'));
const WithdrawalsNewPage = lazy(() => import('src/pages/brand-dashboard/withdrawals/new'));
// Orders
const OrdersListPage = lazy(() => import('src/pages/brand-dashboard/orders/list'));
const OrdersDetailsPage = lazy(() => import('src/pages/brand-dashboard/orders/details'));
// const OrdersEditPage = lazy(() => import('src/pages/dashboard/orders/edit'));
// BRANDS
const BrandsListPage = lazy(() => import('src/pages/brand-dashboard/brands/list'));
const BrandsNewPage = lazy(() => import('src/pages/brand-dashboard/brands/new'));
const BrandsUserProfile = lazy(() => import('src/pages/brand-dashboard/brands/account'));
const BrandEditPage = lazy(() => import('src/pages/brand-dashboard/brands/edit'));
const BrandDetailsPage = lazy(() => import('src/pages/brand-dashboard/brands/details'));

// BLANK
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------

export const brandDashboardRoutes = [
  {
    path: 'brand-dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'brands',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin', 'brand']}>
                <BrandsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          // { path: 'list', element: <BrandsListPage /> }, // Commented out as it's duplicated
          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['admin', 'brand']}>
                <BrandsNewPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: 'userProfile',
            element: (
              <RolesAuthRoute roles={['admin', 'brand']}>
                <BrandsUserProfile />
              </RolesAuthRoute>
            ),
          },
          {
            path: ':id',
            element: (
              <RolesAuthRoute roles={['admin', 'brand']}>
                <BrandDetailsPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin', 'brand']}>
                <BrandEditPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: ':id/products',
            children: [
              {
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <ProductsListPage />
                  </RolesAuthRoute>
                ),
                index: true,
              },
              {
                path: 'list',
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <ProductsListPage />
                  </RolesAuthRoute>
                ),
              },

              {
                path: 'new',
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <ProductsNewPage />
                  </RolesAuthRoute>
                ),
              },
              {
                path: ':id_p/edit',
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <ProductsEditPage />
                  </RolesAuthRoute>
                ),
              },

              // Add any additional paths for products under ':id' as needed
            ],
          },
          {
            path: ':id/orders',
            children: [
              {
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <OrdersListPage />
                  </RolesAuthRoute>
                ),
                index: true,
              },

              {
                path: ':id_order',
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <OrdersDetailsPage />
                  </RolesAuthRoute>
                ),
              },
            ],
          },
          {
            path: ':id/withdrawals',
            children: [
              {
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <WithdrawalsListPage />
                  </RolesAuthRoute>
                ),
                index: true,
              },

              {
                path: 'new',
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <WithdrawalsNewPage />
                  </RolesAuthRoute>
                ),
              },
            ],
          },
          {
            path: ':id/staff',
            children: [
              {
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <StaffListPage />
                  </RolesAuthRoute>
                ),
                index: true,
              },

              {
                path: 'new',
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <StaffNewPage />
                  </RolesAuthRoute>
                ),
              },
            ],
          },
          {
            path: ':id/reviews',
            children: [
              {
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <ReviewsListPage />
                  </RolesAuthRoute>
                ),
                index: true,
              },
            ],
          },
          {
            path: ':id/refunds',
            children: [
              {
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <RefundsListPage />
                  </RolesAuthRoute>
                ),
                index: true,
              },
              {
                path: ':id/edit',
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <RefundsDetailsPage />
                  </RolesAuthRoute>
                ),
              },
            ],
          },
          {
            path: ':id/questions',
            children: [
              {
                element: (
                  <RolesAuthRoute roles={['admin', 'brand']}>
                    <QuestionsListPage />
                  </RolesAuthRoute>
                ),
                index: true,
              },
            ],
          },
        ],
      },
    ],
  },
];
