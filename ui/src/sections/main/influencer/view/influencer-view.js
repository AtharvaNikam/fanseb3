// import { useScroll } from 'framer-motion';

// // @mui
// import Box from '@mui/material/Box';
// // components
// import { useTheme } from '@mui/material/styles';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import ScrollProgress from 'src/components/scroll-progress';
// import { useSettingsContext } from 'src/components/settings';
// import { useOffSetTop } from 'src/hooks/use-off-set-top';
// import { useResponsive } from 'src/hooks/use-responsive';
// import { HEADER } from 'src/layouts/config-layout';
// import { useParams, useRouter } from 'src/routes/hook';
// import CartIcon from 'src/sections/common/cart-icon';
// import { useCheckout } from 'src/sections/hooks';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/bundle';
// import 'swiper/css/pagination';

// import './styles.css';

// // import required modules
// import { Grid } from '@mui/material';
// import Iconify from 'src/components/iconify';
// import axiosInstance from 'src/utils/axios';
// import { A11y, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
// import ReelsTab from '../reels-tab';
// // import './styles.css';
// // import './scroll-snap.css';

// // import required modules
// // // ----------------------------------------------------------------------

// export default function InfluencerView() {
//   const { scrollYProgress } = useScroll();
//   const router = useRouter();
//   const settings = useSettingsContext();
//   const { checkout } = useCheckout();
//   const theme = useTheme();
//   const mdUp = useResponsive('up', 'md');
//   const offsetTop = useOffSetTop(HEADER.H_DESKTOP + 90);
//   const [reels, setReels] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const swiperRef = useRef();
//   const handleNextSlide = useCallback(() => {
//     swiperRef.current.slideNext();
//   }, []);

//   const handlePrevSlide = useCallback(() => {
//     swiperRef.current.slidePrev();
//   }, []);

//   // Function to fetch reels without reelId
//   const fetchAllReelsWithoutId = useCallback(async () => {
//     try {
//       console.log('fetching reels without reelId');
//       const response = await axiosInstance.post(
//         `/users/randomReels?filter[limit]=10&filter[skip]=${skip}`
//       );

//       if (response.status !== 200) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const { data } = response;
//       setReels((prevReels) => [...prevReels, ...data]);
//     } catch (error) {
//       console.error('🚀 Error fetching reels:', error.message);
//       // Handle the error as needed
//     }
//   }, [skip]);

//   // Function to fetch reels with reelId
//   const fetchAllReelsWithId = useCallback(async (_reelId) => {
//     try {
//       console.log('fetching reels with reelId:', _reelId);
//       const inputData = {
//         reelId: _reelId,
//       };
//       const response = await axiosInstance.post(`/users/randomReels?filter[limit]=10`, inputData);

//       if (response.status !== 200) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const { data } = response;
//       setReels((prevReels) => [...prevReels, ...data]);
//     } catch (error) {
//       console.error('🚀 Error fetching reels:', error.message);
//       // Handle the error as needed
//     }
//   }, []);
//   const { reelId } = useParams();
//   console.log('🚀 ~ from top reelId:', reelId);

//   useEffect(() => {
//     // Ensure reelId is not falsy
//     if (reelId) {
//       // Use forEach instead of map since map is used for creating a new array
//       reels.forEach((reel) => {
//         // Use strict inequality (!==) to compare reel.id with reelId
//         if (reel.id !== reelId) {
//           // Pass reel.id instead of reelId to fetchAllReels
//           console.log('fetching reelId:', reelId);
//           fetchAllReelsWithId(reelId);
//         }
//       });
//     } else {
//       // If reelId is falsy, fetch all reels
//       fetchAllReelsWithoutId();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [reelId]);

//   return (
//     <>
//       <ScrollProgress scrollYProgress={scrollYProgress} />
//       <CartIcon />

//       <Box
//         mb={10}
//         mx={{ xs: `5%`, md: `12%` }}
//         // style={{
//         //   borderRadius: `36px`,
//         //   border: `1px solid rgba(0, 0, 0, 0.30)`,
//         // }}
//       >
//         <Grid>
//           <Grid item md={12} sm={12} xs={12} padding={{ xs: '24px 0px', md: '35px 0px' }}>
//             <Grid>
//               <Grid item xs={12} md={12}>
//                 <Grid
//                   className="parent-scroll-area-react"
//                   container
//                   item
//                   xs={12}
//                   md={12}
//                   sx={{
//                     flexDirection: 'row',
//                     px: 2,
//                     rowGap: 5,
//                     height: '900px',
//                   }}
//                 >
//                   {mdUp && (
//                     <Grid
//                       container
//                       item
//                       md={0.5}
//                       pt="20px"
//                       sx={{
//                         flexDirection: 'column',
//                         justifyContent: 'space-between',
//                         height: '75vh',
//                       }}
//                     >
//                       <Iconify
//                         icon="ic:baseline-arrow-upward"
//                         onClick={handlePrevSlide}
//                         sx={{
//                           cursor: 'pointer',
//                           height: '42px',
//                           width: '42px',
//                           backgroundColor: 'primary',
//                           color: 'primary',
//                           borderRadius: '50%',
//                           boxShadow: '0px 2px 8px 4px rgba(0,0,0,0.5)',
//                         }}
//                       />
//                       <Box sx={{ flexGrow: 1 }} />
//                       <Iconify
//                         icon="ic:baseline-arrow-downward"
//                         onClick={handleNextSlide}
//                         sx={{
//                           cursor: 'pointer',
//                           height: '42px',
//                           width: '42px',
//                           backgroundColor: 'primary',
//                           color: 'primary',
//                           borderRadius: '50%',
//                           boxShadow: '0px 2px 8px 4px rgba(0,0,0,0.5)',
//                         }}
//                       />
//                     </Grid>
//                   )}
//                   <Grid container item md={11} sx={{ height: '900px' }}>
//                     <Swiper
//                       className="mySwiper"
//                       direction="vertical"
//                       slidesPerView={1}
//                       spaceBetween={30}
//                       onSwiper={(swiper) => {
//                         swiperRef.current = swiper;
//                       }}
//                       // onSlideChange={() => {
//                       //   console.log('slide change');
//                       // }}
//                       onReachEnd={() => {
//                         console.log('end of slides');
//                         setSkip((prevSkip) => prevSkip + 10);
//                         fetchAllReelsWithoutId();
//                       }}
//                       mousewheel
//                       keyboard={{
//                         enabled: true,
//                       }}
//                       pagination={{
//                         clickable: true,
//                       }}
//                       modules={[Navigation, Keyboard, Mousewheel, Pagination, A11y]}
//                     >
//                       {reels.map((reel) => (
//                         <SwiperSlide>
//                           <ReelsTab key={reel.id} reel={reel} />
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// }

// Import Swiper styles
// Import required modules
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
  const swiperRef = useRef();

  const handleNextSlide = useCallback(() => {
    swiperRef.current.slideNext();
  }, []);

  const handlePrevSlide = useCallback(() => {
    swiperRef.current.slidePrev();
  }, []);

  const fetchAllReelsWithoutId = useCallback(async () => {
    try {
      console.log('fetching reels without reelId');
      const response = await axiosInstance.post(
        `/users/randomReels?filter[limit]=10&filter[skip]=${skip}`
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = response;
      setReels((prevReels) => [...prevReels, ...data]);
    } catch (error) {
      console.error('🚀 Error fetching reels:', error.message);
    }
  }, [skip]);

  const fetchReelById = useCallback(async (reelId) => {
    try {
      console.log('fetching reel by id:', reelId);
      const response = await axiosInstance.get(`/users/reels/${reelId}`);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = response;
      setReels([data]);
    } catch (error) {
      console.error('🚀 Error fetching reel by id:', error.message);
    }
  }, []);

  const { reelId } = useParams();
  console.log('🚀 ~ from top reelId:', reelId);

  useEffect(() => {
    if (reelId) {
      fetchReelById(reelId);
    } else {
      fetchAllReelsWithoutId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reelId]);

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <CartIcon />

      <Box mb={10} mx={{ xs: `5%`, md: `12%` }}>
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
                        boxShadow: '0px 2px 8px 4px rgba(0,0,0,0.5)',
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
                        boxShadow: '0px 2px 8px 4px rgba(0,0,0,0.5)',
                      }}
                    />
                  </Grid>
                )}
                <Grid container item md={11} sx={{ height: '900px' }}>
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
