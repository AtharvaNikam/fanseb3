import { Helmet } from 'react-helmet-async';
import { OrderStatusListView } from 'src/sections/admin/orders-status/view';
// sections

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title>Order Status</title>
      </Helmet>

      <OrderStatusListView />
    </>
  );
}
