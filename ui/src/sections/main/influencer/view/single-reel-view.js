import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
// components
import { Grid } from '@mui/material';
import CartIcon from 'src/sections/common/cart-icon';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper from 'swiper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import ReelsTab from '../reels-tab';
// import './scroll-snap.css';

// Import Swiper styles
// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/css/pagination';
// import './styles.css';

// import required modules

// // ----------------------------------------------------------------------

export default function SingleReelView({ currentReel }) {
  console.log('🚀 ~ currentReel:', currentReel);

  return (
    <>
      <CartIcon />

      <Box
        my={10}
        mx={{ xs: `5%`, md: `12%` }}
        // style={{
        //   borderRadius: `36px`,
        //   border: `1px solid rgba(0, 0, 0, 0.30)`,
        // }}
      >
        <Grid container>
          <Grid item md={12} sm={12} xs={12} padding={{ xs: '24px 16px', md: '52px 0px' }}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Grid
                  className="parent-scroll-area-react"
                  container
                  item
                  xs={12}
                  md={12}
                  sx={{
                    px: 2,
                    rowGap: 5,
                  }}
                >
                  <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    spaceBetween={10}
                    mousewheel
                    pagination={{
                      clickable: true,
                    }}
                    keyboard={{
                      enabled: true,
                    }}
                    modules={[Mousewheel, Pagination, Keyboard, Navigation]}
                    className="mySwiper"
                  >
                    <ReelsTab key={currentReel.id} reel={currentReel} />
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
SingleReelView.propTypes = {
  currentReel: PropTypes.any,
};
