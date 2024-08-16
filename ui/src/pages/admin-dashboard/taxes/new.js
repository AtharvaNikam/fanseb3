import { Helmet } from 'react-helmet-async';
import { TaxesCreateView } from 'src/sections/admin/taxes/view';
// sections

// ----------------------------------------------------------------------

export default function OrderDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Taxes</title>
      </Helmet>

      <TaxesCreateView />
    </>
  );
}
