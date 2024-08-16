import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// theme
// utils
// theme

// ----------------------------------------------------------------------

export default function ServicesCard({
  title,
  isActive,
  contactNo,
  description,
  address,
  icon,
  color,
  sx,
  ...other
}) {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={12}
      md={4}
      alignItems="center"
      sx={{
        background: '#F4F4F4',
        py: 2,
        px: 2,

        // border: '1px solid #EDEDED',
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'light' ? '#f4f4f4' : '#252c35',
        cursor: 'pointer',
        ...sx,
      }}
      {...other}
    >
      <Box>
        <img alt="icon" src={`${icon}`} />
      </Box>
      <Typography
        variant="h4"
        style={{
          // fontFamily: 'Dosis',
          lineHeight: '110%',
          background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Grid>
  );
}

ServicesCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  contactNo: PropTypes.string,
  address: PropTypes.object,
  isActive: PropTypes.any,
};
