import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
// components
import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

export default function CoverImageCarousel({ data }) {
  const theme = useTheme();

  const carousel = useCarousel({
    autoplay: true,
    ...CarouselDots({
      rounded: true,
      sx: { mt: -5 },
    }),
  });

  return (
    <Box
      sx={{
        position: 'relative',
        '& .slick-list': {
          borderRadius: 3,
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

CoverImageCarousel.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { coverUrl, title } = item;

  return <Image alt={title} src={item} ratio="21/9" />;
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
