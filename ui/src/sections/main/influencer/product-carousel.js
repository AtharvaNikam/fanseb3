import PropTypes from 'prop-types';
// @mui
import { Button, Grid, Typography } from '@mui/material';
// theme
// utils
// theme

// ----------------------------------------------------------------------

export default function ProductCarousel({ srcLink, title, price }) {
  return (
    <Grid
      container
      item
      direction="row"
      justifyContent="center"
      gap={0.5}
      columns={13}
      md={6}
      style={{
        borderRadius: 20,
      }}
      sx={{
        background: '#F4F4F4',
        py: 1,
        px: 1,
        textAlign: 'center',
      }}
    >
      <img
        alt="product_image"
        src={srcLink}
        style={{
          borderRadius: 20,
          objectFit: 'cover',
          width: '240px',
          height: '250px',
        }}
      />
      <Typography>{title}</Typography>
      <Button
        variant="contained"
        size="small"
        style={{
          // fontFamily: 'Dosis',
          fontSize: '12px',
          fontWeight: '600',
          fontStyle: 'normal',
          background: '#232321',
        }}
      >
        ADD TO CART - ₹{price}
      </Button>
    </Grid>
  );
}
ProductCarousel.propTypes = {
  srcLink: PropTypes.any,
  title: PropTypes.string,
  price: PropTypes.string,
};
