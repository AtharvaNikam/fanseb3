import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { RouterLink } from 'src/routes/components';
// utils
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function BrandDetailsToolbar({ isActive, backLink, id }) {
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
        <IconButton component={RouterLink} href={backLink}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        <Stack spacing={0.5}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h4"> Brand </Typography>
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
                *Your brand is not activated yet. You can’t proceed further operations.
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack
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
            router.push(paths.brand_dashboard.brands.edit(id));
          }}
        >
          Edit Brand
        </Button>
      </Stack>
    </Stack>
  );
}

BrandDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  isActive: PropTypes.any,
  id: PropTypes.any,
};
