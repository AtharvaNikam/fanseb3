// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// routes
// hooks
// theme
// layouts
// components
import './home-hero.css';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ServicesMonetize() {
  const theme = useTheme();
  return (
    <Box
      my={{ xs: '40px', md: '80px' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={{ xs: '45px 20px', md: '128px 64px' }}
      style={{
        flexDirection: 'column',
        gap: '64px',
        borderRadius: '32px',
        background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
      }}
    >
      <Typography
        variant="h4"
        style={{
          color: '#FFF',
          textAlign: 'center',
          // fontFamily: 'Dosis',
          // fontSize: '28px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '120%',
          letterSpacing: '5.6px',
          textTransform: 'uppercase',
        }}
      >
        Dont just create. Thrive with Fanseb.
      </Typography>
      <Typography
        variant="h2"
        style={{
          color: '#FFF',
          textAlign: 'center',
          // fontFamily: 'Dosis',
          // fontSize: '55px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '120%',
        }}
      >
        Transform Your Brands Narrative with Fansebs Influencer Services. Ready to Make Waves?
      </Typography>
      <Button
        variant="contained"
        className="link"
        style={{
          marginRight: 20,
          width: 190,
          backgroundColor: '#fff',
          // backgroundImage: 'linear-gradient(90deg, #0171ed 0%, #d001ff 100%)',
        }}
      >
        <span
          style={{
            background: `-webkit-linear-gradient(180deg, rgb(1, 113, 237)  0%, rgb(208, 1, 255) 100% )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            // fontFamily: 'Dosis',
            // fontSize: '23px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '120%',
          }}
        >
          {'  '} Join Fanseb Today! {'  '}
        </span>
      </Button>
    </Box>
  );
}
