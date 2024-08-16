import { Helmet } from 'react-helmet-async';
import { TaxesListView } from 'src/sections/admin/taxes/view';
// sections

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title>Taxes</title>
      </Helmet>

      <TaxesListView />
    </>
  );
}
