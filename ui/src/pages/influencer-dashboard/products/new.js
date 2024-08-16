import { Helmet } from 'react-helmet-async';
import { ProductsCreateView } from 'src/sections/influencer/products/view';
// sections

// ----------------------------------------------------------------------

export default function ProductsCreatePage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <ProductsCreateView />
    </>
  );
}
