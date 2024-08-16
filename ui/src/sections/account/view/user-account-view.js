import { useCallback, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
// routes
import { paths } from 'src/routes/paths';
// _mock
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
//
import { useGetUserMe } from 'src/api/user';
import AccountChangePassword from '../account-change-password';
import AccountGallery from '../account-gallery';
import AccountGeneral from '../account-general';
import AccountPaymentInfo from '../account-payment-info';
import AccountSocialLinks from '../account-social-links';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'general',
    label: 'General',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'payment-info',
    label: 'Payment Info',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
  {
    value: 'gallery',
    label: 'Gallery',
    icon: <Iconify icon="material-symbols:gallery-thumbnail-rounded" width={24} />,
  },
  {
    value: 'social',
    label: 'Social links',
    icon: <Iconify icon="solar:share-bold" width={24} />,
  },
  {
    value: 'security',
    label: 'Security',
    icon: <Iconify icon="ic:round-vpn-key" width={24} />,
  },
];
const ADMIN_TABS = [
  {
    value: 'general',
    label: 'General',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'security',
    label: 'Security',
    icon: <Iconify icon="ic:round-vpn-key" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();
  const { user } = useGetUserMe();

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile Settings"
        links={[
          { name: 'Dashboard', href: paths.admin_dashboard.root },
          { name: 'User', href: paths.admin_dashboard.user.root },
          { name: 'Profile' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {user?.permissions?.includes('admin') || user?.permissions?.includes('brand')
          ? ADMIN_TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))
          : TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
      </Tabs>

      {currentTab === 'general' && <AccountGeneral user={user} />}

      {currentTab === 'payment-info' && <AccountPaymentInfo />}

      {currentTab === 'gallery' && <AccountGallery />}

      {currentTab === 'social' && <AccountSocialLinks />}

      {currentTab === 'security' && <AccountChangePassword />}
    </Container>
  );
}
