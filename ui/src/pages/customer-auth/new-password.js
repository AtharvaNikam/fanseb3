import { Helmet } from 'react-helmet-async';
// sections
import { CustomerNewPasswordView } from 'src/sections/customer-auth';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title>New Password</title>
      </Helmet>

      <CustomerNewPasswordView />
    </>
  );
}
