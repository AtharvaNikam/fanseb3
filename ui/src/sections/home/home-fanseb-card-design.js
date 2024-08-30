// ----------------------------------------------------------------------

import { Grid, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { HOST_API } from 'src/config-global';
import { useNavigate } from 'react-router-dom';
import CarouselCenterMode from './carousel-center-mode';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CardDesign() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [influencers, setInfluencers] = useState([]);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/admin/register");  // Navigate to the desired path
  };
  useEffect(() => {
    async function fetchAllInfluencers() {
      try {
        const response = await fetch(`${HOST_API}/api/influencers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setInfluencers(data);
      } catch (error) {
        console.error('Error fetching influencers:', error.message);
        // Handle the error as needed
      }
    }

    fetchAllInfluencers();
  }, []);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={{ xs: '40px', md: '64px' }}
      px={{ xs: '16px', md: '80px' }}
      style={{
        flexDirection: 'column',
        borderRadius: '32px',
      }}
    >
      <Typography
        variant="h3"
        style={{
          textAlign: 'center',
          fontStyle: 'normal',
          fontWeight: '400',
          textTransform: 'uppercase',
          color: 'white',
        }}
      >
        Fanseb: Where Every Creator Finds Their Spotlight.
      </Typography>
      <Typography
        variant="body1"
        pt={1}
        style={{
          color: 'white',
          textAlign: 'center',
          fontStyle: 'normal',
          textTransform: 'uppercase',
        }}
      >
        At Fanseb, we collaborate with creators big and small, celebrating unique stories and
        exceptional content. Join us, where your unique voice is not just heard but celebrated.
      </Typography>
      <Grid container py="40px">
        <CarouselCenterMode data={influencers} />
      </Grid>
      <Button
        variant="contained"
        padding={{ xs: '18px 28px', md: '25px 35px' }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          // background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
          background: 'white',
        }}
        onClick={handleGetStartedClick}
      >
        <Typography
          style={{
            color: 'black',
            textAlign: 'center',
            fontStyle: 'normal',
            fontWeight: '900',
            padding: '10px 50px',
          }}
        >
          Join the Waitlist
        </Typography>
      </Button>
    </Box>
  );
}
