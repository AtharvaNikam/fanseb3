import { Helmet } from 'react-helmet-async';
import { WithdrawalsCreateView } from 'src/sections/influencer/withdrawals/view';
// sections

// ----------------------------------------------------------------------

export default function ReelsCreatePage() {
  return (
    <>
      <Helmet>
        <title> Withdrawals </title>
      </Helmet>

      <WithdrawalsCreateView />
    </>
  );
}
