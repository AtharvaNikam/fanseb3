import { useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactTyped } from 'react-typed';
// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// routes
// hooks
// theme
// layouts
// components
import { Button, Typography } from '@mui/material';
import './home-hero.css';
import HeroImgVideo from './hero-img-video';
// ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//   ...bgGradient({
//     // color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
//     imgUrl: '/assets/background/overlay_3.jpg',
//   }),
//   width: '100%',
//   height: '100vh',
//   position: 'relative',
//   [theme.breakpoints.up('md')]: {
//     top: 0,
//     left: 0,
//     position: 'fixed',
//   },
// }));

// const StyledWrapper = styled('div')(({ theme }) => ({
//   height: '100%',
//   overflow: 'hidden',
//   position: 'relative',
//   [theme.breakpoints.up('md')]: {
//     marginTop: HEADER.H_DESKTOP_OFFSET,
//   },
// }));

// const StyledTextGradient = styled(m.h1)(({ theme }) => ({
//   ...textGradient(
//     `180deg, rgb(1, 113, 237)  0%, rgb(208, 1, 255) 25%, rgb(1, 113, 237)  50%, rgb(208, 1, 255) 75%, rgb(1, 113, 237)  100%`
//   ),
//   padding: 0,
//   marginTop: 8,
//   lineHeight: 1,
//   marginBottom: 24,
//   letterSpacing: 8,
//   textAlign: 'center',
//   backgroundSize: '400%',
//   fontSize: `${64 / 16}rem`,
//   fontFamily: "'Dosis' ",
//   [theme.breakpoints.up('md')]: {
//     fontSize: `75px`,
//   },
// }));

// const StyledEllipseTop = styled('div')(({ theme }) => ({
//   top: -80,
//   width: 480,
//   right: -80,
//   height: 480,
//   borderRadius: '50%',
//   position: 'absolute',
//   filter: 'blur(100px)',
//   WebkitFilter: 'blur(100px)',
//   backgroundColor: alpha(theme.palette.primary.darker, 0.12),
// }));

// const StyledEllipseBottom = styled('div')(({ theme }) => ({
//   height: 400,
//   bottom: -200,
//   left: '10%',
//   right: '10%',
//   borderRadius: '50%',
//   position: 'absolute',
//   filter: 'blur(100px)',
//   WebkitFilter: 'blur(100px)',
//   backgroundColor: alpha(theme.palette.primary.darker, 0.12),
// }));

// const StyledPolygon = styled('div')(({ opacity = 1, anchor = 'left', theme }) => ({
//   ...bgBlur({
//     opacity,
//     color: theme.palette.background.default,
//   }),
//   zIndex: 9,
//   bottom: 0,
//   height: 80,
//   width: '50%',
//   position: 'absolute',
//   clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
//   ...(anchor === 'left' && {
//     left: 0,
//   }),
//   ...(anchor === 'right' && {
//     right: 0,
//     transform: 'scaleX(-1)',
//   }),
// }));

// ----------------------------------------------------------------------

export default function HomeHero() {
  // const mdUp = useResponsive('up', 'md');

  // const theme = useTheme();

  const heroRef = useRef(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  // const isLight = theme.palette.mode === 'light';

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  // const transition = {
  //   repeatType: 'loop',
  //   ease: 'linear',
  //   duration: 60 * 4,
  //   repeat: Infinity,
  // };

  // const opacity = 1 - percent / 100;

  // const hide = percent > 120;

  return (
    <Grid container pt={{ xs: 8, md: 20 }}>
      <Grid item md={7} pt={5}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'left',
          }}
          style={{
            fontFamily: 'Poppins',
            fontSize: '72px',
            fontWeight: '500',
            lineHeight: '80px',
            letterSpacing: '-4px',
            textAlign: 'left',
            color: 'white',
          }}
        >
          Explore a treasure of curated
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'left',
          }}
          style={{
            fontFamily: 'Poppins',
            fontSize: '68px',
            fontWeight: '500',
            lineHeight: '80px',
            letterSpacing: '-4px',
            textAlign: 'left',
            color: 'white',
            opacity: '0.6',
          }}
        >
          <ReactTyped
            strings={['love', 'fashion', 'style', 'recommend']}
            typeSpeed={80}
            loop
            backSpeed={70}
            // cursorChar=""
            showCursor
          />
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'left',
          }}
          style={{
            fontFamily: 'Poppins',
            fontSize: '72px',
            fontWeight: '500',
            lineHeight: '80px',
            letterSpacing: '-4px',
            textAlign: 'left',
            color: 'white',
          }}
        >
          In one easy spot.
        </Typography>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'left',

            marginTop: '40px',
          }}
          style={{
            fontFamily: 'Poppins',
            fontSize: '24px',
            fontWeight: '400',
            lineHeight: '32px',
            letterSpacing: '-0.5px',
            textAlign: 'left',
            color: 'white',
          }}
        >
          Streamline brand collaboration,Select your favorite brands, share links, and reap
          significant rewards when your audience shops on your fanseb.
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '20px',
            letterSpacing: '-0.5px',
            textAlign: 'center',
            backgroundColor: '#f1f1f1',
            mt: '5px',
            mb: '5px',
            width: '145px',
            height: '56px',
            padding: '18px 32px 18px 32px',
            borderRadius: '6px',
          }}
          style={{
            // marginLeft: '60px',
            marginTop: '40px',
          }}
        >
          <Box
            style={{
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '20px',
              letterSpacing: '0em',
              textAlign: 'left',
              color: 'black',
            }}
          >
            Get Started
          </Box>
        </Button>
      </Grid>
      <Grid item md={5} p={5} style={{ position: 'relative' }}>
            <HeroImgVideo/>
      </Grid>
    </Grid>
  );
}
