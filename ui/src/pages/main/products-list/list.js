import { Helmet } from 'react-helmet-async';
// sections
import { ProductListView } from 'src/sections/products-list';
// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <ProductListView />
    </>
  );
}
