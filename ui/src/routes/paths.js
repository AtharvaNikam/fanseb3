// utils
import { _id, _postTitles } from 'src/_mock/assets';
import { paramCase } from 'src/utils/change-case';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  ADMIN: '/admin',
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  ADMIN_DASHBOARD: '/admin-dashboard',
  BRAND_DASHBOARD: '/brand-dashboard',
  INFLUENCER_DASHBOARD: '/influencer-dashboard',
  CUSTOMER_DASHBOARD: '/customer-dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  influencer: {
    root: `/reels`,
    currentReel: (reelId) => `/reels/${reelId}`,
    list: `/influencer/list`,
    details: (id) => `/influencer/${id}`,
  },
  brands: {
    root: `/brands`,
    list: `/brands/list`,
    details: (id) => `/brands/${id}`,
  },
  checkout: '/checkout',
  register: '/register',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  services: '/services',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  facebook: 'https://www.facebook.com/fanseb.fanseb',
  twitter: 'https://twitter.com/FANSEB2',
  linkedin: 'https://www.linkedin.com/in/fanseb-influencer-marketing-0788b5205/',
  instagram: 'https://www.instagram.com/fanseb.store/',
  mail: 'mailto:connect@fanseb.com',
  contactUs: 'tel:+919958871816',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  privacyPolicy:'/privacy-policy',
  termsConditions:'/terms-conditions',
  faqSection:'/faq-section',
  ourInfo:'/our-info',
  returnPolicy:'return-policy',
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH ADMIN
  admin: {
    login: `${ROOTS.ADMIN}/login`,
    register: `${ROOTS.ADMIN}/register`,
    newPassword: `${ROOTS.ADMIN}/new-password`,
    verify: `${ROOTS.ADMIN}/verify`,
    forgotPassword: `${ROOTS.ADMIN}/forgot-password`,
  },
  // AUTH
  auth: {
    customer: {
      login: `${ROOTS.AUTH}/customer/login`,
      register: `${ROOTS.AUTH}/customer/register`,
      newPassword: `${ROOTS.AUTH}/customer/new-password`,
      verify: `${ROOTS.AUTH}/customer/verify`,
      forgotPassword: `${ROOTS.AUTH}/customer/forgot-password`,
    },
  },

  customer_dashboard: {
    root: ROOTS.CUSTOMER_DASHBOARD,
    orders: {
      root: `${ROOTS.CUSTOMER_DASHBOARD}/orders`,
      new: `${ROOTS.CUSTOMER_DASHBOARD}/orders/new`,
      edit: (id) => `${ROOTS.CUSTOMER_DASHBOARD}/orders/${id}/edit`,
      details: (id) => `${ROOTS.CUSTOMER_DASHBOARD}/orders/${id}`,
    },
  },
  admin_dashboard: {
    root: ROOTS.ADMIN_DASHBOARD,
    user: {
      root: `${ROOTS.ADMIN_DASHBOARD}/user`,
      new: `${ROOTS.ADMIN_DASHBOARD}/user/new`,
      list: `${ROOTS.ADMIN_DASHBOARD}/user/list`,
      cards: `${ROOTS.ADMIN_DASHBOARD}/user/cards`,
      profile: `${ROOTS.ADMIN_DASHBOARD}/user/profile`,
      account: `${ROOTS.ADMIN_DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.ADMIN_DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    categories: {
      root: `${ROOTS.ADMIN_DASHBOARD}/categories`,
      new: `${ROOTS.ADMIN_DASHBOARD}/categories/new`,
      list: `${ROOTS.ADMIN_DASHBOARD}/categories/list`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/categories/${id}/edit`,
    },
    brands: {
      root: `${ROOTS.ADMIN_DASHBOARD}/brands`,
      new: `${ROOTS.ADMIN_DASHBOARD}/brands/new`,
      list: `${ROOTS.ADMIN_DASHBOARD}/brands/list`,
      userProfile: `${ROOTS.ADMIN_DASHBOARD}/brands/userProfile`,
      dashboard: (id) => `${ROOTS.ADMIN_DASHBOARD}/brands/${id}`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/edit`,
      product: (id, id_product) => ({
        root: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/products`,
        new: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/products/new`,
        details: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/products/${id_product}`,
        edit: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/products/${id_product}/edit`,
      }),
      orders: (id, id_order) => ({
        root: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/orders`,
        details: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/orders/${id_order}`,
      }),
      reviews: (id, id_review) => ({
        root: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/reviews`,
      }),
      questions: (id, id_question) => ({
        root: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/questions`,
      }),
      withdrawals: (id) => ({
        root: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/withdrawals`,
        new: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/withdrawals/new`,
      }),
      staff: (id) => ({
        root: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/staff`,
        new: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/staff/new`,
      }),
      refunds: (id, id_refund) => ({
        root: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/refunds`,
        edit: `${ROOTS.ADMIN_DASHBOARD}/brands/${id}/refunds/${id_refund}/edit`,
      }),
    },
    myBrands: {
      root: `${ROOTS.ADMIN_DASHBOARD}/my-brands`,
      new: `${ROOTS.ADMIN_DASHBOARD}/my-brands/new`,
      list: `${ROOTS.ADMIN_DASHBOARD}/my-brands/list`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/my-brands/${id}/edit`,
    },
    questions: {
      root: `${ROOTS.ADMIN_DASHBOARD}/questions`,
      new: `${ROOTS.ADMIN_DASHBOARD}/questions/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/questions/${id}/edit`,
    },
    reviews: {
      root: `${ROOTS.ADMIN_DASHBOARD}/reviews`,
      new: `${ROOTS.ADMIN_DASHBOARD}/reviews/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/reviews/${id}/edit`,
    },
    orders: {
      root: `${ROOTS.ADMIN_DASHBOARD}/orders`,
      new: `${ROOTS.ADMIN_DASHBOARD}/orders/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/orders/${id}/edit`,
      details: (id) => `${ROOTS.ADMIN_DASHBOARD}/orders/${id}`,
    },
    orders_status: {
      root: `${ROOTS.ADMIN_DASHBOARD}/orders-status`,
      new: `${ROOTS.ADMIN_DASHBOARD}/orders-status/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/orders-status/${id}/edit`,
    },
    products: {
      root: `${ROOTS.ADMIN_DASHBOARD}/products`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/products/${id}/edit`,
    },
    orderStatus: {
      root: `${ROOTS.ADMIN_DASHBOARD}/order-status`,
      new: `${ROOTS.ADMIN_DASHBOARD}/order-status/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/order-status/${id}/edit`,
    },
    taxes: {
      root: `${ROOTS.ADMIN_DASHBOARD}/taxes`,
      new: `${ROOTS.ADMIN_DASHBOARD}/taxes/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/taxes/${id}/edit`,
    },
    shippings: {
      root: `${ROOTS.ADMIN_DASHBOARD}/shippings`,
      new: `${ROOTS.ADMIN_DASHBOARD}/shippings/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/shippings/${id}/edit`,
    },
    brandWithdrawals: {
      root: `${ROOTS.ADMIN_DASHBOARD}/brand-withdrawals`,
      new: `${ROOTS.ADMIN_DASHBOARD}/brand-withdrawals/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/brand-withdrawals/${id}/edit`,
    },
    influencerWithdrawals: {
      root: `${ROOTS.ADMIN_DASHBOARD}/influencer-withdrawals`,
      new: `${ROOTS.ADMIN_DASHBOARD}/influencer-withdrawals/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/influencer-withdrawals/${id}/edit`,
    },
    refunds: {
      root: `${ROOTS.ADMIN_DASHBOARD}/refunds`,
      new: `${ROOTS.ADMIN_DASHBOARD}/refunds/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/refunds/${id}/edit`,
    },
    coupons: {
      root: `${ROOTS.ADMIN_DASHBOARD}/coupons`,
      new: `${ROOTS.ADMIN_DASHBOARD}/coupons/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/coupons/${id}/edit`,
    },
  },
  brand_dashboard: {
    root: ROOTS.BRAND_DASHBOARD,
    brands: {
      root: `${ROOTS.BRAND_DASHBOARD}/brands`,
      new: `${ROOTS.BRAND_DASHBOARD}/brands/new`,
      userProfile: `${ROOTS.BRAND_DASHBOARD}/brands/userProfile`,
      dashboard: (id) => `${ROOTS.BRAND_DASHBOARD}/brands/${id}`,
      edit: (id) => `${ROOTS.BRAND_DASHBOARD}/brands/${id}/edit`,
      product: (id, id_product) => ({
        root: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/products`,
        new: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/products/new`,
        details: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/products/${id_product}`,
        edit: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/products/${id_product}/edit`,
      }),
      orders: (id, id_order) => ({
        root: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/orders`,
        details: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/orders/${id_order}`,
      }),
      reviews: (id, id_review) => ({
        root: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/reviews`,
      }),
      questions: (id, id_question) => ({
        root: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/questions`,
      }),
      withdrawals: (id) => ({
        root: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/withdrawals`,
        new: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/withdrawals/new`,
      }),
      staff: (id) => ({
        root: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/staff`,
        new: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/staff/new`,
      }),
      refunds: (id, id_refund) => ({
        root: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/refunds`,
        edit: `${ROOTS.BRAND_DASHBOARD}/brands/${id}/refunds/${id_refund}/edit`,
      }),
    },
  },
  influencer_dashboard: {
    root: ROOTS.INFLUENCER_DASHBOARD,
    influencer: {
      root: `${ROOTS.INFLUENCER_DASHBOARD}/influencer`,
      new: `${ROOTS.INFLUENCER_DASHBOARD}/influencer/new`,
      edit: (id) => `${ROOTS.INFLUENCER_DASHBOARD}/influencer/${id}/edit`,
      dashboard: (id) => `${ROOTS.INFLUENCER_DASHBOARD}/influencer/${id}`,
    },
    userProfile: {
      root: `${ROOTS.INFLUENCER_DASHBOARD}/userProfile`,
    },
    products: {
      root: `${ROOTS.INFLUENCER_DASHBOARD}/influencerProducts`,
      new: `${ROOTS.INFLUENCER_DASHBOARD}/influencerProducts/new`,
    },
    reels: {
      root: `${ROOTS.INFLUENCER_DASHBOARD}/reels`,
      list: `${ROOTS.INFLUENCER_DASHBOARD}/reels/list`,
      new: `${ROOTS.INFLUENCER_DASHBOARD}/reels/new`,
      edit: (id) => `${ROOTS.INFLUENCER_DASHBOARD}/reels/${id}/edit`,
    },
    withdrawals: {
      root: `${ROOTS.INFLUENCER_DASHBOARD}/influencerWithdrawals`,
      list: `${ROOTS.INFLUENCER_DASHBOARD}/influencerWithdrawals/list`,
      new: `${ROOTS.INFLUENCER_DASHBOARD}/influencerWithdrawals/new`,
    },
  },
};
