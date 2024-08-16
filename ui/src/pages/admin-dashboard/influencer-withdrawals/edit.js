import { Helmet } from 'react-helmet-async';
import { InfluencerWithdrawalsCreateView } from 'src/sections/admin/influencer-withdrawals/view';
// sections

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> Influencer Withdrawals </title>
      </Helmet>

      <InfluencerWithdrawalsCreateView />
    </>
  );
}
