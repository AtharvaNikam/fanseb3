import { Helmet } from 'react-helmet-async';
import { BrandWithdrawalsCreateView } from 'src/sections/admin/brand-withdrawals/view';
// sections

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> Withdrawals </title>
      </Helmet>

      <BrandWithdrawalsCreateView />
    </>
  );
}
