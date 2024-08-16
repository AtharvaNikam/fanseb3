import { Helmet } from 'react-helmet-async';
// sections
import { CustomerVerifyView } from 'src/sections/customer-auth';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  return (
    <>
      <Helmet>
        <title>Verify</title>
      </Helmet>

      <CustomerVerifyView />
    </>
  );
}
