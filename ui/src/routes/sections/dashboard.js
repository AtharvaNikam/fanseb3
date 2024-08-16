// import { lazy, Suspense } from 'react';
// import { Outlet } from 'react-router-dom';
// // auth
// import { AuthGuard } from 'src/auth/guard';
// // layouts
// import DashboardLayout from 'src/layouts/dashboard';
// // components
// import { LoadingScreen } from 'src/components/loading-screen';
// import { RolesAuthRoute } from './rolesAuthRoutes';

// // ----------------------------------------------------------------------

// // OVERVIEW
// const IndexPage = lazy(() => import('src/pages/dashboard/app'));

// // USER
// const UserProfilePage = lazy(() => import('src/pages/admin-dashboard/user/profile'));
// const UserCardsPage = lazy(() => import('src/pages/admin-dashboard/user/cards'));
// const UserListPage = lazy(() => import('src/pages/admin-dashboard/user/list'));
// const UserAccountPage = lazy(() => import('src/pages/admin-dashboard/user/account'));
// const UserCreatePage = lazy(() => import('src/pages/admin-dashboard/user/new'));
// const UserEditPage = lazy(() => import('src/pages/admin-dashboard/user/edit'));
// // CATEGORY
// const CategoryListPage = lazy(() => import('src/pages/admin-dashboard/categories/list'));
// const CategoryEditPage = lazy(() => import('src/pages/admin-dashboard/categories/edit'));
// const CategoryCreatePage = lazy(() => import('src/pages/admin-dashboard/categories/new'));
// // Reels
// const ReelsListPage = lazy(() => import('src/pages/influencer-dashboard/reels/list'));
// const ReelsNewPage = lazy(() => import('src/pages/influencer-dashboard/reels/new'));
// const ReelsEditPage = lazy(() => import('src/pages/influencer-dashboard/reels/edit'));
// // Withdrawals
// const WithdrawalsListPage = lazy(() => import('src/pages/brand-dashboard/withdrawals/list'));
// const WithdrawalsNewPage = lazy(() => import('src/pages/brand-dashboard/withdrawals/new'));
// // Products
// const ProductsListPage = lazy(() => import('src/pages/brand-dashboard/products/list'));
// const ProductsNewPage = lazy(() => import('src/pages/brand-dashboard/products/new'));
// const ProductsEditPage = lazy(() => import('src/pages/brand-dashboard/products/edit'));
// // Orders
// const OrdersListPage = lazy(() => import('src/pages/brand-dashboard/orders/list'));
// const OrdersDetailsPage = lazy(() => import('src/pages/brand-dashboard/orders/details'));
// // const OrdersEditPage = lazy(() => import('src/pages/dashboard/orders/edit'));
// // BRANDS
// const BrandsListPage = lazy(() => import('src/pages/brand-dashboard/brands/list'));
// const BrandsNewPage = lazy(() => import('src/pages/brand-dashboard/brands/new'));
// const BrandEditPage = lazy(() => import('src/pages/brand-dashboard/brands/edit'));
// const BrandDetailsPage = lazy(() => import('src/pages/brand-dashboard/brands/details'));
// // INfluencer
// const InfluencerListPage = lazy(() => import('src/pages/influencer-dashboard/influencer/list'));
// const InfluencerNewPage = lazy(() => import('src/pages/influencer-dashboard/influencer/new'));
// const InfluencerEditPage = lazy(() => import('src/pages/influencer-dashboard/influencer/edit'));
// const InfluencerDetailsPage = lazy(() =>
//   import('src/pages/influencer-dashboard/influencer/details')
// );
// // BLANK
// const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// // ----------------------------------------------------------------------

// export const dashboardRoutes = [
//   {
//     path: 'dashboard',
//     element: (
//       <AuthGuard>
//         <DashboardLayout>
//           <Suspense fallback={<LoadingScreen />}>
//             <Outlet />
//           </Suspense>
//         </DashboardLayout>
//       </AuthGuard>
//     ),
//     children: [
//       { element: <IndexPage />, index: true },
//       {
//         path: 'user',
//         children: [
//           // { element: <UserProfilePage />, index: true },
//           {
//             path: 'profile',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <UserProfilePage />
//               </RolesAuthRoute>
//             ),
//           },
//           { path: 'cards', element: <UserCardsPage /> },
//           {
//             path: 'list',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <UserListPage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: 'new',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <UserCreatePage />
//               </RolesAuthRoute>
//             ),
//           },

//           {
//             path: ':id/edit',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <UserEditPage />
//               </RolesAuthRoute>
//             ),
//           },

//           {
//             path: 'account',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <UserAccountPage />
//               </RolesAuthRoute>
//             ),
//           },
//         ],
//       },
//       {
//         path: 'categories',
//         children: [
//           {
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <CategoryListPage />
//               </RolesAuthRoute>
//             ),
//             index: true,
//           },

//           {
//             path: 'list',
//             element: (
//               <RolesAuthRoute roles={['admin', 'brand']}>
//                 <CategoryListPage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: 'new',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <CategoryCreatePage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: ':id/edit',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <CategoryEditPage />
//               </RolesAuthRoute>
//             ),
//           },
//         ],
//       },
//       {
//         path: 'brands',
//         children: [
//           {
//             element: (
//               <RolesAuthRoute roles={['admin', 'brand']}>
//                 <BrandsListPage />
//               </RolesAuthRoute>
//             ),
//             index: true,
//           },
//           // { path: 'list', element: <BrandsListPage /> }, // Commented out as it's duplicated
//           {
//             path: 'new',
//             element: (
//               <RolesAuthRoute roles={['admin', 'brand']}>
//                 <BrandsNewPage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: ':id',
//             element: (
//               <RolesAuthRoute roles={['admin', 'brand']}>
//                 <BrandDetailsPage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: ':id/edit',
//             element: (
//               <RolesAuthRoute roles={['admin', 'brand']}>
//                 <BrandEditPage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: ':id/products',
//             children: [
//               {
//                 element: (
//                   <RolesAuthRoute roles={['admin', 'brand']}>
//                     <ProductsListPage />
//                   </RolesAuthRoute>
//                 ),
//                 index: true,
//               },
//               {
//                 path: 'list',
//                 element: (
//                   <RolesAuthRoute roles={['admin', 'brand']}>
//                     <ProductsListPage />
//                   </RolesAuthRoute>
//                 ),
//               },

//               {
//                 path: 'new',
//                 element: (
//                   <RolesAuthRoute roles={['admin', 'brand']}>
//                     <ProductsNewPage />
//                   </RolesAuthRoute>
//                 ),
//               },
//               {
//                 path: ':id_p/edit',
//                 element: (
//                   <RolesAuthRoute roles={['admin', 'brand']}>
//                     <ProductsEditPage />
//                   </RolesAuthRoute>
//                 ),
//               },

//               // Add any additional paths for products under ':id' as needed
//             ],
//           },
//           {
//             path: ':id/orders',
//             children: [
//               {
//                 element: (
//                   <RolesAuthRoute roles={['admin', 'brand']}>
//                     <OrdersListPage />
//                   </RolesAuthRoute>
//                 ),
//                 index: true,
//               },

//               {
//                 path: ':id_order',
//                 element: (
//                   <RolesAuthRoute roles={['admin', 'brand']}>
//                     <OrdersDetailsPage />
//                   </RolesAuthRoute>
//                 ),
//               },
//             ],
//           },
//         ],
//       },
//       {
//         path: 'influencer',
//         children: [
//           {
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <InfluencerDetailsPage />
//               </RolesAuthRoute>
//             ),
//             index: true,
//           },
//           {
//             path: 'list',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <InfluencerDetailsPage />
//               </RolesAuthRoute>
//             ),
//           },

//           {
//             path: 'new',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <InfluencerNewPage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: ':id/edit',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <InfluencerEditPage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: ':id',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <InfluencerDetailsPage />
//               </RolesAuthRoute>
//             ),
//           },
//         ],
//       },

//       {
//         path: 'reels',
//         children: [
//           {
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <ReelsListPage />
//               </RolesAuthRoute>
//             ),
//             index: true,
//           },
//           {
//             path: 'list',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <ReelsListPage />
//               </RolesAuthRoute>
//             ),
//           },

//           {
//             path: 'new',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <ReelsNewPage />
//               </RolesAuthRoute>
//             ),
//           },
//           {
//             path: ':id/edit',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <ReelsEditPage />
//               </RolesAuthRoute>
//             ),
//           },
//         ],
//       },
//       {
//         path: 'withdrawals',
//         children: [
//           {
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <WithdrawalsListPage />
//               </RolesAuthRoute>
//             ),
//             index: true,
//           },
//           {
//             path: 'list',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <WithdrawalsListPage />
//               </RolesAuthRoute>
//             ),
//           },

//           {
//             path: 'new',
//             element: (
//               <RolesAuthRoute roles={['admin']}>
//                 <WithdrawalsNewPage />
//               </RolesAuthRoute>
//             ),
//           },
//         ],
//       },
//       {
//         path: 'blank',
//         element: (
//           <RolesAuthRoute roles={['admin']}>
//             <BlankPage />
//           </RolesAuthRoute>
//         ),
//       },
//     ],
//   },
// ];
