import { useCallback, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
// routes
// _mock
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
//
import { useGetUserMe } from 'src/api/user';
import CartIcon from 'src/sections/common/cart-icon';
import AccountAddress from '../account-address';
import AccountChangePassword from '../account-change-password';
import AccountGeneral from '../account-general';
import CustomerFaqs from '../customer-account-faqs';
import CustomerMyOrders from '../customer-my-orders';
import CustomerMyQuestions from '../customer-my-questions';
import CustomerMyRefunds from '../customer-my-refunds copy';
import CustomerMyWishlist from '../customer-my-wishliast';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'general',
    label: 'Profile',
    icon: <Iconify icon="mingcute:profile-line" width={24} />,
  },
  {
    value: 'address',
    label: 'Address',
    icon: <Iconify icon="fluent:location-16-regular" width={24} />,
  },

  {
    value: 'my-orders',
    label: 'My Orders',
    icon: <Iconify icon="material-symbols:orders-outline" width={24} />,
  },

  {
    value: 'my-wishlist',
    label: 'My Wishlist',
    icon: <Iconify icon="gg:list" width={24} />,
  },
  {
    value: 'my-questions',
    label: 'My Questions',
    icon: <Iconify icon="octicon:question-16" width={24} />,
  },
  {
    value: 'my-refunds',
    label: 'My Refunds',
    icon: <Iconify icon="gridicons:refund" width={24} />,
  },
  {
    value: 'security',
    label: 'Change Password',
    icon: <Iconify icon="mdi:password-outline" width={24} />,
  },

  {
    value: 'need-help',
    label: 'Need Help',
    icon: <Iconify icon="material-symbols:info-outline" width={24} />,
  },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();
  const { user } = useGetUserMe();

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        paddingBottom: '100px',
      }}
    >
      <CartIcon />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mt: { xs: 3, md: 5 },
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'general' && user && <AccountGeneral user={user} />}
      {currentTab === 'address' && user && <AccountAddress user={user} />}
      {currentTab === 'security' && <AccountChangePassword />}
      {currentTab === 'my-orders' && <CustomerMyOrders />}
      {currentTab === 'my-wishlist' && <CustomerMyWishlist />}
      {currentTab === 'my-questions' && <CustomerMyQuestions />}
      {currentTab === 'my-refunds' && <CustomerMyRefunds />}
      {currentTab === 'need-help' && <CustomerFaqs />}
    </Container>
  );
}
