import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetBrands } from 'src/api/brands';
import { useGetUserMe } from 'src/api/user';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

// ----------------------------------------------------------------currentBrand------

export default function WithdrawalsNewEditDetails({ currentBrand }) {
  const mdUp = useResponsive('up', 'md');

  const params = useParams();

  const settings = useSettingsContext();

  const router = useRouter();

  const [brandOptions, setBrandOptions] = useState([]);

  const [productsOptions, setProductsOptions] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState([]);
  console.log('🚀 ~ selectedBrand:', selectedBrand);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useGetUserMe();

  const { brands } = useGetBrands(user.id);

  const brandData = brands;

  const UpdateUserSchema = Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
    paymentMethod: Yup.string().required('Payment Method is required'),
    details: Yup.string().required('Details is required'),
    note: Yup.string().required('Note is required'),
  });

  const defaultValues = {
    amount: '',
    paymentMethod: '',
    details: '',
    note: '',
    brandId: currentBrand?.id || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Build inputData
      const inputData = {
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        details: data.details,
        note: data.note,
        brandId: data.brandId,
      };

      // Update user profile
      const { id } = params;
      if (currentBrand) {
        await axiosInstance.post(`/brand-withdraws`, inputData);
        // Show success notification
        enqueueSnackbar('Withdrawal request  placed', { variant: 'success' });
        router.push(`/brand-dashboard/brands/${currentBrand.id}/withdrawals`);
      }
    } catch (error) {
      // Show error notification
      enqueueSnackbar('Unexpected error encountered in withdrawal request', { variant: 'error' });
      console.error(error);
    }
  });

  const value = watch();

  const handleDropProfilePicture = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      // If it's not a string, perform the file upload
      const formData = new FormData();
      formData.append('file', newFile);

      // Send FormData to the server
      const res = await axiosInstance.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (file) {
        setValue('reelLink', res?.data?.files?.[0]?.fileUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropThumbnail = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      // If it's not a string, perform the file upload
      const formData = new FormData();
      formData.append('file', newFile);

      // Send FormData to the server
      const res = await axiosInstance.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (file) {
        setValue('thumbnail', res?.data?.files?.[0]?.fileUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get('/users/reels');
      if (data) {
        setProductsOptions(data);
      }
    };
    fetchData();
  }, [brandData]);

  // useEffect(() => {
  //   if (selectedBrand) {
  //     const { data, loading, error } = useGetProducts();
  //   }
  // }, [selectedBrand]);
  const amountLabel = (
    <span>
      Amount (Available Balance: ₹
      <span style={{ color: 'green', marginLeft: 2 }}>
        {currentBrand?.brandBalances?.currentBalance}
      </span>
      )
    </span>
  );

  const renderDetails = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add Withdrawal request from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Create Withdrawal" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="amount" label={amountLabel} />
            <RHFTextField name="paymentMethod" label="Payment Method" />
            <RHFTextField name="details" label="Details" multiline rows={4} />
            <RHFTextField name="note" label="Note" multiline rows={4} />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid item md={4} />}
      <Grid item xs={12} md={8} display="flex" justifyContent="flex-end" p={2}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentBrand ? 'Request Withdrawal' : 'Request Withdrawal'}
        </LoadingButton>
      </Grid>
    </>
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDetails}
          {renderActions}
        </Grid>
      </FormProvider>
    </Container>
  );
}
WithdrawalsNewEditDetails.propTypes = {
  currentBrand: PropTypes.object,
};
