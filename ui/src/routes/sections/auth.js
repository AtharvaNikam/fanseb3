import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import AuthModernLayout from 'src/layouts/auth/modern';
import CompactLayout from 'src/layouts/compact';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const CustomerLoginPage = lazy(() => import('src/pages/customer-auth/login'));
const CustomerRegisterPage = lazy(() => import('src/pages/customer-auth/register'));
const CustomerVerifyPage = lazy(() => import('src/pages/customer-auth/verify'));
const CustomerNewPasswordPage = lazy(() => import('src/pages/customer-auth/new-password'));
const CustomerForgotPasswordPage = lazy(() => import('src/pages/customer-auth/forgot-password'));

// ----------------------------------------------------------------------

const authCustomer = {
  path: 'customer',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthModernLayout>
          <CustomerLoginPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'register',
      element: (
        // <AuthModernLayout title="Manage the job more effectively with Minimal">
          <CustomerRegisterPage />
        /* </AuthModernLayout> */
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <CustomerVerifyPage /> },
        { path: 'new-password', element: <CustomerNewPasswordPage /> },
        { path: 'forgot-password', element: <CustomerForgotPasswordPage /> },
      ],
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authCustomer],
  },
];
