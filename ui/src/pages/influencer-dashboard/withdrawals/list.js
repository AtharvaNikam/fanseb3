import { Helmet } from 'react-helmet-async';
import { WithdrawalsListView } from 'src/sections/influencer/withdrawals/view';
// sections

// ----------------------------------------------------------------------

export default function ReelsListPage() {
  return (
    <>
      <Helmet>
        <title> Withdrawals </title>
      </Helmet>

      <WithdrawalsListView />
    </>
  );
}
