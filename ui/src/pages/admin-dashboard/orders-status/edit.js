import { Helmet } from 'react-helmet-async';
import { OrderStatusEditView } from 'src/sections/admin/orders-status/view';
// sections

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <>
      <Helmet>
        <title>Order Status</title>
      </Helmet>

      <OrderStatusEditView />
    </>
  );
}
