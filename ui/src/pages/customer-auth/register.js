import { Helmet } from 'react-helmet-async';
// sections
import { CustomerRegisterView } from 'src/sections/customer-auth';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <CustomerRegisterView />
    </>
  );
}
