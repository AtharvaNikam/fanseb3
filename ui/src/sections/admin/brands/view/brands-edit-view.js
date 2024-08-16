// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// api
// components
import { useGetBrand } from 'src/api/brands';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import BrandsNewEditDetails from '../brand-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';
//

// ----------------------------------------------------------------------

export default function BrandsEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { brand: currentBrand } = useGetBrand(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Brand"
        links={[
          { name: 'Dashboard', href: paths.brand_dashboard.brands.root },
          {
            name: 'Brands',
            href: paths.brand_dashboard.brands.dashboard(id),
          },
          { name: currentBrand?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BrandsNewEditDetails currentBrand={currentBrand} />
    </Container>
  );
}
