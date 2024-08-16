import { useScroll } from 'framer-motion';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

// @mui
import Box from '@mui/material/Box';
// components
import { Grid } from '@mui/material';
import { useGetProducts } from 'src/api/products';
import ScrollProgress from 'src/components/scroll-progress';
import { useRouter } from 'src/routes/hook';
import CartIcon from 'src/sections/common/cart-icon';
import { useCheckout } from 'src/sections/hooks';
import ProductList from '../../common/product-list';
import ProfileCover from '../brand-profile-cover';

// ----------------------------------------------------------------------

export default function BrandsDetailsView({ currentBrand }) {
  const [brandProducts, setBrandProducts] = useState([]);
  const { checkout } = useCheckout();
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const { products } = useGetProducts(currentBrand.id);

  const handleViewProductDetails = useCallback(
    (productId, brandId) => {
      router.push(`/brands/${brandId}/product/${productId}`);
    },
    [router]
  );

  useEffect(() => {
    if (products) {
      setBrandProducts(products);
    }
  }, [products]);

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <CartIcon />

      <Box
        mb={10}
        mx={{ xs: `5%`, md: `12%` }}
        style={{
          borderRadius: `36px`,
          border: `1px solid rgba(0, 0, 0, 0.30)`,
        }}
      >
        <Grid container>
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            pb={5}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box
              mb={{ xs: 0, md: 10 }}
              sx={{
                p: '25px',
                height: 750,
              }}
            >
              <ProfileCover
                bio={currentBrand?.description}
                name={currentBrand?.name}
                avatarUrl={currentBrand?.profileImg}
                gallery={currentBrand?.coverImage}
                socials={currentBrand?.userProfile?.socials}
              />
            </Box>
            <Grid
              container
              item
              xs={12}
              md={12}
              sx={{
                px: 2,
                rowGap: 0.5,
              }}
              justifyContent={{ md: 'flex-start', xs: 'center' }}
            >
              {/* {brandProducts.map((product) => (
                <ProductList key={product.id} product={product} /> */}
              {brandProducts.map((product) => (
                <Grid
                  container
                  item
                  md={2.8}
                  style={{
                    borderRadius: 20,
                  }}
                  sx={{
                    // background: '#F4F4F4',
                    // border: '2px solid #F4F4',
                    py: 1,
                    px: 1,
                    my: 1,
                    mx: 1,
                    width: '300px',
                    height: '400px',
                    // gap: '12px',
                    direction: 'column',
                    textAlign: 'center',
                    alignContent: 'space-between',
                    justifyContent: 'space-around',
                  }}
                >
                  <ProductList
                    key={product.id}
                    product={product}
                    handleViewProductDetails={() => {
                      handleViewProductDetails(product.id, product.brandId);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
BrandsDetailsView.propTypes = {
  currentBrand: PropTypes.object,
};
