// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useParams } from 'src/routes/hook';
import ProductsNewEditDetails from '../products-new-edit-details';

// ----------------------------------------------------------------------

export default function ProductsCreateView() {
  const settings = useSettingsContext();
  const params = useParams();

  const { id } = params;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Product"
        links={[
          {
            name: 'Dashboard',
            href: paths.brand_dashboard.brands.dashboard(id),
          },
          {
            name: 'Products',
            href: paths.brand_dashboard.brands.product(id).root,
          },
          { name: 'New Product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductsNewEditDetails />
    </Container>
  );
}
