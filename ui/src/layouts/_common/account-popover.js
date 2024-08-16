import { m } from 'framer-motion';
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
// routes
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// hooks
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

const ADMIN_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: paths.admin_dashboard.user.account,
  },
];
const BRANDS_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: paths.brand_dashboard.brands.userProfile,
  },
];
const INFLUENCER_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: paths.influencer_dashboard.userProfile.root,
  },
];
const CUSTOMER_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: paths.customer_dashboard.root,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const { user } = useAuthContext();

  const { logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      popover.onClose();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('permissions');
      router.replace('/');
      await logout();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.userProfile?.avatar?.fileUrl}
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {user?.permissions.includes('admin') &&
            ADMIN_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                {option.label}
              </MenuItem>
            ))}
          {user?.permissions.includes('brand') &&
            BRANDS_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                {option.label}
              </MenuItem>
            ))}
          {user?.permissions.includes('influencer') &&
            INFLUENCER_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                {option.label}
              </MenuItem>
            ))}
          {user?.permissions.includes('customer') &&
            CUSTOMER_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                {option.label}
              </MenuItem>
            ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
