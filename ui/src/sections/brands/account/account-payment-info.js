import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// utils
// assets
// components
import { useGetUserMe } from 'src/api/user';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function AccountPaymentInfo() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useGetUserMe();

  const UpdateUserSchema = Yup.object().shape({
    accountHolderName: Yup.string().required('Account Holder Name is required'),
    accountHolderEmail: Yup.string()
      .required('Account Holder Email is required')
      .email('Email must be a valid email address'),
    bankName: Yup.string().required('Bank Name is required'),
    accountNumber: Yup.number().required('Account Number is required'),
  });

  const defaultValues = {
    accountHolderName: user?.userProfile?.paymentInfo?.accountHolderName || '',
    accountHolderEmail: user?.userProfile?.paymentInfo?.accountHolderEmail || '',
    bankName: user?.userProfile?.paymentInfo?.bankName || '',
    accountNumber: user?.userProfile?.paymentInfo?.accountNumber,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const inputData = {
        userProfile: {
          paymentInfo: data,
        },
      };

      // Update user profile with the new file information
      await axiosInstance.patch(`/api/users/${user.id}`, inputData);

      enqueueSnackbar('PaymentInfo updated successfully!');
    } catch (error) {
      enqueueSnackbar('There was an error while updating PaymentInfo', {
        variant: 'error',
      });
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          {/* <></> */}
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField name="accountHolderName" label="Account Holder Name" />
              <RHFTextField name="accountHolderEmail" label="Account Holder Email" />
              <RHFTextField name="bankName" label="Bank Name" />
              <RHFTextField name="accountNumber" label="Account Number" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Payment Info
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
