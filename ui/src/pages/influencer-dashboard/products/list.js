import { Helmet } from 'react-helmet-async';
import { ProductsListView } from 'src/sections/influencer/products/view';
// sections

// ----------------------------------------------------------------------

export default function ProductsListPage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <ProductsListView />
    </>
  );
}
