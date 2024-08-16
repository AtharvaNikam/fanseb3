import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardHeader, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import * as Yup from 'yup';

// ----------------------------------------------------------------currentBrandWithdraws------
const withdrawalRequestStatuses = [
  { value: 'approved', label: 'Approved' },
  { value: 'onHold', label: 'On Hold' },
  { value: 'processing', label: 'Processing' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
];
// ----------------------------------------------------------------currentBrandWithdraws------

export default function WithdrawalsNewEditDetails({ currentBrandWithdraws }) {
  const mdUp = useResponsive('up', 'md');

  const params = useParams();

  const settings = useSettingsContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    details: Yup.string().required('Details is required'),
    note: Yup.string().required('Note is required'),
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = {
    details: currentBrandWithdraws?.details || '',
    note: currentBrandWithdraws?.note || '',
    status: currentBrandWithdraws?.status || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    watch,

    formState: { isSubmitting },
  } = methods;

  const values = watch();
  console.log('🚀 ~ values:', values);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Withdrawal Information
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {/* Add Withdrawal request from here */}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Create Withdrawal" />}

          <Grid display="flex" direction="column" rowGap={2.5} item sx={{ p: 3 }}>
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
              }}
            >
              Status :
              <Typography
                variant="body1"
                sx={{
                  fontWeight: '700',
                  ml: 1,
                }}
              >
                {currentBrandWithdraws?.status}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
              }}
            >
              Payment Method :
              <Typography
                variant="body1"
                sx={{
                  fontWeight: '700',
                  ml: 1,
                }}
              >
                {currentBrandWithdraws?.paymentMethod}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
              }}
            >
              Amount :
              <Typography
                variant="body1"
                sx={{
                  fontWeight: '700',
                  ml: 1,
                }}
              >
                {currentBrandWithdraws?.amount}
              </Typography>
            </Typography>
            <RHFTextField name="details" label="Details" multiline rows={4} disabled />
            <RHFTextField name="note" label="Note" multiline rows={4} disabled />
          </Grid>
        </Card>
      </Grid>
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <FormProvider methods={methods}>
        <Grid container spacing={3}>
          {renderDetails}
        </Grid>
      </FormProvider>
    </Container>
  );
}
WithdrawalsNewEditDetails.propTypes = {
  currentBrandWithdraws: PropTypes.object,
};
