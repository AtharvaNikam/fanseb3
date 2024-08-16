import { Helmet } from 'react-helmet-async';
// sections
import { JwtNewPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: New Password</title>
      </Helmet>

      <JwtNewPasswordView />
    </>
  );
}
