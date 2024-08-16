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

export default function BrandsSummary({ title, isActive, icon, color = 'primary', sx, ...other }) {
  const theme = useTheme();

  return (
    <Stack
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
    >
      {icon && <Box sx={{ width: 64, height: 64, mb: 1 }}>{icon}</Box>}
      <Typography variant="h4">{title}</Typography>
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
  isActive: PropTypes.any,
};
