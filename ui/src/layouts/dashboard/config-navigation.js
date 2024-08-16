import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import { useAuthContext } from 'src/auth/hooks';
import SvgColor from 'src/components/svg-color';
import { usePathname } from 'src/routes/hook';
import { isPathMatchingPattern } from 'src/utils/getPathMatchingPattern';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  questions: icon('ic_question'),
  shippings: icon('ic_shippings'),
  categories: icon('ic_category'),
  brands: icon('ic_brand'),
  mybrands: icon('ic_mybrands'),
  reviews: icon('ic_review'),
  withdraw: icon('ic_withdraw'),
  reels: icon('ic_reels'),
  tax: icon('ic_tax'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { user } = useAuthContext();
  const { t } = useLocales();
  const pathname = usePathname();

  const id = localStorage.getItem('brandId');
  // const isBrandDashboard = useActiveLink('brand-dashboard', true);
  // const isAdminDashboard = useActiveLink('admin-dashboard', true);
  const isAdminDashboardBrands = isPathMatchingPattern(pathname, '/brands/{id}');
  const isAdminDashboardMyBrands = isPathMatchingPattern(pathname, '/my-brands/{id}');
  // const isInfluencerDashboard = useActiveLink('influencer-dashboard', true);
  // const isCustomerDashboard = useActiveLink('customer-dashboard', true);

  const dataInfluencer = useMemo(
    // INFLUENCER
    () => [
      {
        subheader: t('management'),
        items: [
          {
            title: t('Dashboard'),
            path: paths.influencer_dashboard.influencer.root,
            icon: ICONS.dashboard,
          },
          {
            title: t('Products'),
            path: paths.influencer_dashboard.products.root,
            icon: ICONS.product,
          },
          {
            title: t('Reels'),
            path: paths.influencer_dashboard.reels.root,
            icon: ICONS.reels,
          },
          {
            title: t('Withdrawals'),
            path: paths.influencer_dashboard.withdrawals.root,
            icon: ICONS.withdraw,
          },
        ],
      },
    ],
    [t]
  );
  // ----------------------------------------------------------------------
  const dataAdmin = useMemo(
    () => [
      // ADMIN
      {
        subheader: t('management'),
        items: [
          // USER
          {
            title: t('dashboard'),
            path: paths.admin_dashboard.root,
            icon: ICONS.dashboard,
          },
          {
            title: t('Brands'),
            path: paths.admin_dashboard.brands.root,
            icon: ICONS.brands,
          },
          {
            title: t('My Brands'),
            path: paths.admin_dashboard.myBrands.root,
            icon: ICONS.mybrands,
          },
          {
            title: t('user'),
            path: paths.admin_dashboard.user.list,
            icon: ICONS.user,
          },
          {
            title: t('category'),
            path: paths.admin_dashboard.categories.list,
            icon: ICONS.categories,
          },
          {
            title: t('Products'),
            path: paths.admin_dashboard.products.root,
            icon: ICONS.product,
          },
          {
            title: t('Orders'),
            path: paths.admin_dashboard.orders.root,
            icon: ICONS.banking,
          },
          {
            title: t('Orders Status'),
            path: paths.admin_dashboard.orders_status.root,
            icon: ICONS.order,
          },
          {
            title: t('Taxes'),
            path: paths.admin_dashboard.taxes.root,
            icon: ICONS.tax,
          },
          {
            title: t('Shippings'),
            path: paths.admin_dashboard.shippings.root,
            icon: ICONS.shippings,
          },
          {
            title: t('Refunds'),
            path: paths.admin_dashboard.refunds.root,
            icon: ICONS.invoice,
          },

          {
            title: t('Brand Withdrawals'),
            path: paths.admin_dashboard.brandWithdrawals.root,
            icon: ICONS.withdraw,
          },
          {
            title: t('Influencer Withdrawals'),
            path: paths.admin_dashboard.influencerWithdrawals.root,
            icon: ICONS.withdraw,
          },
          {
            title: t('Reviews'),
            path: paths.admin_dashboard.reviews.root,
            icon: ICONS.reviews,
          },
          {
            title: t('Questions'),
            path: paths.admin_dashboard.questions.root,
            icon: ICONS.questions,
          },
        ],
      },
    ],
    [t]
  );
  // ----------------------------------------------------------------------
  const dataAdminBrand = useMemo(
    () => [
      // BRAND
      {
        subheader: t('brand management'),
        items: [
          {
            title: t('Dashboard'),
            path: paths.admin_dashboard.brands.dashboard(id),
            icon: ICONS.dashboard,
          },
          {
            title: t('Products'),
            path: paths.admin_dashboard.brands.product(id).root,
            icon: ICONS.product,
          },
          {
            title: t('Orders'),
            path: paths.admin_dashboard.brands.orders(id).root,
            icon: ICONS.banking,
          },
          {
            title: t('Refunds'),
            path: paths.admin_dashboard.brands.refunds(id).root,
            icon: ICONS.invoice,
          },
          {
            title: t('Withdrawals'),
            path: paths.admin_dashboard.brands.withdrawals(id).root,
            icon: ICONS.withdraw,
          },
          {
            title: t('Reviews'),
            path: paths.admin_dashboard.brands.reviews(id).root,
            icon: ICONS.reviews,
          },
          {
            title: t('Questions'),
            path: paths.admin_dashboard.brands.questions(id).root,
            icon: ICONS.questions,
          },
        ],
      },
    ],
    [id, t]
  );
  const dataBrand = useMemo(
    () => [
      // BRAND
      {
        subheader: t('brand management'),
        items: [
          {
            title: t('Dashboard'),
            path: paths.brand_dashboard.brands.dashboard(id),
            icon: ICONS.dashboard,
          },
          {
            title: t('Products'),
            path: paths.brand_dashboard.brands.product(id).root,
            icon: ICONS.product,
          },
          {
            title: t('Orders'),
            path: paths.brand_dashboard.brands.orders(id).root,
            icon: ICONS.banking,
          },
          {
            title: t('Refunds'),
            path: paths.brand_dashboard.brands.refunds(id).root,
            icon: ICONS.invoice,
          },
          {
            title: t('Withdrawals'),
            path: paths.brand_dashboard.brands.withdrawals(id).root,
            icon: ICONS.withdraw,
          },
          {
            title: t('Reviews'),
            path: paths.brand_dashboard.brands.reviews(id).root,
            icon: ICONS.reviews,
          },
          {
            title: t('Questions'),
            path: paths.brand_dashboard.brands.questions(id).root,
            icon: ICONS.questions,
          },
        ],
      },
    ],
    [id, t]
  );
  // ----------------------------------------------------------------------
  const dataConsumer = useMemo(
    () => [
      // CONSUMER
      {
        subheader: t('management'),
        items: [{ title: t('Dashboard'), path: paths.admin_dashboard.user.root, icon: ICONS.user }],
      },
    ],
    [t]
  );

  // if (user !== null) {
  //   const result = getUserData(user);
  //   return user.permissions.includes('admin') ? dataAdmin : data;
  // }
  // const result = getUserData(user);
  function getUserData(currentUser) {
    if (currentUser !== null) {
      if (currentUser.permissions.includes('brand') && currentUser.permissions.includes('admin')) {
        return dataBrand;
      }
      if (currentUser.permissions.includes('brand')) {
        return dataBrand;
      }
      if (currentUser.permissions.includes('admin')) {
        return dataAdmin;
      }
      if (currentUser.permissions.includes('influencer')) {
        return dataInfluencer;
      }
      if (currentUser.permissions.includes('consumer')) {
        return dataConsumer;
      }
    }
    console.log('no user');
    return dataInfluencer;
  }
  let result = [];
  result = getUserData(user);
  if (isAdminDashboardBrands) {
    result = dataAdminBrand;
  }
  if (isAdminDashboardMyBrands) {
    result = dataAdminBrand;
  }
  return result;
}
