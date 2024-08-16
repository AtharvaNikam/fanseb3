import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const poster = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.post(url, config.body, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/me',
    login: '/login',
    register: '/register',
  },
  user: {
    list: 'api/users/list',
    register: '/register',
  },
  influencer: {
    list: 'api/influencers',
    details: (influencerId) => `/api/influencers/${influencerId}`,
  },
  brandWithdraws: {
    list: (brandId) => `brand-withdraws/${brandId}`,
    // details: (id) => `/brand-withdraws/${id}`,
  },
  influencerWithdraws: {
    list: 'influencer-withdraws',
    details: (id) => `/influencer-withdraws/${id}`,
  },
  adminWithdraws: {
    listBrandWithdrawals: `/all-brand-withdraws`,
    detailsBrandWithdrawals: (id) => `/single-brand-withdraws/${id}`,
    listInfluencerWithdrawals: `/all-influencer-withdraws`,
    detailsInfluencerWithdrawals: (id) => `/influencer-withdraws/${id}`,
  },
  categories: {
    list: 'api/categories',
    details: (categoryId) => `/api/categories/${categoryId}`,
  },
  brands: {
    allBrands: 'api/brands/list',
    list: (brandId) => `api/brands/list?filter[where][userId]=${brandId}`,
    details: (brandId) => `/api/brands/${brandId}`,
  },
  publicBrands: {
    list: 'api/public/brands/list',
    details: (brandId) => `/api/public/brands/${brandId}`,
  },
  products: {
    all: '/products',
    list: (id) => `/brands/${id}/products`,
    publicList: () => `/api/public/products/list`,
    details: (id, productId) => `/brands/${id}/products/${productId}`,
    edit: (id) => `/products/${id}`,
    count: (brandId) => `/api/product/count?where[brandId]=${brandId}`,
  },
  influencerProducts: {
    list: () => `/influencer/allInfluencerProducts`,
    listProductByInfluencerId: (id) => `/influencer/${id}/products`,
    listTypeBased: (id, type) => `/influencer/${id}/products?where[type]=${type}`,
    details: (id, productId) => `/influencer/${id}/products/${productId}`,
    count: (influencerId) => `/api/influencer/product/count?where[userId]=${influencerId}`,
  },
  influencerPublicProducts: {
    // list: () => `/api/public/products/list`,
    list: (influencerId) => `/api/public/influencer/${influencerId}/products`,
  },
  reels: {
    list: 'users/reels',
    randomReels: 'users/randomReels?filter[limit]=10',
    listById: (brandId) => `/users/reels/${brandId}`,
  },
  publicReels: {
    list: (influencerId) => `/api/public/users/reels/${influencerId}`,
    listById: (brandId) => `/api/public/reels/${brandId}`,
  },
  orderStatus: {
    list: '/order-statuses',
    details: (orderStatusId) => `/order-statuses/${orderStatusId}`,
  },
  order: {
    list: '/orders',
    details: (orderId) => `/orders/${orderId}`,
    orderBrands: (brandId) => `/api/orders/brand/${brandId}`,
    orderBrandsCounts: (brandId) => `/api/orders/brand/count?where[brandId]=${brandId}`,
    orderInfluencer: (influencerId) => `/api/orders/influencer/${influencerId}`,
    orderCustomer: (customerId) => `/api/orders/customer/${customerId}`,
    getAdminSalesHistory: () => `/adminSalesHistoy`,
  },
  taxes: {
    list: '/tax-classes',
    details: (taxId) => `/tax-classes/${taxId}`,
  },
  questions: {
    list: `/questions`,
    customerQuestions: (userId) => `/questions?filter[where][userId]=${userId}`,
    brandQuestions: (brandId) => `/questions?filter[where][brandId]=${brandId}`,
  },
  shipping: {
    list: '/shipping-classes',
    details: (shippingId) => `/shipping-classes/${shippingId}`,
  },
  reviews: {
    list: '/reviews',
  },
  reviewsBrand: {
    list: (brandId) => `/reviews?filter[where][brandId]=${brandId}`,
  },
  wishlist: {
    list: (userId) => `/wishlists/user/${userId}`,
  },
  refunds: {
    list: `/refunds`,
    brandList: (brandId) => `/refunds?filter[where][brandId]=${brandId}`,
    details: (refundId) => `/refunds/${refundId}`,
    user: (brandId) => `/user/${brandId}/refunds`,
  },
  otpGuest: {
    send: '/send-otp-guest-checkout',
    verify: '/verify-otp-guest-checkout',
  },
  otpUser: {
    send: '/sendOtp',
    verify: '/verifyOtp',
  },
};
