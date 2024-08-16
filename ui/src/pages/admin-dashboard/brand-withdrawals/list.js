import { Helmet } from 'react-helmet-async';
import { BrandWithdrawalsListView } from 'src/sections/admin/brand-withdrawals/view';
// sections

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Brand Withdrawals </title>
      </Helmet>

      <BrandWithdrawalsListView />
    </>
  );
}
