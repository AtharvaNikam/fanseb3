import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import { useEffect, useRef } from 'react';

// ----------------------------------------------------------------------

export default function ReelPlayer({ link }) {
  const videoRef = useRef();
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      });
    }, options);

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Grid
      item
      style={{
        borderRadius: 20,
      }}
    >
      <video
        ref={videoRef}
        width="100%"
        height={`${window.innerHeight - 100}px`}
        controls
        style={{
          borderRadius: '20px',
          outline: 'none',
          overflow: 'clip',
          objectFit: 'cover',
        }}
      >
        <source src={link?.fileUrl} type="video/mp4" />
        <track kind="captions" src="captions.vtt" label="English" />
      </video>
    </Grid>
  );
}
ReelPlayer.propTypes = {
  link: PropTypes.any,
};
