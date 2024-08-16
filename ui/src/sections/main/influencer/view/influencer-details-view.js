import { useScroll } from 'framer-motion';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
// components
import { Grid, Tab, Tabs, tabsClasses } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetInfluencerProductList } from 'src/api/influencerProduct';
import { useGetPublicReels } from 'src/api/reels';
import Iconify from 'src/components/iconify';
import ScrollProgress from 'src/components/scroll-progress';
import { useSettingsContext } from 'src/components/settings';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from 'src/layouts/config-layout';
import { useParams, useRouter } from 'src/routes/hook';
import CartIcon from 'src/sections/common/cart-icon';
import { useCheckout } from 'src/sections/hooks';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductList from '../../common/product-list';
import ProfileCover from '../influencer-profile-cover';
import ReelsTab from '../reels-tab';
import './styles.css';

// ----------------------------------------------------------------------
const TABS = [
  {
    value: 'collection',
    label: 'Collection',
    icon: <Iconify icon="fluent:apps-24-regular" width={24} />,
  },
  {
    value: 'products',
    label: 'Products',
    icon: <Iconify icon="gridicons:product" width={24} />,
  },
  {
    value: 'reels',
    label: 'Reels',
    icon: <Iconify icon="solar:clapperboard-play-linear" width={24} />,
  },
];
// ----------------------------------------------------------------------

export default function InfluencerDetailsView({ currentInfluencer }) {
  const { scrollYProgress } = useScroll();
  const { influencerId } = useParams();
  const { checkout } = useCheckout();
  const router = useRouter();
  const settings = useSettingsContext();
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP + 90);
  const swiperRef = useRef();

  const { products } = useGetInfluencerProductList(currentInfluencer.id);

  const { reels } = useGetPublicReels(influencerId);
  console.log('🚀 ~ reels:', reels);

  const [productsData, setProductsData] = useState([]);

  const [collectionData, setCollectionData] = useState([]);

  const handleViewProductDetails = useCallback(
    (productId, brandId) => {
      router.push(`/influencer/${brandId}/product/${productId}`);
    },
    [router]
  );

  useEffect(() => {
    if (products) {
      const collections = products.filter((item) => item.type === 'collection');
      const individualProducts = products.filter((item) => item.type === 'product');
      setProductsData(individualProducts);
      setCollectionData(collections);
    }
  }, [products]);

  const [currentTab, setCurrentTab] = useState('products');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

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
            display="flex"
            sx={{
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                p: '25px',
                height: 750,
              }}
            >
              <ProfileCover
                bio={currentInfluencer?.userProfile?.bio}
                name={currentInfluencer?.name}
                avatarUrl={currentInfluencer?.userProfile?.avatar?.fileUrl}
                gallery={currentInfluencer?.userProfile?.gallery}
                socials={currentInfluencer?.userProfile?.socials}
              />
            </Box>
            <Tabs
              value={currentTab}
              onChange={handleChangeTab}
              TabIndicatorProps={{
                style: { display: 'none' },
              }}
              // style={{
              //   marginTop: '50px',
              // }}
              sx={{
                my: { xs: 2, md: '80px' },
                // bgcolor: 'background.paper',
                [`& .${tabsClasses.flexContainer}`]: {
                  justifyContent: {
                    sm: 'center',
                    md: 'center ',
                  },
                },
              }}
            >
              {TABS.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.label}
                  style={{
                    padding: '0px 100px',
                    borderRadius: '12px',
                    color:
                      currentTab === `${tab.value}`
                        ? '#f4f4f4'
                        : (theme.palette.mode === 'light' && '#262626') ||
                          (theme.palette.mode === 'dark' && '#f4f4f4'),
                    background:
                      currentTab === `${tab.value}`
                        ? 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)'
                        : (theme.palette.mode === 'light' && '#F4F4F4') ||
                          (theme.palette.mode === 'dark' && '#252c35'),
                  }}
                  sx={{
                    marginRight: '10px !important',
                  }}
                />
              ))}
            </Tabs>
            {currentTab === 'products' && (
              <Grid
                container
                item
                xs={12}
                md={12}
                sx={{
                  px: 2,
                  rowGap: 1,
                  justifyContent: { md: 'flex-start', xs: 'center' },
                }}
              >
                {productsData.map((product) => (
                  <Grid
                    key={product.id}
                    container
                    item
                    sm={2.8}
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
                      textAlign: 'center',
                      // alignContent: 'space-between',
                      // justifyContent: 'space-around',
                    }}
                  >
                    <ProductList
                      key={product.id}
                      product={product.products}
                      handleViewProductDetails={() => {
                        handleViewProductDetails(product.productsId, product.products.brandId);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {currentTab === 'collection' && (
              <Grid
                container
                item
                xs={12}
                md={12}
                sx={{
                  px: 2,
                  rowGap: 1,
                  justifyContent: { md: 'flex-start', xs: 'center' },
                }}
              >
                {collectionData.map((product) => (
                  <Grid
                    key={product.id}
                    container
                    item
                    sm={2.8}
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
                      textAlign: 'center',
                      // alignContent: 'space-between',
                      // justifyContent: 'space-around',
                    }}
                  >
                    <ProductList
                      key={product.id}
                      product={product.products}
                      handleViewProductDetails={() => {
                        handleViewProductDetails(product.productsId, product.products.brandId);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {currentTab === 'reels' && (
              <Grid
                className="retrttertertretertrereerteretretretret"
                item
                xs={12}
                md={12}
                sx={{
                  // px: 2,
                  // rowGap: 5,
                  // justifyContent: { md: 'space-around', xs: 'center' },
                  flexDirection: 'row',
                }}
                style={{
                  height: '650px !important',
                }}
              >
                <Grid container item md={12} sx={{ height: '650px' }}>
                  <Swiper
                    className="mySwiper"
                    direction="vertical"
                    slidesPerView={1}
                    spaceBetween={1}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    // onSlideChange={() => {
                    //   console.log('slide change');
                    // }}
                    onReachEnd={() => {
                      console.log('end of slides');
                      // fetchAllReels();
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
                      <SwiperSlide>
                        <ReelsTab key={reel.id} reel={reel} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
InfluencerDetailsView.propTypes = {
  currentInfluencer: PropTypes.object,
};
