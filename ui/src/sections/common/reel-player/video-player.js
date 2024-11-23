import { Avatar, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Iconify from 'src/components/iconify';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { usePathname, useRouter } from 'src/routes/hook';
import { useCheckout } from 'src/sections/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import CarouselCenterMode from 'src/sections/main/influencer/products-carousel-center';
import './player.css';
import { useResponsive } from 'src/hooks/use-responsive';

function Videos({ id, src, user, description, share, products }) {
  const { userProfile, name: channel, userName } = user;

  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const { onUpdateReelId } = useCheckout();
  const [playing, setPlaying] = useState(false);
  const [follow, setFollow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const mdUp = useResponsive('up', 'md');


  const videoRef = useRef(null);
  const handleVideoPress = () => {
    if (playing) {
      setPlaying(false);
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setPlaying((play) => !play);
    }
  };

  useEffect(() => {
    const options = {
      root: null, // Default viewport
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% of the video is visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target; // Target the specific video element
        if (entry.isIntersecting) {
          video.play();
          onUpdateReelId(video.id); // Update reelId when video starts playing
        } else {
          video.pause();
        }
      });
    }, options);
  
    const videoElement = videoRef.current;
    if (videoElement) {
      observer.observe(videoElement);
    }
  
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
      observer.disconnect(); // Clean up observer
    };
  }, [onUpdateReelId]);  

  const handleShareButtonClick = () => {
    // Construct the current reel URL
    const currentUrl = `${window.location.origin}${/reels/}${id}`;

    enqueueSnackbar(`Copied! ${currentUrl}`);
    copy(currentUrl);

    // Copy the current reel URL to the clipboard
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        console.log('Current reel URL copied to clipboard:', currentUrl);
      })
      .catch((error) => {
        console.error('Error copying current reel URL to clipboard:', error);
      });
  };

  // const handleScrollNext = useCallback(() => {
  //   const currentIndex = currentReelId.findIndex((reel) => reel.id === id);
  //   if (currentIndex < currentReelId.length - 1) {
  //     const nextReelId = currentReelId[currentIndex + 1].id;
  //     router.push(`/reels/${nextReelId}`);
  //   }
  // }, [currentReelId, id, router]);

  // const handleScrollPrevious = useCallback(() => {
  //   const currentIndex = currentReelId.findIndex((reel) => reel.id === id);
  //   if (currentIndex > 0) {
  //     const previousReelId = currentReelId[currentIndex - 1].id;
  //     router.push(`/reels/${previousReelId}`);
  //   }
  // }, [currentReelId, id, router]);

  // Debounced touch move handler
  // const handleTouchMove = debounce((event) => {
  //   const startY = event.touches[0].clientY;
  //   let lastY = startY;

  //   const handleMove = (_event) => {
  //     const newY = _event.touches[0].clientY;
  //     const deltaY = newY - lastY;
  //     lastY = newY;

  //     if (Math.abs(deltaY) > 10) {
  //       _event.preventDefault();
  //     }
  //   };

  //   const handleEnd = (__event) => {
  //     const endY = __event.changedTouches[0].clientY;
  //     const deltaY = endY - startY;

  //     if (Math.abs(deltaY) > 50) {
  //       if (deltaY < 0) {
  //         handleScrollNext();
  //       } else {
  //         handleScrollPrevious();
  //       }
  //     }

  //     window.removeEventListener('touchmove', handleMove);
  //     window.removeEventListener('touchend', handleEnd);
  //   };

  //   window.addEventListener('touchmove', handleMove);
  //   window.addEventListener('touchend', handleEnd);
  // }, 100);

  // Debounced mouse move handler
  // const handleMouseMove = debounce((event) => {
  //   const startY = event.clientY;
  //   let lastY = startY;

  //   const handleMove = (_event) => {
  //     const newY = _event.clientY;
  //     const deltaY = newY - lastY;
  //     lastY = newY;

  //     if (Math.abs(deltaY) > 1) {
  //       _event.preventDefault();
  //     }
  //   };

  //   const handleEnd = (__event) => {
  //     const endY = __event.clientY;
  //     const deltaY = endY - startY;

  //     if (Math.abs(deltaY) > 50) {
  //       if (deltaY < 0) {
  //         handleScrollNext();
  //       } else {
  //         handleScrollPrevious();
  //       }
  //     }

  //     window.removeEventListener('mousemove', handleMove);
  //     window.removeEventListener('mouseup', handleEnd);
  //   };

  //   window.addEventListener('mousemove', handleMove);
  //   window.addEventListener('mouseup', handleEnd);
  // }, 100);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const documentHeight = document.body.scrollHeight;

  //     if (scrollY + windowHeight >= documentHeight) {
  //       // User has reached the bottom of the page
  //       handleScrollNext();
  //     } else if (scrollY === 0) {
  //       // User has reached the top of the page
  //       handleScrollPrevious();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScrollNext, handleScrollPrevious]);

  return (
    <Box
      className="video"
      sx={{
        position: 'relative',
        width: '400px',
        height: '60vh',
        scrollSnapAlign: 'end',
        scrollPaddingBottom: '50px !important',
        borderRadius: '20px',
        boxShadow: '0px 2px 8px 4px rgba(0,0,0,0.5)',
      }}
    >
      <video
        id={id}
        className="video__player"
        onClick={handleVideoPress}
        loop
        controls
        ref={videoRef}
        src={src}
        style={{
          borderRadius: '20px',
          outline: 'none',
          overflow: 'clip',
          objectFit: 'cover',
        }}
      >
        <track kind="captions" src="captions.vtt" label="English" />
      </video>

      <Box className="shortsContainer">
        <Box className="shortsVideoTop">
          <Box
            className="shortsVideoTopIcon"
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              paddingLeft: '8px',
            }}
          >
            {/* <Button onClick={handleScrollPrevious}>Previous Reel</Button>
            <Button onClick={handleScrollNext}>Next Reel</Button> */}
            <Avatar alt="image not found" src={userProfile?.avatar?.fileUrl} />
            <Box
              onClick={() => {
                router.push(`/influencer/${userName}`);
              }}
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
                marginRight: '10px',
                color: 'white',
                fontWeight: '500',
              }}
            >
              {channel}
            </Box>
          </Box>
          <Box className="shortsVideoTopIcon">
            <Iconify
              className="reelShareButton"
              icon="ic:baseline-share"
              color="white"
              width={34}
              onClick={handleShareButtonClick}
              style={{ cursor: 'pointer' }}
              sx={{
                alignItems: 'center',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '50%',
                padding: '6px',
                paddingRight: '8px',
              }}
            />
          </Box>
        </Box>
        <Box className="shortsVideoSideIcons">
          {/* <Box className="shortsVideoSideIcon">
            <Iconify icon="ic:baseline-thumb-up" color="white" width={34} />
            <p>{like}</p>
          </Box>
          <Box className="shortsVideoSideIcon">
            <Iconify icon="ic:baseline-thumb-down" color="white" width={34} />
            <p>{dislike}</p>
          </Box>
          <Box className="shortsVideoSideIcon">
            <Iconify icon="ic:baseline-comment" color="white" width={34} />
            <p>{comment}</p>
          </Box> 

          <Box className="shortsVideoSideIcon">
            <Iconify icon="ic:baseline-share" color="white" width={34} />
            <p>{share}</p>
          </Box> */}
        </Box>
        <Box className="shortsVideoSideIcons">
          {/* <Button onClick={handleScrollPrevious}>Previous Reel</Button>
          <Button onClick={handleScrollNext}>Next Reel</Button> */}
        </Box>
        <Box className="shortsBottom">
          {products && <CarouselCenterMode data={products} />}
          <Box className="shortsDesc">
            {/* <Ticker mode="smooth">{({ index }) => <Box className="description">{id}</Box>}</Ticker> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Videos;

Videos.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
  user: PropTypes.object,
  description: PropTypes.string,
  share: PropTypes.number,
  products: PropTypes.any,
};
