// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { useGetBrand } from 'src/api/brands';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useParams } from 'src/routes/hook';
import WithdrawalsNewEditDetails from '../withdrawals-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';

// ----------------------------------------------------------------------

export default function WithdrawalsCreateView() {
  const settings = useSettingsContext();

  const params = useParams();
  const { id } = params;

  const { brand: currentBrand } = useGetBrand(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="New Request"
        links={[
          {
            name: 'Dashboard',
            href: paths.brand_dashboard.brands.dashboard(id),
          },
          {
            name: 'Withdrawal',
            href: paths.brand_dashboard.brands.withdrawals(id).root,
          },
          { name: 'New Request' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <WithdrawalsNewEditDetails currentBrand={currentBrand} />
    </Container>
  );
}
