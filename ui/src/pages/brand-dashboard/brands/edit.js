import { Helmet } from 'react-helmet-async';
import { BrandsEditView } from 'src/sections/brands/view';
// sections

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  return (
    <>
      <Helmet>
        <title> Brand Edit</title>
      </Helmet>

      <BrandsEditView />
    </>
  );
}
