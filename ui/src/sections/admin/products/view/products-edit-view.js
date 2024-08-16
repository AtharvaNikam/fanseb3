// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// api
// components
import { useGetAdminProduct } from 'src/api/products';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import ProductsNewEditDetails from '../products-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';
//

// ----------------------------------------------------------------------

export default function ProductsEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { product: currentProduct } = useGetAdminProduct(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Product"
        links={[
          { name: 'Dashboard', href: paths.admin_dashboard.root },
          {
            name: 'Products',
            href: paths.admin_dashboard.products.root,
          },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentProduct ? <ProductsNewEditDetails currentProduct={currentProduct} /> : null}
    </Container>
  );
}
