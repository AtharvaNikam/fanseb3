import PropTypes from 'prop-types';
import { Reels } from '@sayings/react-reels';
import '@sayings/react-reels/dist/index.css';
// @mui
import { Box, Grid, Stack } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hook';
import Videos from 'src/sections/common/reel-player/video-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper/core';
// import ReactPlayer from 'react-player';
import ProductList from '../common/product-list';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ReelsTab({ reel }) {
  const { id, products, reelLink, user, name } = reel;
  const router = useRouter();
  const handleViewProductDetails = useCallback(
    (productId, brandId) => {
      router.push(`/influencer/${user.id}/brand/${brandId}/product/${productId}`);
    },
    [router, user.id]
  );
  const mdUp = useResponsive('up', 'md');

  SwiperCore.use([Autoplay]);

  // const [isPlaying, setIsPlaying] = useState(true);
  // const [isMuted, setIsMuted] = useState(true); // Mute by default
  // const playerRef = useRef(null);
  // const [isVisible, setIsVisible] = useState(false); // Track visibility for play/pause control

  // // Throttled video play/pause control
  // const handleVisibilityChange = (entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   const observer = new IntersectionObserver(handleVisibilityChange, {
  //     threshold: 0.5, // Require 50% visibility for video to play/pause
  //   });

  //   if (playerRef.current) {
  //     observer.observe(playerRef.current);
  //     setIsVisible(true);
  //   }

  //   return () => {
  //     if (playerRef.current) {
  //       observer.unobserve(playerRef.current);
  //     }
  //   };
  // }, []);

  // const handleMuteToggle = () => {
  //   setIsMuted((prev) => !prev);
  // };


  const VideoReel = () => (
    <Box
      sx={{
        width: '100%',
        height: { xs: '85vh', sm: '85vh' }, // Dynamic height
        backgroundColor: 'black',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Videos id={id} src={reel?.reelLink.fileUrl} user={user} description={name} />
    </Box>
  );  
  return (
    <>
      {!mdUp && (
        <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          borderRadius: '14px',
          padding: 0,
        }}
      >
        {/* Video Reel */}
        <VideoReel />

        {/* Product Carousel */}
        <Box
          sx={{
            py: 1,
            width: '95%',
            mx: 'auto',
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            style={{ overflow: 'visible' }}
          >
            {products?.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductList
                  product={product}
                  influencerId={user.id}
                  handleViewProductDetails={() =>
                    handleViewProductDetails(product.id, product.brandId)
                  }
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
          <Grid container item md={4} xs={12} justifyContent="center" alignItems="flex-start" pt={2}>
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
                key={product.id} // Unique key for Grid
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
                  alignContent: 'space-between',
                }}
              >
                <ProductList
                  influencerId={user.id}
                  product={product} // No need for key prop here
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
