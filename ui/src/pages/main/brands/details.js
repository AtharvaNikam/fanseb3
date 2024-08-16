import { Helmet } from 'react-helmet-async';
import { useGetPublicBrand } from 'src/api/brands';
import { useParams } from 'src/routes/hook';
import { BrandsDetailsView } from 'src/sections/main/brands/view';
// sections

// ----------------------------------------------------------------------

export default function BrandPage() {
  const params = useParams();
  const { brandId } = params;
  const { brand: currentBrand } = useGetPublicBrand(brandId);
  return (
    <>
      <Helmet>
        <title> Brand Details </title>
      </Helmet>
      {currentBrand && <BrandsDetailsView currentBrand={currentBrand} />}
    </>
  );
}
