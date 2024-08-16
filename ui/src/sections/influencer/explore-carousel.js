import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
// components
import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

export default function ExploreCarousel({ data }) {
  const theme = useTheme();

  const carousel = useCarousel({
    autoplay: true,
    ...CarouselDots({
      rounded: true,
      sx: {
        mt: 0,
        display: 'none',
      },
    }),
  });

  return (
    <Box
      sx={{
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
      }}
    >
      <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

ExploreCarousel.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { coverUrl, title } = item;

  return <Image alt={title} src={coverUrl} ratio="16/9" />;
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
