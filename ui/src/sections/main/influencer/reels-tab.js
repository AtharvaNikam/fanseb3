import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
import { useCallback } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hook';
import Videos from 'src/sections/common/reel-player/video-player';
import ProductList from '../common/product-list';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ReelsTab({ reel }) {
  const { id, products, reelLink, user, name } = reel;
  const router = useRouter();
  const handleViewProductDetails = useCallback(
    (productId, brandId) => {
      router.push(`/influencer/${brandId}/product/${productId}`);
    },
    [router]
  );
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      {!mdUp && (
        <Grid container item md={5} xs={12} justifyContent="center" alignItems="center">
          <Videos id={id} src={reel?.reelLink.fileUrl} user={user} description={name} />
        </Grid>
      )}
      {mdUp && (
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          height={`${window.innerHeight - 100}px`}
          width={{ xs: '100%', md: '100%' }}
        >
          <Grid
            container
            item
            md={4}
            xs={12}
            justifyContent="center"
            alignItems="flex-start"
            pt={2}
          >
            <Videos id={id} src={reel?.reelLink.fileUrl} user={user} description={name} />
          </Grid>
          <Grid
            container
            height={`${window.innerHeight - 100}px`}
            item
            display={{ xs: 'none', md: 'flex' }}
            justifyContent="flex-start"
            gap={2}
            md={7}
            alignContent="flex-start"
            overflow="auto"
            sx={{
              /* width */
              '&::-webkit-scrollbar': {
                width: '10px',
              },

              /* Track */
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 5px grey',
                borderRadius: '10px',
              },

              /* Handle */
              '&::-webkit-scrollbar-thumb': {
                background: 'grey',
                borderRadius: '10px',
              },

              /* Handle on hover */
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'darkgrey',
              },
            }}
          >
            {products?.map((product) => (
              <Grid
                key={product.id}
                container
                item
                sm={5.3}
                style={{
                  borderRadius: 20,
                }}
                justifyContent="center"
                sx={{
                  py: 1,
                  px: 1,
                  my: 1,
                  mx: 1,
                  width: '300px',
                  height: '400px',
                  // direction: 'column',
                  // textAlign: 'center',
                  alignContent: 'space-between',
                  // justifyContent: 'space-around',
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
        </Stack>
      )}
    </>
  );
}
ReelsTab.propTypes = {
  reel: PropTypes.object,
};
