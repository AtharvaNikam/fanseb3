import { Helmet } from 'react-helmet-async';
import { OrderDetailsView } from 'src/sections/customer/order/view';
// sections

// ----------------------------------------------------------------------

export default function OrderDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Order Details</title>
      </Helmet>

      <OrderDetailsView />
    </>
  );
}
