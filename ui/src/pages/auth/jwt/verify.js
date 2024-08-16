import { Helmet } from 'react-helmet-async';
// sections
import { JwtVerifyView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Verify</title>
      </Helmet>

      <JwtVerifyView />
    </>
  );
}
