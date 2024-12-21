import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
//

import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { HOST_API } from 'src/config-global';
import axiosInstance from 'src/utils/axios';
import { useUserRoles } from 'src/utils/constant';
import { AddressItem, AddressNewForm } from '../address';
import { useCheckout } from '../hooks';
import CheckoutSummary from './checkout-summary';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress({
  checkout,
  onBackStep,
  onCreateBilling,
  userCheck,
}) {
  const { user } = useAuthContext();
  const isUserLoggedIn = Boolean(user);

  const addressForm = useBoolean();
  const confirm = useBoolean();
  const updateLoading = useBoolean(false);

  const { onAddAddress } = useCheckout();

  const { address } = checkout;

  const tempAddress = address;

  const [addressBooks, setAddressBooks] = useState([]);

  const [addressId, setAddressId] = useState();

  const roles = useUserRoles();

  const isAdminLoggedIn = useBoolean();

  const handleDeleteAddress = useCallback(
    async (address_id) => {
      updateLoading.onTrue();
      const updatedAddress = addressBooks.filter((item) => item.id !== address_id);
      if (!user) {
        onAddAddress(updatedAddress);
        return;
      }
      const inputData = {
        userProfile: {
          address: updatedAddress,
        },
      };
      await axiosInstance.patch(`${HOST_API}api/users/${user?.id}`, inputData);
      const res = await axiosInstance.get(`${HOST_API}me`);
      setAddressBooks(res?.data?.userProfile?.address);
      updateLoading.onFalse();
    },
    [addressBooks, onAddAddress, updateLoading, user]
  );

  const updateAddressBooks = useCallback(async () => {
    if (tempAddress) {
      setAddressBooks(tempAddress);
    }
    if (user && !isAdminLoggedIn.value) {
      setAddressBooks(user?.userProfile?.address || []);
    }
    if (!user && !tempAddress) {
      setAddressBooks([]);
    }
  }, [isAdminLoggedIn.value, tempAddress, user]);

  useEffect(() => {
    if (roles) {
      if (roles.some((role) => ['admin', 'influencer', 'brand'].includes(role))) {
        isAdminLoggedIn.onTrue();
      } else if (roles.some((role) => ['customer'].includes(role))) {
        isAdminLoggedIn.onFalse();
      }
    }
  }, [roles, isAdminLoggedIn]);

  useEffect(() => {
    updateAddressBooks();
  }, [updateAddressBooks, tempAddress, user]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          {addressBooks.slice(0, 4).map((_address) => (
            <AddressItem
              key={_address.id}
              address={_address}
              action={
                <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
                  {!_address.primary && (
                    <Button
                      size="small"
                      color="error"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        console.log(_address.id);
                        setAddressId(_address.id);
                        confirm.onTrue();
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  <Button variant="outlined" size="small" onClick={() => onCreateBilling(_address)}>
                    Deliver to this Address
                  </Button>
                </Stack>
              }
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                boxShadow: (theme) => theme.customShadows.card,
              }}
            />
          ))}

          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={addressForm.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Address
            </Button>
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutSummary
            total={checkout.total}
            subTotal={checkout.subTotal}
            discountedSubTotal={checkout.discountedSubTotal}
            discount={checkout.discount}
          />
        </Grid>
      </Grid>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteAddress(addressId);
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />

      <AddressNewForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        setAddressBooks={setAddressBooks}
        addressBooks={addressBooks}
      />
    </>
  );
}

CheckoutBillingAddress.propTypes = {
  userCheck: PropTypes.bool,
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};
