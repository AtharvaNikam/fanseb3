import PropTypes from 'prop-types';
// @mui
import { Box, Button, Grid, Typography } from '@mui/material';
import Label from 'src/components/label';
// theme
// utils
// theme

// ----------------------------------------------------------------------

export default function ReelsProductList({ srcLink, title, price }) {
  return (
    <Grid
      container
      item
      // md={3.7}
      sm={5.5}
      style={{
        borderRadius: 20,
      }}
      sx={{
        // background: '#F4F4F4',
        // border: '2px solid #F4F4',

        width: '300px',
        height: '400px',
        // gap: '12px',
        direction: 'column',
        textAlign: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-around',
      }}
    >
      <Box style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
        <Label
          style={{
            background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '10px 0px',
            height: '15px',
            padding: '10px',
            marginLeft: '0px',
          }}
        >
          <Typography
            variant="body2"
            style={{
              color: '#FFF',
              fontFamily: 'Rubik',
              fontSize: '10px',
            }}
          >
            New
          </Typography>
        </Label>
        <img
          alt="product_image"
          src={srcLink}
          style={{
            // borderRadius: 20,
            objectFit: 'cover',
            width: '240px',
            height: '285px',
          }}
        />
      </Box>

      <Typography
        style={{
          textAlign: 'center',
          fontFamily: 'Rubik',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: 'normal',
          margin: '0px 25px',
        }}
      >
        {title}
      </Typography>
      <Button
        variant="contained"
        size="small"
        style={{
          width: '100%',
          // fontFamily: 'Dosis',
          fontSize: '12px',
          color: 'white',
          fontWeight: '600',
          fontStyle: 'normal',
          background: '#232321',
          borderRadius: '8.517px',
        }}
      >
        ADD TO CART - ₹
        <span
          style={{
            color: '#D001FF',
            // fontFamily: 'Dosis',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: '600',
            marginLeft: '3px',
            textTransform: 'uppercase',
          }}
        >
          {price}
        </span>
      </Button>
    </Grid>
  );
}
ReelsProductList.propTypes = {
  srcLink: PropTypes.any,
  title: PropTypes.string,
  price: PropTypes.string,
};
