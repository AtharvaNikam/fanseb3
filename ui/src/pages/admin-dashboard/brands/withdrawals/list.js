import { Helmet } from 'react-helmet-async';
import { WithdrawalsListView } from 'src/sections/brands/withdrawals/view';
// sections

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Withdrawals </title>
      </Helmet>

      <WithdrawalsListView />
    </>
  );
}
