import { Helmet } from 'react-helmet-async';
import { WithdrawalsCreateView } from 'src/sections/brands/withdrawals/view';
// sections

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> Withdrawals </title>
      </Helmet>

      <WithdrawalsCreateView />
    </>
  );
}
