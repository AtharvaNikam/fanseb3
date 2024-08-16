// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useParams } from 'src/routes/hook';
import ProductsNewEditDetails from '../order-status-new-edit-details';

// ----------------------------------------------------------------------

export default function OrderStatusCreateView() {
  const settings = useSettingsContext();
  const params = useParams();

  const { id } = params;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Order Status"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin_dashboard.root,
          },
          {
            name: 'Order Status',
            href: paths.admin_dashboard.orders_status.root,
          },
          { name: 'New Order Status' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductsNewEditDetails />
    </Container>
  );
}
