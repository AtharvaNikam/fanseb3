import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Stack } from '@mui/material';
import { useCallback } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hook';
import Videos from 'src/sections/common/reel-player/video-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper/core';
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

  SwiperCore.use([Autoplay]);

  return (
    <>
      {!mdUp && (
        // <Grid container item md={5} xs={12} justifyContent="center" alignItems="center">
        //   <Videos id={id} src={reel?.reelLink.fileUrl} user={user} description={name} />
        // </Grid>
        <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{position:'relative'}}>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              backgroundColor: 'black',
              position: 'relative',
            }}
          >
            <Videos id={id} src={reel?.reelLink.fileUrl} user={user} description={name} />
          </Box>
          {/* <Grid container spacing={2} justifyContent="center">
            {products?.map((product) => (
              <Grid
                key={product.id}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ padding: 1, position:'absolute', bottom:60, width:'100%', mx:'auto' }}
              >
                <ProductList
                  product={product}
                  handleViewProductDetails={() => {
                    handleViewProductDetails(product.id, product.brandId);
                  }}
                />
              </Grid>
            ))}
          </Grid> */}
          <Box sx={{ padding: 1, position: 'absolute', bottom: 60, width: '100%', mx: 'auto' }}>
            <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 3000 }}>
              {products?.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductList
                    product={product}
                    handleViewProductDetails={() => {
                      handleViewProductDetails(product.id, product.brandId);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Stack>
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
