import { Helmet } from 'react-helmet-async';
import { MyBrandsListView } from 'src/sections/admin/brands/view';

export default function BrandsListPage() {
  return (
    <>
      <Helmet>
        <title> My Brands </title>
      </Helmet>

      <MyBrandsListView />
    </>
  );
}
