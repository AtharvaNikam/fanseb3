/* eslint-disable react/jsx-curly-brace-presence */
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
// routes
// locales
import { useLocales } from 'src/locales';
// components
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const { user } = useAuthContext();

  const { t } = useLocales();

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={user?.userProfile?.avatar?.fileUrl}
            alt={user?.displayName}
            sx={{ width: 128, height: 128 }}
          />
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.email}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.contactNo}
          </Typography>
        </Stack>

        <Label
          startIcon={
            <Iconify
              icon={user?.isActive ? 'lets-icons:check-fill' : 'lets-icons:close-round-fill'}
              color={user?.isActive ? '#009f7f' : 'red'}
            />
          }
          color={user?.isActive ? 'success' : 'error'}
        >
          {user?.isActive ? 'enabled' : 'disabled'}
        </Label>
      </Stack>
    </Stack>
  );
}
