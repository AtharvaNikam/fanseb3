// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// routes
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'src/routes/hook';
//
import { useGetBrand } from 'src/api/brands';
import { paths } from 'src/routes/paths';
import BrandDetailsHistory from '../brand-details-history';
import BrandDetailsInfo from '../brand-details-info';
import BrandDetailsItems from '../brand-details-item';
import BrandDetailsToolbar from '../brand-details-toolbar';

// ----------------------------------------------------------------------

export default function BrandDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { brand: currentBrand } = useGetBrand(id);

  // const isAdminDashboardBrands = useActiveLink('admin-dashboard/brands/{id}', true);
  // const isAdminDashboardMyBrands = useActiveLink('admin-dashboard/my-brands/', true);
  // console.log('🚀 ~ isAdminDashboardBrands:', isAdminDashboardBrands);
  // console.log('🚀 ~ isAdminDashboardMyBrands:', isAdminDashboardMyBrands);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <BrandDetailsToolbar
        backLink={paths.brand_dashboard.brands.root}
        isActive={currentBrand?.isActive}
        id={id}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <BrandDetailsItems items={currentBrand?.coverImage} />
            <BrandDetailsHistory history={currentBrand} />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <BrandDetailsInfo
            currentBrand={currentBrand}
            delivery={currentBrand?.delivery}
            payment={currentBrand?.paymentInfo}
            shippingAddress={currentBrand?.address}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
