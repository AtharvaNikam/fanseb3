import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { RouterLink } from 'src/routes/components';
// utils
import { fDateTime } from 'src/utils/format-time';
// components
import { LoadingButton } from '@mui/lab';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function RefundsDetailsToolbar({
  status,
  backLink,
  createdAt,
  orderNumber,
  statusOptions,
  onChangeStatus,
  isLoadingChangeStatus,
}) {
  const popover = usePopover();
  statusOptions.sort((a, b) => a.serial - b.serial);

  return (
    <>
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
              <Typography variant="h4"> Order #{orderNumber} </Typography>
              <Label
                variant="soft"
                color={
                  (status === 'approved' && 'success') ||
                  (status === 'onHold' && 'info') ||
                  (status === 'processing' && 'warning') ||
                  (status === 'pending' && 'primary') ||
                  (status === 'rejected' && 'error') ||
                  'default'
                }
              >
                {(status === 'approved' && 'Approved') ||
                  (status === 'onHold' && 'On Hold') ||
                  (status === 'processing' && 'Processing') ||
                  (status === 'pending' && 'Pending') ||
                  (status === 'rejected' && 'Rejected') ||
                  'Default'}
              </Label>
              {/* <Label
                variant="soft"
                color={
                  (status === 11 && 'success') ||
                  (status >= 1 && status <= 6 && 'warning') ||
                  (status === 12 && 'error') ||
                  'default'
                }
              >
                {statusOptions.map((option) => {
                  if (option.serial === status) {
                    return option.name;
                  }
                  return null;
                })}
              </Label> */}
            </Stack>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {fDateTime(createdAt)}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <LoadingButton
            color="inherit"
            variant="outlined"
            loading={isLoadingChangeStatus.value}
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={popover.onOpen}
            sx={{ textTransform: 'capitalize' }}
          >
            {statusOptions.map((option) => {
              if (option.value === status) {
                return option.label;
              }
              return null;
            })}
          </LoadingButton>

          {/* <Button color="inherit" variant="contained">
            Update Status
          </Button> */}

          <Button
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
          >
            Print
          </Button>

          {/* <Button color="inherit" variant="contained" startIcon={<Iconify icon="solar:pen-bold" />}>
            Edit
          </Button> */}
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {statusOptions.map((option) => (
          <MenuItem
            key={option.label}
            selected={option.value === status}
            onClick={() => {
              popover.onClose();
              console.log(option.value);
              onChangeStatus(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

RefundsDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  onChangeStatus: PropTypes.func,
  orderNumber: PropTypes.string,
  status: PropTypes.string,
  statusOptions: PropTypes.array,
  isLoadingChangeStatus: PropTypes.any,
};
