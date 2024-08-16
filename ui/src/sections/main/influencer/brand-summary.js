import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
// theme
import { bgGradient } from 'src/theme/css';
// utils
import Label from 'src/components/label/label';
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
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.2),
          endColor: alpha(theme.palette[color].main, 0.2),
        }),
        py: 5,
        px: 3,
        borderRadius: 2,
        textAlign: 'center',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        cursor: 'pointer',
        ...sx,
      }}
      {...other}
      gap={0.5}
    >
      {icon && <Box sx={{ width: 64, height: 64, mb: 1 }}>{icon}</Box>}
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
      <Typography variant="body2">
        {address.streetAddress},{address.city},{address.zip}
      </Typography>
      <Typography variant="body2"> {address.country}</Typography>
      <Typography variant="body2">{contactNo}</Typography>
      <Label color={isActive ? 'success' : 'error'} variant="filled" mt={2}>
        {isActive ? 'Active' : 'Inactive'}
      </Label>
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
