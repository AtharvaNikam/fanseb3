import { Helmet } from 'react-helmet-async';
import { RefundsListView } from 'src/sections/admin/refunds/view';
// sections

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Refunds </title>
      </Helmet>

      <RefundsListView />
    </>
  );
}
