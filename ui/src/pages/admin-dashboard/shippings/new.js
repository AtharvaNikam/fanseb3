import { Helmet } from 'react-helmet-async';
import { ShippingsCreateView } from 'src/sections/admin/shippings/view';
// sections

// ----------------------------------------------------------------------

export default function ShippingsCreatePage() {
  return (
    <>
      <Helmet>
        <title>Shippings</title>
      </Helmet>

      <ShippingsCreateView />
    </>
  );
}
