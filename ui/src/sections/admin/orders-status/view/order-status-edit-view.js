// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// api
// components
import { useGetOrderStatus } from 'src/api/orderStatus';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import OrderStatusNewEditDetails from '../order-status-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';
//

// ----------------------------------------------------------------------

export default function OrderStatusEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { orderStatus: currentOrderStatus } = useGetOrderStatus(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Order Status"
        links={[
          { name: 'Dashboard', href: paths.admin_dashboard.root },
          {
            name: 'Order Status',
            href: paths.admin_dashboard.orders_status.root,
          },
          { name: currentOrderStatus?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentOrderStatus ? (
        <OrderStatusNewEditDetails currentOrderStatus={currentOrderStatus} />
      ) : null}
    </Container>
  );
}
