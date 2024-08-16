// @mui
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { LoadingButton } from '@mui/lab';
import { MenuItem } from '@mui/material';
import { useCallback } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import axiosInstance from 'src/utils/axios';
import WithdrawalsNewEditDetails from '../withdrawals-new-edit-details';
// import VoucherNewEditForm from '../categories-new-edit-form';

// ----------------------------------------------------------------------
const withdrawalRequestStatuses = [
  { value: 'approved', label: 'Approved' },
  { value: 'onHold', label: 'On Hold' },
  { value: 'processing', label: 'Processing' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
];
// ----------------------------------------------------------------------

export default function WithdrawalsCreateView({ currentRefund }) {
  const settings = useSettingsContext();
  const isLoadingChangeStatus = useBoolean();
  const popover = usePopover();

  const handleChangeStatus = useCallback(
    async (newValue) => {
      isLoadingChangeStatus.onTrue();
      const res = await axiosInstance.patch(`/refunds/${currentRefund?.id}`, {
        status: newValue,
      });
      // refreshBrandWithdraws();
      isLoadingChangeStatus.onFalse();
    },
    [currentRefund?.id, isLoadingChangeStatus]
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Refund Request Details"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin_dashboard.root,
          },
          {
            name: 'Refunds',
            href: paths.admin_dashboard.refunds.root,
          },
          { name: 'Refund Request' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <LoadingButton
            color="inherit"
            variant="contained"
            loading={isLoadingChangeStatus.value}
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={popover.onOpen}
            sx={{ textTransform: 'capitalize', mr: 2 }}
          >
            {withdrawalRequestStatuses.map((option) => {
              if (option.value === currentRefund?.status) {
                return option.label;
              }
              return null;
            })}
          </LoadingButton>
        }
      />

      <WithdrawalsNewEditDetails currentRefund={currentRefund} />
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {withdrawalRequestStatuses.map((option) => (
          <MenuItem
            key={option.name}
            selected={option.value === currentRefund?.status}
            onClick={() => {
              popover.onClose();
              handleChangeStatus(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </Container>
  );
}
WithdrawalsCreateView.propTypes = {
  currentRefund: PropTypes.object,
};
