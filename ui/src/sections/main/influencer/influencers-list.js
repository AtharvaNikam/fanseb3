import PropTypes from 'prop-types';
// @mui
import { Grid, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// theme
// utils
// theme

// ----------------------------------------------------------------------

export default function InfluencersList({
  title,
  isActive,
  contactNo,
  description,
  address,
  srcLink,
  icon,
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
      <Box sx={{ mb: 1 }}>
        <img
          alt="icon"
          src={srcLink}
          style={{
            borderRadius: 20,
            objectFit: 'cover',
            width: '290px',
            height: '150px',
          }}
        />
      </Box>

      <Typography
        style={{
          textAlign: 'center',
          // fontFamily: 'Dosis',
          fontSize: '25px',
          fontStyle: 'normal',
          fontWeight: '700',
          // lineHeight: '110%',
          background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Typography>
      <Tooltip title={description} TransitionComponent={Fade}>
        <Typography
          variant="body2"
          style={{
            textAlign: 'center',
            // fontFamily: 'Dosis',
            fontSize: '16.091px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '150.5%',
          }}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      </Tooltip>
    </Grid>
  );
}

InfluencersList.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  contactNo: PropTypes.string,
  srcLink: PropTypes.string,
  address: PropTypes.object,
  isActive: PropTypes.any,
};
