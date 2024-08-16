import PropTypes from 'prop-types';
// @mui
import { Fade, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// theme
// utils
// theme

// ----------------------------------------------------------------------

export default function BrandsSummary({
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
    <Stack
      fullWidth
      alignItems="start"
      sx={{
        py: 5,
        px: 3,
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: `${color}`,
        // cursor: 'pointer',
        ...sx,
      }}
      {...other}
      gap={1}
    >
      {icon && <Box sx={{ width: 64, height: 64, mb: 1 }}>{icon}</Box>}
      <Typography
        // variant="h3"
        style={{
          // fontFamily: 'Dosis',
          fontSize: '32px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '110%',
          background: 'linear-gradient(90deg, #0171ED 0%, #D001FF 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        {title}
      </Typography>
      <Tooltip title={description} TransitionComponent={Fade}>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'start',
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
      <Typography
        variant="body2"
        wordSpacing={5}
        style={{
          textAlign: 'start',
          marginRight: '25px',
        }}
      >
        {`${address.streetAddress}, ${address.city}, ${address.zip}, ${address.country}`}
      </Typography>

      <Typography variant="body2">+91{contactNo}</Typography>
    </Stack>
  );
}

BrandsSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  contactNo: PropTypes.string,
  address: PropTypes.object,
  isActive: PropTypes.any,
};
