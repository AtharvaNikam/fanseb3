import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { alpha, useTheme } from '@mui/material/styles';
// theme
import { bgGradient } from 'src/theme/css';
// components
import { Button, Typography } from '@mui/material';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';
import Image from 'src/components/image';
import Label from 'src/components/label';
import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

export default function CarouselCenterMode({ data }) {
  const carousel = useCarousel({
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 274,
        settings: { slidesToShow: 3, centerPadding: '0' },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
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
            <Box key={item.id} sx={{ px: 1 }}>
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
  const router = useRouter();

  const { image, name, price } = item;

  return (
    <Paper
      sx={{
        // border: `4px solid rgba(0, 0, 0, 0.80)`,
        borderRadius: '10px',
        overflow: 'clip',
        position: 'relative',
      }}
    >
      <Box
        onClick={() => {
          router.push(`/influencer/${item?.brandId}/product/${item?.id}`);
        }}
      >
        <Label
          className="new-labeldsfsdfsdfsdfdsfsdf"
          style={{
            background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
            borderRadius: '10px 0px ',
            borderBottom: '1px solid black !important',
            position: 'absolute',
            height: '15px',
            padding: '10px',
            zIndex: 1,
          }}
        >
          <Typography
            variant="body2"
            style={{
              color: '#FFF',
              fontFamily: 'Rubik',
              fontSize: '8px',
            }}
          >
            New
          </Typography>
        </Label>
        <Image alt={name} src={image?.fileUrl} ratio="3/4" />
      </Box>

      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          padding: '10% !important',
          paddingBottom: '10% !important',
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 25%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      >
        {/* <TextMaxLine variant="body2" paragraph sx={{ fontSize: 12 }}>
          {name}
        </TextMaxLine> */}

        <Button
          color="inherit"
          variant="body2"
          onClick={() => {
            router.push(`/influencer/${item?.brandId}/product/${item?.id}`);
          }}
          sx={{
            padding: 0,
            fontSize: 10,
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            transition: theme.transitions.create(['opacity']),
            '&:hover': { opacity: 1 },
          }}
        >
          {name}
        </Button>
      </CardContent>
    </Paper>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
