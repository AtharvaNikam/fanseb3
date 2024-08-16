import { Helmet } from 'react-helmet-async';
import { ProductsEditView } from 'src/sections/brands/products/view';
// sections

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <ProductsEditView />
    </>
  );
}
