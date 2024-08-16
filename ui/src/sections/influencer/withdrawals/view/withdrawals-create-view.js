// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import WithdrawalsNewEditDetails from '../withdrawals-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';

// ----------------------------------------------------------------------

export default function WithdrawalsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="New Request"
        links={[
          {
            name: 'Dashboard',
            href: paths.influencer_dashboard.influencer.root,
          },
          {
            name: 'Withdrawal',
            href: paths.influencer_dashboard.withdrawals.root,
          },
          { name: 'New Request' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <WithdrawalsNewEditDetails />
    </Container>
  );
}
