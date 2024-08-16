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
import * as Yup from 'yup';

// ----------------------------------------------------------------currentInfluencerWithdraws------
const withdrawalRequestStatuses = [
  { value: 'approved', label: 'Approved' },
  { value: 'onHold', label: 'On Hold' },
  { value: 'processing', label: 'Processing' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
];
// ----------------------------------------------------------------currentInfluencerWithdraws------

export default function WithdrawalsNewEditDetails({ currentInfluencerWithdraws }) {
  const mdUp = useResponsive('up', 'md');

  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    reelLink: Yup.mixed().nullable().required('Reel is required'),
    thumbnail: Yup.mixed().nullable().required('Thumbnail is required'),
  });

  const defaultValues = {
    name: currentInfluencerWithdraws?.name || '',
    thumbnail: currentInfluencerWithdraws?.thumbnail?.fileUrl || '',
    reelLink: currentInfluencerWithdraws?.reelLink?.fileUrl || '',
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
                {currentInfluencerWithdraws.status}
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
                {currentInfluencerWithdraws.paymentMethod}
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
                {currentInfluencerWithdraws.amount}
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
  currentInfluencerWithdraws: PropTypes.object,
};
