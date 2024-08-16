import { Helmet } from 'react-helmet-async';
import { HomeViews } from 'src/sections/home/view';
import RegistrationForm from 'src/sections/main/register/view/register-form-customer';

// sections

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register </title>
      </Helmet>

      <RegistrationForm />
    </>
  );
}
