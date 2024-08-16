import { Helmet } from 'react-helmet-async';
import { ProductsListView } from 'src/sections/admin/products/view';
// sections

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <ProductsListView />
    </>
  );
}
