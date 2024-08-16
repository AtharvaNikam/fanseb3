import { Helmet } from 'react-helmet-async';
import { BrandsDetailsView } from 'src/sections/brands/view';
// sections

// ----------------------------------------------------------------------

export default function BrandDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Brand Details</title>
      </Helmet>

      <BrandsDetailsView />
    </>
  );
}
