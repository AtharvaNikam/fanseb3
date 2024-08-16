// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useParams } from 'src/routes/hook';
import ProductsNewEditDetails from '../staff-new-edit-details';

// ----------------------------------------------------------------------

export default function StaffCreateView() {
  const settings = useSettingsContext();
  const params = useParams();

  const { id } = params;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Staff"
        links={[
          {
            name: 'Dashboard',
            href: paths.brand_dashboard.brands.dashboard(id),
          },
          {
            name: 'Staff',
            href: paths.brand_dashboard.brands.staff(id).root,
          },
          { name: 'New Staff' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductsNewEditDetails />
    </Container>
  );
}
