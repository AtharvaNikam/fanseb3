import Typography from '@mui/material/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/material';
import { Button } from 'react-bootstrap';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Monetize() {
  return (
    <Box
      my="80px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={{ xs: '64px 32px', md: '128px 64px' }}
      gap={{ xs: '40px', md: '64px' }}
      style={{
        flexDirection: 'column',

        borderRadius: '32px',
        background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
      }}
    >
      <Box>
        <Typography
          fontSize={{ xs: '16px', md: '25px' }}
          letterSpacing={{ xs: '3.2px', md: '5.6px' }}
          style={{
            color: '#FFF',
            textAlign: 'center',
            // fontFamily: 'Dosis',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '120%',
            textTransform: 'uppercase',
          }}
        >
          Dont just create. Thrive with Fanseb.
        </Typography>
        <Typography
          pt={{ xs: '22px', md: '32px' }}
          fontSize={{ xs: '36px', md: '55px' }}
          style={{
            color: '#FFF',
            textAlign: 'center',
            // fontFamily: 'Dosis',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '120%',
          }}
        >
          Ready to Monetize Your Passion?
        </Typography>
      </Box>

      <Button
        variant="contained"
        className="link"
        style={{
          marginRight: { xs: '0px', md: 20 },
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
            fontWeight: '900 !important',
            lineHeight: '120%',
          }}
        >
          {'  '} Join Fanseb Today! {'  '}
        </span>
      </Button>
    </Box>
  );
}
