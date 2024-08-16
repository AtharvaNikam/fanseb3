// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// api
// components
import { useGetProduct } from 'src/api/products';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import ProductsNewEditDetails from '../products-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';
//

// ----------------------------------------------------------------------

export default function ProductsEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id_p } = params;
  const { id } = params;

  const { product: currentProduct } = useGetProduct(id, id_p);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Product"
        links={[
          { name: 'Dashboard', href: paths.brand_dashboard.brands.dashboard(id) },
          {
            name: 'Products',
            href: paths.brand_dashboard.brands.product(id).root,
          },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductsNewEditDetails currentProduct={currentProduct} />
    </Container>
  );
}
