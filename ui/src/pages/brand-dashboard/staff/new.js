import { Helmet } from 'react-helmet-async';
import { StaffCreateView } from 'src/sections/brands/staff/view';
// sections

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <>
      <Helmet>
        <title> Staff </title>
      </Helmet>

      <StaffCreateView />
    </>
  );
}
