import { Helmet } from 'react-helmet-async';
import { OrderListView } from 'src/sections/admin/order/view';
// sections

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title> Order List</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
