import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Iconify from 'src/components/iconify';
import ScrollProgress from 'src/components/scroll-progress';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from 'src/layouts/config-layout';
import { useParams, useRouter } from 'src/routes/hook';
import CartIcon from 'src/sections/common/cart-icon';
import axiosInstance from 'src/utils/axios';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ReelsTab from '../reels-tab';

// ----------------------------------------------------------------------

export default function InfluencerView() {
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP + 90);
  const [reels, setReels] = useState([]);
  const [skip, setSkip] = useState(0);
  const { reelId } = useParams();
  const swiperRef = useRef();

  const handleNextSlide = useCallback(() => {
    swiperRef.current.slideNext();
  }, []);

  const handlePrevSlide = useCallback(() => {
    swiperRef.current.slidePrev();
  }, []);

  const fetchAllReelsWithoutId = useCallback(async () => {
    try {
      if (reelId) {
        const reqData = {
          id: Number(reelId),
        };
        const response = await axiosInstance.post(
          `/users/randomReels?filter[limit]=10&filter[skip]=${skip}`,
          reqData
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = response;
        setReels((prevReels) => [...prevReels, ...data]);
      } else {
        const response = await axiosInstance.post(
          `/users/randomReels?filter[limit]=10&filter[skip]=${skip}`
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = response;
        setReels((prevReels) => [...prevReels, ...data]);
      }
    } catch (error) {
      console.error('🚀 Error fetching reels:', error.message);
    }
  }, [skip, reelId]);

  // const fetchReelById = useCallback(async (reelId) => {
  //   try {
  //     console.log('fetching reel by id:', reelId);
  //     const response = await axiosInstance.get(`/users/reels/${reelId}`);

  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const { data } = response;
  //     setReels([data]);
  //   } catch (error) {
  //     console.error('🚀 Error fetching reel by id:', error.message);
  //   }
  // }, []);

  console.log('🚀 ~ from top reelId:', reelId);

  useEffect(() => {
    // if (reelId) {
    //   fetchReelById(reelId);
    // } else {
    //   fetchAllReelsWithoutId();
    // }
    fetchAllReelsWithoutId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reelId]);

  useEffect(() => {
    const handlePopState = (event) => {
      // Redirect to home page when the back button is pressed
      router.replace('/');
    };

    // Add popstate event listener
    window.addEventListener('popstate', handlePopState);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <CartIcon />

      <Box mb={10} mx={{ md: `12%` }}>
        <Grid item md={12} sm={12} xs={12} padding={{ xs: '24px 0px', md: '35px 0px' }}>
          <Grid>
            <Grid item xs={12} md={12}>
              <Grid
                className="parent-scroll-area-react"
                container
                item
                xs={12}
                md={12}
                sx={{
                  flexDirection: 'row',
                  px: 2,
                  rowGap: 5,
                  height: '900px',
                }}
              >
                {mdUp && (
                  <Grid
                    container
                    item
                    md={0.5}
                    pt="20px"
                    sx={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '75vh',
                    }}
                  >
                    <Iconify
                      icon="ic:baseline-arrow-upward"
                      onClick={handlePrevSlide}
                      sx={{
                        cursor: 'pointer',
                        height: '42px',
                        width: '42px',
                        backgroundColor: 'primary',
                        color: 'primary',
                        borderRadius: '50%',
                        boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.5)',
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Iconify
                      icon="ic:baseline-arrow-downward"
                      onClick={handleNextSlide}
                      sx={{
                        cursor: 'pointer',
                        height: '42px',
                        width: '42px',
                        backgroundColor: 'primary',
                        color: 'primary',
                        borderRadius: '50%',
                        boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.5)',
                      }}
                    />
                  </Grid>
                )}
                <Grid container item md={11} xs={12} sx={{ height: '900px' }} padding = {{xs : '0px !important'}}>
                  <Swiper
                    className="mySwiper"
                    direction="vertical"
                    slidesPerView={1}
                    spaceBetween={30}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    onReachEnd={() => {
                      console.log('end of slides');
                      setSkip((prevSkip) => prevSkip + 10);
                      fetchAllReelsWithoutId();
                    }}
                    mousewheel
                    keyboard={{
                      enabled: true,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Navigation, Keyboard, Mousewheel, Pagination, A11y]}
                  >
                    {reels.map((reel) => (
                      <SwiperSlide key={reel.id}>
                        <ReelsTab reel={reel} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
