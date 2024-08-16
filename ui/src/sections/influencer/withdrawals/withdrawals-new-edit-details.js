import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useGetUserMe } from 'src/api/user';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

// ----------------------------------------------------------------currentWithdrawl------

export default function WithdrawalsNewEditDetails({ currentWithdrawl }) {
  console.log(currentWithdrawl);
  const mdUp = useResponsive('up', 'md');

  const params = useParams();

  const settings = useSettingsContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useGetUserMe();

  console.log(user);

  const UpdateUserSchema = Yup.object().shape({
    amount: Yup.string().required('Amount is required'),
    details: Yup.mixed().nullable(),
    note: Yup.mixed().nullable(),
    paymentMethod: Yup.string().required('Payment Method is required'),
  });

  const defaultValues = {
    amount: '',
    details: '',
    note: '',
    paymentMethod: '',
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
      console.log(data);
      const inputData = {
        amount: Number(data?.amount),
        details: data?.details,
        note: data?.note,
        paymentMethod: data?.paymentMethod,
      };
      await axiosInstance.post(`/influencer-withdraws`, inputData);
      // Show success notification
      enqueueSnackbar('Withdraw Successfull!', { variant: 'success' });
      router.push('/influencer-dashboard/influencerWithdrawals');
    } catch (error) {
      // Show error notification
      enqueueSnackbar(
        error?.error?.message
          ? error?.error?.message
          : 'There was an error while creating withdraw request',
        {
          variant: 'error',
        }
      );
      console.error(error);
    }
  });

  const value = watch();

  const amountLabel = (
    <span>
      Amount (Available Balance: ₹
      <span style={{ color: 'green' }}>{user?.influencerBalances?.currentBalance}</span>)
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
          {!currentWithdrawl ? 'Request Withdrawal' : 'Save Changes'}
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
  currentWithdrawl: PropTypes.object,
};
