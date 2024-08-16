/* eslint-disable import/no-extraneous-dependencies */
// @mui
import Typography from '@mui/material/Typography';
// components
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import 'rc-slider/assets/index.css';
import './slider.css';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TheFansebExperience() {
  return (
    <Grid
      container
      px={{ md: '48px', xs: '16px' }}
      py={{ md: '80px', xs: '24px' }}
      gap={2}
      justifyContent="space-around"
    >
      <Grid item xs={12} md={6}>
        <Grid container item direction="row" useFlexGap gap={{ xs: '44px', md: '80px' }}>
          <Typography
            style={{
              textAlign: 'start',
              // // fontFamily: 'Dosis',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: '900',
              lineHeight: '100%' /* 48px */,
            }}
          >
            The Fanseb Experience
          </Typography>
          <Grid container item direction="row" md={12}>
            <Grid item xs={6} p={{ xs: 0, md: 2 }}>
              <Typography
                style={{
                  textAlign: 'start',
                  // // fontFamily: 'Dosis',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: '900',
                  lineHeight: '110%' /* 48px */,
                }}
              >
                <span
                  style={{
                    background: `-webkit-linear-gradient(180deg, rgb(1, 113, 237)  0%, rgb(208, 1, 255) 100% )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {'  '} 01 {'  '}
                </span>
              </Typography>
              <Typography
                pt="22px"
                style={{
                  // // fontFamily: 'Dosis',
                  fontSize: '28px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '110%' /* 48px */,
                }}
              >
                Swift Setup
              </Typography>
              <Typography
                style={{
                  textAlign: 'start',
                  // // fontFamily: 'Dosis',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  color: '#808080',
                }}
              >
                Join in a matter of seconds and tailor your store to reflect your unique style. No
                fuss, just a seamless setup to get you started.
              </Typography>
            </Grid>
            <Grid item xs={6} p={{ xs: 0, md: 2 }}>
              <Typography
                style={{
                  textAlign: 'start',
                  // // fontFamily: 'Dosis',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: '900',
                  lineHeight: '110%' /* 48px */,
                }}
              >
                <span
                  style={{
                    background: `-webkit-linear-gradient(180deg, rgb(1, 113, 237)  0%, rgb(208, 1, 255) 100% )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {'  '} 02 {'  '}
                </span>
              </Typography>
              <Typography
                pt="22px"
                style={{
                  // // fontFamily: 'Dosis',
                  fontSize: '28px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '110%' /* 48px */,
                }}
              >
                Swift Setup
              </Typography>
              <Typography
                style={{
                  textAlign: 'start',
                  // // fontFamily: 'Dosis',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  color: '#808080',
                }}
              >
                Join in a matter of seconds and tailor your store to reflect your unique style. No
                fuss, just a seamless setup to get you started.
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" md={12}>
            <Grid item xs={6} p={{ xs: 0, md: 2 }}>
              <Typography
                style={{
                  textAlign: 'start',
                  fontFamily: 'Mulish',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: '900',
                  lineHeight: '110%' /* 48px */,
                }}
              >
                <span
                  style={{
                    background: `-webkit-linear-gradient(180deg, rgb(1, 113, 237)  0%, rgb(208, 1, 255) 100% )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {'  '} 03 {'  '}
                </span>
              </Typography>
              <Typography
                pt="22px"
                style={{
                  fontFamily: 'Mulish',
                  fontSize: '28px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '110%' /* 48px */,
                }}
              >
                Swift Setup
              </Typography>
              <Typography
                style={{
                  textAlign: 'start',
                  // // fontFamily: 'Dosis',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  color: '#808080',
                }}
              >
                Join in a matter of seconds and tailor your store to reflect your unique style. No
                fuss, just a seamless setup to get you started.
              </Typography>
            </Grid>
            <Grid item xs={6} p={{ xs: 0, md: 2 }}>
              <Typography
                style={{
                  textAlign: 'start',
                  fontFamily: 'Mulish',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: '900',
                  lineHeight: '110%' /* 48px */,
                }}
              >
                <span
                  style={{
                    background: `-webkit-linear-gradient(180deg, rgb(1, 113, 237)  0%, rgb(208, 1, 255) 100% )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  04
                </span>
              </Typography>
              <Typography
                pt="22px"
                style={{
                  fontFamily: 'Mulish',
                  fontSize: '28px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '110%' /* 48px */,
                }}
              >
                Swift Setup
              </Typography>
              <Typography
                style={{
                  textAlign: 'start',
                  // // fontFamily: 'Dosis',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  color: '#808080',
                }}
              >
                Join in a matter of seconds and tailor your store to reflect your unique style. No
                fuss, just a seamless setup to get you started.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} fullWidth display="flex">
        <Box
          className="hero-banner-image"
          component="img"
          src="assets\images\home\mobile.png"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          sx={{
            xs: {
              objectFit: 'cover',
              objectPosition: 'top',
              width: '100%',
              height: '75%',
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
