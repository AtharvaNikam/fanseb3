import { Helmet } from 'react-helmet-async';
import { BrandsHomeView } from 'src/sections/main/brands/view';
// sections

// ----------------------------------------------------------------------

export default function BrandDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Brands </title>
      </Helmet>

      <BrandsHomeView />
    </>
  );
}
