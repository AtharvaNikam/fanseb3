import { Helmet } from 'react-helmet-async';
// sections
import { CustomerForgotPasswordView } from 'src/sections/customer-auth';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>

      <CustomerForgotPasswordView />
    </>
  );
}
