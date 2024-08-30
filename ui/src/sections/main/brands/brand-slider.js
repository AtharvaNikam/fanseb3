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
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.png" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.pngg" />
          </div>
          <div className="slide">
            <Box component="img" src="assets\images\brands\slider\lyonbeauty1.pngg" />
          </div>
        </div>
      </div>
    </Grid>
  );
}
