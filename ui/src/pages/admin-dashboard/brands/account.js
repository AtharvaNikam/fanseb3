import { Helmet } from 'react-helmet-async';
// sections
import { AccountView } from 'src/sections/brands/account/view';

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Account Settings</title>
      </Helmet>

      <AccountView />
    </>
  );
}
