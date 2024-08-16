import { Helmet } from 'react-helmet-async';
import { ProductsCreateView } from 'src/sections/brands/products/view';
// sections

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <ProductsCreateView />
    </>
  );
}
