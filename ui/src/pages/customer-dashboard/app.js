import { Helmet } from 'react-helmet-async';
// sections
import { CustomerAccountView } from 'src/sections/customer/view';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Customer</title>
      </Helmet>

      <CustomerAccountView />
    </>
  );
}
