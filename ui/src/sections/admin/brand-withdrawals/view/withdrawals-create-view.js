// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { LoadingButton } from '@mui/lab';
import { MenuItem } from '@mui/material';
import { useCallback } from 'react';
import { useGetAdminBrandWithdraw } from 'src/api/adminWithdraws';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useParams } from 'src/routes/hook';
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

export default function WithdrawalsCreateView() {
  const settings = useSettingsContext();
  const isLoadingChangeStatus = useBoolean();
  const popover = usePopover();

  const { id } = useParams();

  const { brandWithdraws: currentBrandWithdraws, refreshBrandWithdraws } =
    useGetAdminBrandWithdraw(id);

  const handleChangeStatus = useCallback(
    async (newValue) => {
      isLoadingChangeStatus.onTrue();
      const res = await axiosInstance.patch(`/brand-withdraws/${id}`, {
        status: newValue,
      });
      refreshBrandWithdraws();
      isLoadingChangeStatus.onFalse();
    },
    [id, isLoadingChangeStatus, refreshBrandWithdraws]
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Brand Withdrawal Request"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin_dashboard.root,
          },
          {
            name: 'Withdrawal',
            href: paths.admin_dashboard.brandWithdrawals.root,
          },
          { name: 'Withdrawal Request' },
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
              if (option.value === currentBrandWithdraws.status) {
                return option.label;
              }
              return null;
            })}
          </LoadingButton>
        }
      />

      <WithdrawalsNewEditDetails currentBrandWithdraws={currentBrandWithdraws} />
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {withdrawalRequestStatuses.map((option) => (
          <MenuItem
            key={option.name}
            selected={option.value === currentBrandWithdraws.status}
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
