// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// eslint-disable-next-line import/no-extraneous-dependencies
import Marquee from 'react-fast-marquee';
// routes
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
//
import { Alert, Box, Divider, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetUserMe } from 'src/api/user';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import ReelIcon from 'src/sections/common/reel-icon';
import BrandsCarousel from '../brands-carousel';
import ExploreCarousel from '../explore-carousel';
import InfluencerDetailsHistory from '../influencer-details-history';
import BrandDetailsInfo from '../influencer-details-info';
import InfluencerDetailsItems from '../influencer-details-item';
import InfluencerDetailsToolbar from '../influencer-details-toolbar';

// ----------------------------------------------------------------------
const MochAds = [
  {
    id: '1',
    coverUrl: '/assets/images/influencer-dashboard/ads/ad_1.png',
    title: 'Mochi Black',
  },
  {
    id: '2',
    coverUrl: '/assets/images/influencer-dashboard/ads/ad_2.png',
    title: 'Mochi Red',
  },
  {
    id: '3',
    coverUrl: '/assets/images/influencer-dashboard/ads/ad-3.png',
    title: 'Mochi Blue',
  },
];
// ----------------------------------------------------------------------

export default function InfluencerDetailsView() {
  const settings = useSettingsContext();
  const { user } = useGetUserMe();
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');
  const settingss = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { user: currentUser } = useGetUserMe();
  const { id } = currentUser;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <ReelIcon />
      <Marquee
        style={{
          background: 'linear-gradient(92deg,#ffd2a8,rgba(255,210,168,.6))',
          borderRadius: '8px',
        }}
      >
        <Grid display="flex" alignItems="center" p="2px">
          <Image
            src="/assets/images/influencer-dashboard/c423819be1d7543279ea_Ajio.png"
            sx={{ height: 30 }}
          />
          <Image src="/static/icons/ic_notification.svg" sx={{ width: 20, height: 20 }} />
          <Typography variant="subtitle2">is now LIVE! | 5% commission</Typography>
        </Grid>
      </Marquee>

      <Grid py={2}>
        <Alert
          severity="success"
          sx={{
            width: 1,
            '&:hover': {
              color: '#000000',
              textDecoration: 'underline #000000',
            },
          }}
        >
          <Typography
            variant="body1"
            onClick={() => {
              router.push(`/influencer/${user?.userName}`);
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            fanseb.com/influencer/{user?.userName}
          </Typography>
        </Alert>
      </Grid>
      <Box pt={4} mb={6}>
        <Typography variant="h4" mb="8px">
          Explore
        </Typography>
        <ExploreCarousel data={MochAds} />
      </Box>
      <InfluencerDetailsToolbar
        backLink={paths.influencer_dashboard.influencer.root}
        isActive={currentUser?.isActive}
        id={id}
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            {mdUp && currentUser && (
              <InfluencerDetailsItems items={currentUser?.userProfile?.gallery?.fileUrl} />
            )}
            <InfluencerDetailsHistory user={currentUser} />
          </Stack>
        </Grid>

        {mdUp && (
          <Grid xs={12} md={4}>
            <BrandDetailsInfo
              currentUser={currentUser}
              delivery={currentUser?.delivery}
              payment={currentUser?.userProfile?.paymentInfo}
              shippingAddress={currentUser?.address}
            />
          </Grid>
        )}
      </Grid>

      <Grid py={3}>
        <Slider {...settingss} mx="6px">
          <Grid
            mr="5px"
            borderRadius="15px"
            px="16px"
            pt="12px"
            sx={{
              backgroundImage:
                'linear-gradient(90.31deg, rgba(227, 129, 37, 0.08) 0.25%, rgba(227, 129, 37, 0.047) 113.83%)',
              border: '0.06rem solid rgb(227, 129, 37)',
              height: '6rem !important',
            }}
          >
            <Grid display="flex" alignItems="center" justifyContent="space-between">
              <Grid>
                <Grid display="flex" alignItems="center">
                  <Box
                    component="img"
                    src="/assets/images/influencer-dashboard/shopping-black-icon.png"
                    mr={1}
                    style={{
                      width: '20px',
                      height: '20px',
                    }}
                  />
                  <Grid>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontFamily="Poppins, sans-serif"
                      fontSize="14px"
                    >
                      Earn from existing content
                    </Typography>
                  </Grid>
                </Grid>
                <Grid pt="4px">
                  <Typography
                    variant="body1"
                    color="text.disabled"
                    fontFamily="Poppins, sans-serif"
                    fontSize="13px"
                  >
                    Share Wishlinks of top brands like H&M, Urbanic, Myntra, Meesho and more!
                  </Typography>
                </Grid>
              </Grid>
              <Iconify
                icon="solar:alt-arrow-right-line-duotone"
                width={25}
                strokeWidth={3}
                ml="20px"
              />
            </Grid>
          </Grid>
          <Grid
            borderRadius="15px"
            px="16px"
            pt="12px"
            sx={{
              backgroundImage:
                'linear-gradient(90.31deg, rgba(227, 129, 37, 0.08) 0.25%, rgba(227, 129, 37, 0.047) 113.83%)',
              border: '0.06rem solid rgb(227, 129, 37)',
              height: '6rem !important',
            }}
          >
            <Grid display="flex" alignItems="center" justifyContent="space-between">
              <Grid>
                <Grid display="flex" alignItems="center">
                  <Box
                    component="img"
                    mr={1}
                    src="/assets/images/influencer-dashboard/myntra-logo-small.png"
                    style={{
                      width: '20px',
                      height: '20px',
                    }}
                  />
                  <Grid>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontFamily="Poppins, sans-serif"
                      fontSize="14px"
                    >
                      Create a collection
                    </Typography>
                  </Grid>
                </Grid>
                <Grid pt="4px">
                  <Typography
                    variant="body1"
                    color="text.disabled"
                    fontFamily="Poppins, sans-serif"
                    fontSize="13px"
                  >
                    Curate collections of your favourite products for your audience
                  </Typography>
                </Grid>
              </Grid>
              <Iconify
                icon="solar:alt-arrow-right-line-duotone"
                width={25}
                strokeWidth={3}
                ml="20px"
              />
            </Grid>
          </Grid>
        </Slider>
      </Grid>

      <Grid py={3}>
        <Image
          src="/assets/images/influencer-dashboard/banner-homepage.png"
          style={{
            borderRadius: '1rem',
            width: '100%',
          }}
        />
      </Grid>

      <Grid py={3}>
        <Box display="flex" direction="row" justifyContent="space-between" alignItems="center">
          <Typography pt={1} variant="h4">
            Spotlight brands ✨
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              color: 'rgb(233, 30, 99)',
            }}
          >
            See All
          </Typography>
        </Box>
        <Typography
          pt={0.5}
          mb={2}
          variant="caption"
          style={{
            color: '#6B6B6B',
          }}
        >
          Discover the most trending brands on Wishlink
        </Typography>
        <Box mt={2}>
          <BrandsCarousel data={MochAds} />
        </Box>
      </Grid>
      <Grid
        // px={3}
        // py={2}
        // mt={5}
        height="30px"
        display="flex"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body2">⚡ Powered by</Typography>
        <Image
          src="/assets/images/influencer-dashboard/wishlink-orange.png"
          style={{
            width: '6rem',
          }}
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 1, bgcolor: '#000' }}
          size={1}
        />

        <Box
          component="img"
          mx={1}
          src="/assets/images/influencer-dashboard/support.png"
          style={{
            width: '16px',
            height: '16px',
            opacity: '0.7',
          }}
        />
        <Typography variant="body2">Help & Support</Typography>
      </Grid>
    </Container>
  );
}
