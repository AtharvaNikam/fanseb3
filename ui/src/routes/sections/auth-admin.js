import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import AuthClassicLayout from 'src/layouts/auth/classic';
import CompactLayout from 'src/layouts/compact';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const JwtVerifyPage = lazy(() => import('src/pages/auth/jwt/verify'));
const JwtNewPasswordPage = lazy(() => import('src/pages/auth/jwt/new-password'));
const JwtForgotPasswordPage = lazy(() => import('src/pages/auth/jwt/forgot-password'));

// ----------------------------------------------------------------------

export const authAdminRoutes = [
  {
    path: 'admin',
    element: (
      <GuestGuard>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
    ),
    children: [
      {
        element: (
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        ),
        index: true,
      },
      {
        path: 'login',
        element: (
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        ),
      },
      {
        path: 'register',
        element: (
          // <AuthClassicLayout title="Manage the job more effectively with Minimal">
            <JwtRegisterPage />
          // </AuthClassicLayout>
        ),
      },
      {
        element: (
          <CompactLayout>
            <Outlet />
          </CompactLayout>
        ),
        children: [
          { path: 'verify', element: <JwtVerifyPage /> },
          { path: 'new-password', element: <JwtNewPasswordPage /> },
          { path: 'forgot-password', element: <JwtForgotPasswordPage /> },
        ],
      },
    ],
  },
];
