// ----------------------------------------------------------------------

import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function Features() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Box>
      <Grid container py={5} style={{}}>
        <Grid item md={6} px={{ xs: '14px', md: '32px' }}>
          <Grid
            alignItems={{ xs: 'center', md: 'flex-start' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              // alignSelf: 'stretch',
            }}
          >
            <Typography
              style={{
                // fontFamily: 'Dosis',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '120%',
                letterSpacing: '5.6px',
                textTransform: 'uppercase',
                color: 'white',
                // background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
                // background: 'black',
                // backgroundClip: 'text',
                // WebkitBackgroundClip: 'text',
                // WebkitTextFillColor: 'transparent',
              }}
            >
              Key features
            </Typography>
            <Typography
              variant="h2"
              style={{
                color: 'white',
              }}
            >
              Unlock Your Earnings Potential
            </Typography>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '29px',
                letterSpacing: '0em',
                color: 'white',
              }}
            >
              With a swift setup that takes under 30 seconds, join a vibrant community of over 1,000
              creators who are on the road to becoming successful creatorpreneurs.
            </Typography>
          </Grid>

          <Grid
            container
            item
            direction="row"
            mt="64px"
            gap={5}
            p={{ xs: '22px 8px', md: '32px' }}
            display="flex"
            flexWrap="nowrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              borderRadius: '32px',
              color: 'white',
            }}
          >
            <Grid>
              <Box
                component="img"
                src="assets\images\home\Wallets\Color-5.png"
                style={{
                  minWidth: '0',
                  maxWidth: 'none',
                }}
              />
            </Grid>
            <Grid>
              <Typography
                style={{
                  // fontFamily: 'Dosis',
                  fontSize: '23px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '120%',
                }}
              >
                Tailored Content Monetization:
              </Typography>
              <Typography
                style={{
                  fontFamily: 'Inter',
                  paddingTop: '8px',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '160%',
                  color: 'text.secondary',
                }}
              >
                Curate collections, make your content shop-able, and earn real money from each
                purchase, simplifying content monetization.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            gap={5}
            p={{ xs: '22px 8px', md: '32px' }}
            display="flex"
            flexWrap="nowrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              borderRadius: '32px',
              color: 'white',
            }}
          >
            <Grid>
              <Box
                component="img"
                src="assets\images\home\Laptops\Version-1.png"
                style={{
                  minWidth: '0',
                  maxWidth: '100px',
                }}
              />
            </Grid>
            <Grid>
              <Typography
                style={{
                  // fontFamily: 'Dosis',
                  fontSize: '23px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '120%',
                }}
              >
                Seamless Setup in Seconds:
              </Typography>
              <Typography
                style={{
                  /* Body */
                  fontFamily: 'Inter',
                  paddingTop: '8px',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '160%',
                  color: 'text.secondary',
                }}
              >
                Fanseb allows you to set up your store in under 30 seconds, providing a quick and
                easy path to becoming a successful creatorpreneur.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            gap={5}
            display="flex"
            flexWrap="nowrap"
            p={{ xs: '22px 8px', md: '32px' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              borderRadius: '32px',
              color: 'white',
            }}
          >
            <Grid>
              <Box
                component="img"
                src="assets\images\home\Money\Bags\Version-4.png"
                style={{
                  minWidth: '0',
                  maxWidth: '104px',
                }}
              />
            </Grid>
            <Grid>
              <Typography
                style={{
                  // fontFamily: 'Dosis',
                  fontSize: '23px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '120%',
                }}
              >
                Exclusive Incentives and Rewards:
              </Typography>
              <Typography
                style={{
                  /* Body */
                  fontFamily: 'Inter',
                  paddingTop: '8px',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '160%',
                  color: 'text.secondary',
                }}
              >
                Beyond traditional earnings, Fanseb offers exclusive perks from stylish merchandise
                to referral incentives.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {mdUp && (
          <Grid item md={6}>
            <Box
              className="hero-banner-image"
              component="img"
              fullWidth
              display="flex"
              justifyContent="center"
              alignItems="center"
              src="assets\images\home\key-feature-banner.png"
              style={{
                borderRadius: '40px',
                marginTop: '40px',
                marginLeft: 'auto',
                marginRight: 'auto',
                objectFit: 'cover',
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
