import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import CompactLayout from 'src/layouts/compact';
import MainLayout from 'src/layouts/main';
// components
import { SplashScreen } from 'src/components/loading-screen';
import { paths } from '../paths';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/main/home'));
const Page500 = lazy(() => import('src/pages/500'));
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const FaqsPage = lazy(() => import('src/pages/main/faqs'));
const ServicesPage = lazy(() => import('src/pages/main/services/services'));
const AboutPage = lazy(() => import('src/pages/main/about-us'));
const BrandsIndexPage = lazy(() => import('src/pages/main/brands/home'));
const BrandsListPage = lazy(() => import('src/pages/main/brands/brands'));
const BrandsDetailsPage = lazy(() => import('src/pages/main/brands/details'));
const ProductDetailsPage = lazy(() => import('src/pages/main/details'));
const InfluencerPage = lazy(() => import('src/pages/main/influencer/influencer'));
const InfluencerDetailsPage = lazy(() => import('src/pages/main/influencer/details'));
const ContactPage = lazy(() => import('src/pages/main/contact-us'));
const CheckoutPage = lazy(() => import('src/pages/checkout'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));
const ReelsPage = lazy(() => import('src/pages/main/reels/reels'));
const SingleReelPage = lazy(() => import('src/pages/main/reels/singleReelPage'));
const PrivacyPolicy = lazy(() => import('src/sections/home/privacy-policy'));
const TermsAndConditions = lazy(() => import('src/sections/home/termsConditions'));
const Faq = lazy(() => import('src/sections/home/faq'));
const Info = lazy(()=> import('src/sections/home/OurInfo'));
const ReturnPolicy = lazy(() => import('src/sections/home/ReturnPolicy'));
// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: 'checkout', element: <CheckoutPage /> },
      {
        path: 'brands',
        children: [
          { element: <BrandsIndexPage />, index: true },
          { path: 'list', element: <BrandsListPage /> },
          {
            path: ':brandId',
            children: [
              { element: <BrandsDetailsPage />, index: true },
              { path: 'details', element: <BrandsDetailsPage /> },
              { path: 'product/:productId', element: <ProductDetailsPage /> },
            ],
          },
        ],
      },
      {
        path: 'reels',
        children: [
          { element: <ReelsPage />, index: true },
          { path: ':reelId', element: <ReelsPage /> },
        ],
      },
      { path: '/influencer/:influencerId', element: <InfluencerDetailsPage /> },
      { path: '/influencer/:influencerId/details', element: <InfluencerDetailsPage /> },
      { path: '/influencer/:influencerId/product/:productId', element: <ProductDetailsPage /> },
      { path: paths.about, element: <AboutPage /> },
      { path: paths.contact, element: <ContactPage /> },
      { path: paths.faqs, element: <FaqsPage /> },
      { path: paths.services, element: <ServicesPage /> },
      { path: paths.home, element: <HomePage /> },
      { path: paths.privacyPolicy, element:<PrivacyPolicy/>},
      { path: paths.termsConditions, element:<TermsAndConditions/>},
      { path: paths.faqSection, element:<Faq/>},
      { path: paths.ourInfo, element:<Info/>},
      { path: paths.returnPolicy, element:<ReturnPolicy/>}
    ],
  },

  {
    element: (
      <CompactLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [
      { path: paths.comingSoon, element: <ComingSoonPage /> },
      { path: paths.maintenance, element: <MaintenancePage /> },
      { path: paths.page500, element: <Page500 /> },
      { path: paths.page404, element: <Page404 /> },
      { path: paths.page403, element: <Page403 /> },
    ],
  },
];
