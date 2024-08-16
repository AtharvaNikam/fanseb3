import { Helmet } from 'react-helmet-async';
import { StaffListView } from 'src/sections/brands/staff/view';
// sections

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Staff </title>
      </Helmet>

      <StaffListView />
    </>
  );
}
