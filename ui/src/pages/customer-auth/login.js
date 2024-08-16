import { Helmet } from 'react-helmet-async';
// sections
import { CustomerLoginView } from 'src/sections/customer-auth';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <CustomerLoginView />
    </>
  );
}
