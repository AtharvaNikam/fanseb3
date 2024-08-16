import { Helmet } from 'react-helmet-async';
import { OrderStatusCreateView } from 'src/sections/admin/orders-status/view';
// sections

// ----------------------------------------------------------------------

export default function OrderDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Order Status</title>
      </Helmet>

      <OrderStatusCreateView />
    </>
  );
}
