// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import CategoriesNewEditDetails from '../influencer-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';

// ----------------------------------------------------------------------

export default function InfluencerCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Brand"
        links={[
          {
            name: 'Dashboard',
            href: paths.brand_dashboard.brands.root,
          },
          {
            name: 'Brands',
            href: paths.brand_dashboard.brands.root,
          },
          { name: 'New Brand' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CategoriesNewEditDetails />
    </Container>
  );
}
