// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useParams } from 'src/routes/hook';
import ProductsNewEditDetails from '../shippings-new-edit-details';

// ----------------------------------------------------------------------

export default function ShippingsCreateView() {
  const settings = useSettingsContext();
  const params = useParams();

  const { id } = params;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Shippings"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin_dashboard.root,
          },
          {
            name: 'Shippings',
            href: paths.admin_dashboard.shippings.root,
          },
          { name: 'New Shippings' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductsNewEditDetails />
    </Container>
  );
}
