import { Helmet } from 'react-helmet-async';
import { BrandsListView } from 'src/sections/admin/brands/view';

export default function BrandsListPage() {
  return (
    <>
      <Helmet>
        <title> Brands </title>
      </Helmet>

      <BrandsListView />
    </>
  );
}
