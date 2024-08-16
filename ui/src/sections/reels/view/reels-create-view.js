// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import ReelsNewEditDetails from '../reels-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';

// ----------------------------------------------------------------------

export default function ReelsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="New Reel"
        links={[
          {
            name: 'Dashboard',
            href: paths.influencer_dashboard.influencer.root,
          },
          {
            name: 'Reels',
            href: paths.influencer_dashboard.reels.root,
          },
          { name: 'New Reel' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ReelsNewEditDetails />
    </Container>
  );
}
