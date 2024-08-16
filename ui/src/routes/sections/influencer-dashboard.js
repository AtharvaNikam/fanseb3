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
const IndexPage = lazy(() => import('src/pages/influencer-dashboard/influencer/details'));

// Reels
const ProductsListPage = lazy(() => import('src/pages/influencer-dashboard/products/list'));
const ProductsNewPage = lazy(() => import('src/pages/influencer-dashboard/products/new'));
// Reels  
const ReelsListPage = lazy(() => import('src/pages/influencer-dashboard/reels/list'));
const ReelsNewPage = lazy(() => import('src/pages/influencer-dashboard/reels/new'));
const ReelsEditPage = lazy(() => import('src/pages/influencer-dashboard/reels/edit'));
// Withdrawals
const WithdrawalsListPage = lazy(() => import('src/pages/influencer-dashboard/withdrawals/list'));
const WithdrawalsNewPage = lazy(() => import('src/pages/influencer-dashboard/withdrawals/new'));

// INfluencer
const InfluencerListPage = lazy(() => import('src/pages/influencer-dashboard/influencer/list'));
const InfluencerUserAccountPage = lazy(() =>
  import('src/pages/influencer-dashboard/influencer/account')
);
const InfluencerNewPage = lazy(() => import('src/pages/influencer-dashboard/influencer/new'));
const InfluencerEditPage = lazy(() => import('src/pages/influencer-dashboard/influencer/edit'));
const InfluencerDetailsPage = lazy(() =>
  import('src/pages/influencer-dashboard/influencer/details')
);
// BLANK
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------

export const influencerDashboardRoutes = [
  {
    path: 'influencer-dashboard',
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
        path: 'userProfile',
        element: (
          <RolesAuthRoute roles={['influencer']}>
            <InfluencerUserAccountPage />
          </RolesAuthRoute>
        ),
      },

      {
        path: 'influencer',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <InfluencerDetailsPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <InfluencerNewPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <InfluencerEditPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: ':id',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <InfluencerDetailsPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'influencerProducts',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <ProductsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },

          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <ProductsNewPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'reels',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <ReelsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: 'list',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <ReelsListPage />
              </RolesAuthRoute>
            ),
          },

          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <ReelsNewPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <ReelsEditPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'influencerWithdrawals',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <WithdrawalsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: 'list',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <WithdrawalsListPage />
              </RolesAuthRoute>
            ),
          },

          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['influencer']}>
                <WithdrawalsNewPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'blank',
        element: (
          <RolesAuthRoute roles={['influencer']}>
            <BlankPage />
          </RolesAuthRoute>
        ),
      },
    ],
  },
];
