import { Helmet } from 'react-helmet-async';
import { ShippingsEditView } from 'src/sections/admin/shippings/view';
// sections

// ----------------------------------------------------------------------

export default function ShippingsEditPage() {
  return (
    <>
      <Helmet>
        <title>Shippings</title>
      </Helmet>

      <ShippingsEditView />
    </>
  );
}
