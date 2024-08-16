import { Helmet } from 'react-helmet-async';
import { BrandsCreateView } from 'src/sections/brands/view';

export default function BrandsNewPage() {
  return (
    <>
      <Helmet>
        <title> Brands </title>
      </Helmet>

      <BrandsCreateView />
    </>
  );
}
