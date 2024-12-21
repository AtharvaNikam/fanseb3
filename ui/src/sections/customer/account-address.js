import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// utils
// assets
// components
import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import FormProvider from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { HOST_API } from 'src/config-global';
import { useBoolean } from 'src/hooks/use-boolean';
import axiosInstance from 'src/utils/axios';
import { AddressItem, AddressNewForm } from '../address';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountAddress({ user }) {
  const { enqueueSnackbar } = useSnackbar();

  const mdUp = false;

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    contactNo: Yup.number().required('Phone number is required'),
    fileUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    isPublic: Yup.boolean(),
    bio: Yup.string(),
  });

  const defaultValues = {
    displayName: user?.displayName || '',
      contactNo: user?.contactNov || '',
    bio: user?.userProfile?.bio || '',
    fileName: user?.userProfile?.avatar?.fileName || null,
    fileUrl: user?.userProfile?.avatar?.fileUrl || null,
    title: user?.userProfile?.address?.title || '',
    country: user?.userProfile?.address?.country || '',
    city: user?.userProfile?.address?.city || '',
    state: user?.userProfile?.address?.state || '',
    zip: user?.userProfile?.address?.zip || '',
    streetAddress: user?.userProfile?.address?.streetAddress || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let response;

      // Check if data?.fileUrl is a string (assume it's a URL)
      if (typeof data?.fileUrl === 'string') {
        // If it's a string, use it directly without file upload
        response = { data: { files: [{ fileUrl: data?.fileUrl }] } };
      } else {
        // If it's not a string, perform the file upload
        const formData = new FormData();
        formData.append('file', data?.fileUrl);

        // Send FormData to the server
        response = await axiosInstance.post(`/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Build inputData
      const inputData = {
        user: {
          name: data?.displayName,
          contactNo: data?.contactNo,
        },
        userProfile: {
          avatar: {
            fileName: response?.data?.files?.[0]?.fileName || data?.fileName,
            fileUrl: response?.data?.files?.[0]?.fileUrl || data?.fileUrl,
          },
          bio: data?.bio,
        },
      };

      // Update user profile
      await axiosInstance.patch(`/api/users/${user.id}`, inputData);

      // Show success notification
      enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
    } catch (error) {
      // Show error notification
      enqueueSnackbar('There was an error while updating profile', { variant: 'error' });
      console.error(error);
    }
  });

  // const { user } = useAuthContext();

  const addressForm = useBoolean();
  const confirm = useBoolean();

  const tempAddress = localStorage.getItem('address');

  const [addressBooks, setAddressBooks] = useState([]);

  const [updateLoding, setUpdateLoding] = useState(false);

  const [addressId, setAddressId] = useState();

  const handleAddAddress = useCallback((data) => {
    localStorage.setItem('address', JSON.stringify(data));
  }, []);

  const handleDeleteAddress = useCallback(
    async (address_id) => {
      setUpdateLoding(true);
      const updatedAddress = addressBooks.filter((item) => item.id !== address_id);

      const inputData = {
        userProfile: {
          address: updatedAddress,
        },
      };

      await axiosInstance.patch(`${HOST_API}/api/users/${user?.id}`, inputData);
      const res = await axiosInstance.get(`${HOST_API}me`);
      setAddressBooks(res?.data?.userProfile?.address);
      setUpdateLoding(false);
    },
    [addressBooks, user?.id]
  );

  const updateAddressBooks = useCallback(async () => {
    // const res = await axiosInstance.get(`${HOST_API}me`);
    if (user) {
      setAddressBooks(user?.userProfile?.address || []);
    } else if (tempAddress) {
      setAddressBooks([JSON.parse(tempAddress)]);
    } else {
      setAddressBooks([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempAddress, user]);

  useEffect(() => {
    updateAddressBooks();
  }, [updateAddressBooks]);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          {/* <Card sx={{ pt: 8, pb: 5, px: 3, textAlign: 'start' }}> */}
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Address
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add your billing and shipping address here
          </Typography>
          {/* </Card> */}
        </Grid>

        <Grid xs={12} md={8}>
          {/* <Card sx={{ p: 3 }}> */}
          <>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                {addressBooks.slice(0, 4).map((address) => (
                  <AddressItem
                    key={address.id}
                    address={address}
                    action={
                      <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
                        {!address.primary && (
                          <Button
                            size="small"
                            color="error"
                            sx={{ mr: 1 }}
                            onClick={() => {
                              console.log(address.id);
                              setAddressId(address.id);
                              confirm.onTrue();
                            }}
                          >
                            Delete
                          </Button>
                        )}
                        {/* <Button
                            variant="outlined"
                            size="small"
                            onClick={() => onCreateBilling(address)}
                          >
                            Deliver to this Address
                          </Button> */}
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

                <Stack direction="row" justifyContent="flex-end">
                  {/* <Button
                      size="small"
                      color="inherit"
                      // onClick={onBackStep}
                      startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                    >
                      Back
                    </Button> */}

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
                {/* <CheckoutSummary
                    total={checkout.total}
                    subTotal={checkout.subTotal}
                    discount={checkout.discount}
                  /> */}
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
              onCreate={handleAddAddress}
              setAddressBooks={setAddressBooks}
              addressBooks={addressBooks}
            />
          </>

          {/* <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Profile
              </LoadingButton>
            </Stack> */}
          {/* </Card> */}
        </Grid>
      </Grid>
    </FormProvider>
  );
}
AccountAddress.propTypes = {
  user: PropTypes.any,
};
