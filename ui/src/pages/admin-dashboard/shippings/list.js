import { Helmet } from 'react-helmet-async';
import { ShippingsListView } from 'src/sections/admin/shippings/view';
// sections

// ----------------------------------------------------------------------

export default function ShippingsListPage() {
  return (
    <>
      <Helmet>
        <title>Shippings</title>
      </Helmet>

      <ShippingsListView />
    </>
  );
}
