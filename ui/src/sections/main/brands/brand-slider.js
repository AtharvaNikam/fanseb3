// @mui
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// theme
// utils
// theme

// ----------------------------------------------------------------------

export default function BrandsSlider() {
  return (
    <Grid
      item
      py="72px"
      xs={12}
      md={12}
      style={{
        marginTop: '40px',
        alignContent: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      fullWidth
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
        }}
        style={{
          fontFamily: 'Poppins',
          fontSize: '25px',
          fontWeight: '500',
          lineHeight: '56px',
          letterSpacing: '-2px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        Trusted by Brands
      </Typography>
      <div className="brand-slider">
        <div className="slide-track">
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_2.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_3.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_4.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_5.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_6.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_7.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_8.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_9.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_10.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_11.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_2.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_3.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_4.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_5.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_6.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_7.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_8.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_9.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_10.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\img_11.png" />
          </div>
        </div>
      </div>
    </Grid>
  );
}
