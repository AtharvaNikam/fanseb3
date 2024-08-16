import { Helmet } from 'react-helmet-async';
import { ProductDetailsView } from 'src/sections/main/common/product-details/view';
// sections

// ----------------------------------------------------------------------

export default function ProductDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Products Details </title>
      </Helmet>

      <ProductDetailsView />
    </>
  );
}
