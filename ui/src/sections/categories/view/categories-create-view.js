// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import CategoriesNewEditDetails from '../categories-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';

// ----------------------------------------------------------------------

export default function CategoriesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Category"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin_dashboard.root,
          },
          {
            name: 'Categories',
            href: paths.admin_dashboard.categories.root,
          },
          { name: 'New Category' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CategoriesNewEditDetails />
    </Container>
  );
}
