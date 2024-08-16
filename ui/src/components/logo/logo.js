import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
// routes
import { RouterLink } from 'src/routes/components';
import { useUserRoles } from 'src/utils/constant';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, link, ...other }, ref) => {
  const theme = useTheme();

  const userPermission = useUserRoles();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        src="/logo/logo-fanseb.png"
        alt="Custom Logo"
        width="100%"
        height="100%"
        style={{ cursor: 'pointer' }}
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  if (link) {
    return (
      <Link component={RouterLink} to={link} sx={{ display: 'contents', color: PRIMARY_LIGHT }}>
        {logo}
      </Link>
    );
  }

  return (
    <Link
      component={RouterLink}
      href={userPermission === 'brand' ? '/brand-dashboard/brands' : '/'}
      sx={{ display: 'contents' }}
    >
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  link: PropTypes.string,
  sx: PropTypes.object,
};

export default Logo;
