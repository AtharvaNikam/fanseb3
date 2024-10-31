import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
// theme
// components
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';
import Image from 'src/components/image';
import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

export default function CarouselCenterMode({ data }) {
  console.log('Influencer data', data);
  const router = useRouter();
  const carousel = useCarousel({
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '0px', // Adjust padding for proper alignment
    responsive: [
      {
        breakpoint: 2860,
        settings: { slidesToShow: 2, centerPadding: '30px' }, // Adjust padding for responsive design
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, centerPadding: '20px' },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, centerPadding: '10px' },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',  // Ensure full width for alignment
        position: 'relative',
        padding: '0 20px',  // Add horizontal padding to prevent contraction
      }}
    >
      <CarouselArrows
        filled
        icon="raphael:arrowright"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <Box
              key={item.id}
              sx={{
                px: 1, // Space each carousel item for breathing room
              }}
              // onClick={() => router.push(paths.influencer.details(item.id))}
            >
              <CarouselItem item={item} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

CarouselCenterMode.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const theme = useTheme();

  const { userProfile, name } = item;

  return (
    <Paper
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 3, // Optional shadow to improve visual appearance
      }}
    >
      <Image
        alt={name}
        src={userProfile?.avatar?.fileUrl}
        sx={{
          width: '100%',
          // height: '100%', 
          height: 550,
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />
    </Paper>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
