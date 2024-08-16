import React from 'react';
import Box from '@mui/material/Box';

const HeroImgVideo = () => (
  <Box style={{ position: 'relative' }}>
    <Box
      component="video"
      position="relative"
      autoPlay
      loop
      muted
      src="assets\video\video.mp4"
      style={{
        width: '35.55%',
        height: '100%',
        borderBottomLeftRadius:'20px',
        borderBottomRightRadius:'20px',
        marginTop: '10%',
        marginLeft: '30%',
        marginRight: '',
        objectFit: 'cover',
        zIndex: 2,
        overflow: 'hidden',
      }}
    />
    <Box
      className="hero-banner-image"
      component="img"
      fullWidth
      display="flex"
      justifyContent="center"
      position="absolute"
      left='0'
      right='0'
      top='0'
      bottom='0'
      src="assets\images\home\hero\hero-section.png"
      alt="image not failed"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '40px',
        marginLeft: 'auto',
        marginRight: 'auto',
        objectFit: 'contain',
        zIndex: 1,
      }}
    />
  </Box>
);

export default HeroImgVideo;
