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
const IndexPage = lazy(() => import('src/pages/admin-dashboard/app'));

// USER
const UserProfilePage = lazy(() => import('src/pages/admin-dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/admin-dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/admin-dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/admin-dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/admin-dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/admin-dashboard/user/edit'));
// CATEGORY
const CategoryListPage = lazy(() => import('src/pages/admin-dashboard/categories/list'));
const CategoryEditPage = lazy(() => import('src/pages/admin-dashboard/categories/edit'));
const CategoryCreatePage = lazy(() => import('src/pages/admin-dashboard/categories/new'));
// Questions
const QuestionsListPage = lazy(() => import('src/pages/admin-dashboard/questions/list'));
// Refunds
const RefundsListPage = lazy(() => import('src/pages/admin-dashboard/refunds/list'));
const RefundsEditPage = lazy(() => import('src/pages/admin-dashboard/refunds/edit'));
const RefundsDetailsPage = lazy(() => import('src/pages/admin-dashboard/refunds/edit'));
// Reviews
const ReviewsListPage = lazy(() => import('src/pages/admin-dashboard/reviews/list'));
// Products
const ProductsListPage = lazy(() => import('src/pages/admin-dashboard/products/list'));
const ProductsEditPage = lazy(() => import('src/pages/admin-dashboard/products/edit'));
// Brand Withdrawals
const BrandWithdrawalsListPage = lazy(() =>
  import('src/pages/admin-dashboard/brand-withdrawals/list')
);
const BrandWithdrawalsEditPage = lazy(() =>
  import('src/pages/admin-dashboard/brand-withdrawals/edit')
);
// Withdrawals
const InfluencerWithdrawalsListPage = lazy(() =>
  import('src/pages/admin-dashboard/influencer-withdrawals/list')
);
const InfluencerWithdrawalsEditPage = lazy(() =>
  import('src/pages/admin-dashboard/influencer-withdrawals/edit')
);

// Products
// const ProductsListPage = lazy(() => import('src/pages/admin-dashboard/brands/products/list'));
const ProductsNewPage = lazy(() => import('src/pages/admin-dashboard/brands/products/new'));
// const ProductsEditPage = lazy(() => import('src/pages/admin-dashboard/brands/products/edit'));
// Orders
const OrdersListPage = lazy(() => import('src/pages/admin-dashboard/orders/list'));
const OrdersEditPage = lazy(() => import('src/pages/admin-dashboard/orders/details'));
const OrdersDetailsPage = lazy(() => import('src/pages/admin-dashboard/orders/details'));
// Brands
const BrandListPage = lazy(() => import('src/pages/admin-dashboard/brands/list'));
const MyBrandsListPage = lazy(() => import('src/pages/admin-dashboard/brands/my-brands'));
// BRANDS
const BrandsListPage = lazy(() => import('src/pages/admin-dashboard/brands/list'));
const BrandsNewPage = lazy(() => import('src/pages/admin-dashboard/brands/new'));
const BrandsUserProfile = lazy(() => import('src/pages/admin-dashboard/brands/account'));
const BrandEditPage = lazy(() => import('src/pages/admin-dashboard/brands/edit'));
const BrandDetailsPage = lazy(() => import('src/pages/admin-dashboard/brands/details'));
// Withdrawals
const WithdrawalsListPage = lazy(() => import('src/pages/admin-dashboard/brands/withdrawals/list'));
const WithdrawalsNewPage = lazy(() => import('src/pages/admin-dashboard/brands/withdrawals/new'));
// const OrdersEditPage = lazy(() => import('src/pages/admin-dashboard/orders/details'));
// const OrdersDetailsPage = lazy(() => import('src/pages/admin-dashboard/orders/details'));
// Orders Status
const OrdersStatusListPage = lazy(() => import('src/pages/admin-dashboard/orders-status/list'));
const OrdersStatusEditPage = lazy(() => import('src/pages/admin-dashboard/orders-status/edit'));
const OrdersStatusNewPage = lazy(() => import('src/pages/admin-dashboard/orders-status/new'));
// Taxes
const TaxesListPage = lazy(() => import('src/pages/admin-dashboard/taxes/list'));
const TaxesEditPage = lazy(() => import('src/pages/admin-dashboard/taxes/edit'));
const TaxesNewPage = lazy(() => import('src/pages/admin-dashboard/taxes/new'));
// Shippings
const ShippingsListPage = lazy(() => import('src/pages/admin-dashboard/shippings/list'));
const ShippingsEditPage = lazy(() => import('src/pages/admin-dashboard/shippings/edit'));
const ShippingsNewPage = lazy(() => import('src/pages/admin-dashboard/shippings/new'));
// ----------------------------------------------------------------------

export const adminDashboardRoutes = [
  {
    path: 'admin-dashboard',
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
      {
        element: (
          <RolesAuthRoute roles={['admin']}>
            <IndexPage />
          </RolesAuthRoute>
        ),
        index: true,
      },
      {
        path: 'user',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <UserListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: 'profile',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <UserProfilePage />
              </RolesAuthRoute>
            ),
          },
          { path: 'cards', element: <UserCardsPage /> },
          {
            path: 'list',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <UserListPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <UserCreatePage />
              </RolesAuthRoute>
            ),
          },

          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <UserEditPage />
              </RolesAuthRoute>
            ),
          },

          {
            path: 'account',
            element: (
              <RolesAuthRoute roles={['admin', 'influencer', 'brand']}>
                <UserAccountPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'brands',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <BrandListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
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
      {
        path: 'my-brands',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <MyBrandsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },

          {
            path: 'list',
            element: (
              <RolesAuthRoute roles={['admin', 'brand']}>
                <CategoryListPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <CategoryCreatePage />
              </RolesAuthRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <CategoryEditPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'categories',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <CategoryListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },

          {
            path: 'list',
            element: (
              <RolesAuthRoute roles={['admin', 'brand']}>
                <CategoryListPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <CategoryCreatePage />
              </RolesAuthRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <CategoryEditPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'orders',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <OrdersListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <OrdersEditPage />
              </RolesAuthRoute>
            ),
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
        path: 'orders-status',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <OrdersStatusListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <OrdersStatusEditPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <OrdersStatusNewPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'taxes',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <TaxesListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <TaxesEditPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <TaxesNewPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'shippings',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <ShippingsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <ShippingsEditPage />
              </RolesAuthRoute>
            ),
          },
          {
            path: 'new',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <ShippingsNewPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'brand-withdrawals',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <BrandWithdrawalsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <BrandWithdrawalsEditPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'influencer-withdrawals',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <InfluencerWithdrawalsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <InfluencerWithdrawalsEditPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <ProductsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <ProductsEditPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'refunds',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <RefundsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },

          {
            path: ':id/edit',
            element: (
              <RolesAuthRoute roles={['admin']}>
                <RefundsEditPage />
              </RolesAuthRoute>
            ),
          },
        ],
      },
      {
        path: 'reviews',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <ReviewsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
        ],
      },
      {
        path: 'questions',
        children: [
          {
            element: (
              <RolesAuthRoute roles={['admin']}>
                <QuestionsListPage />
              </RolesAuthRoute>
            ),
            index: true,
          },
        ],
      },
    ],
  },
];
