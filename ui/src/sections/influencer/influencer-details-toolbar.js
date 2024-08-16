import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
// utils
// components
import Label from 'src/components/label';
import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

export default function InfluencerDetailsToolbar({ isActive, backLink, id }) {
  const router = useRouter();
  return (
    <Stack
      spacing={3}
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <Stack spacing={0.5}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h4"> Welcome to your dashboard </Typography>
            <Label
              variant="soft"
              color={
                (isActive === true && 'success') || (isActive === false && 'error') || 'default'
              }
            >
              {isActive ? 'Active' : 'Inactive'}
            </Label>

            {isActive ? null : (
              <Typography
                variant="body2"
                sx={{ color: `error.main`, border: '1px solid', borderRadius: 1, p: 0.5 }}
              >
                *Your account is not activated yet. You can’t proceed further operations.
              </Typography>
            )}
          </Stack>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
            }}
            mb="8px"
          >
            Here is an overview of your activity 🌟
          </Typography>
        </Stack>
      </Stack>

      {/* <Stack
        flexGrow={1}
        spacing={1.5}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="solar:pen-bold" />}
          onClick={(e) => {
            e.preventDefault();
            router.push(paths.influencer_dashboard.userProfile.root);
          }}
        >
          Edit
        </Button>
      </Stack> */}
    </Stack>
  );
}

InfluencerDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  isActive: PropTypes.any,
  id: PropTypes.any,
};
