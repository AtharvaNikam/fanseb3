import { Helmet } from 'react-helmet-async';
import { InfluencerWithdrawalsListView } from 'src/sections/admin/influencer-withdrawals/view';
// sections

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Influencer Withdrawals </title>
      </Helmet>

      <InfluencerWithdrawalsListView />
    </>
  );
}
