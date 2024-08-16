import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

export default function TaxesNewEditDetails({ currentTax }) {
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  const { id } = params;

  const settings = useSettingsContext();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    rate: Yup.number().required('Rate is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zip: Yup.string().required('ZIP is required'),
  });

  const defaultValues = {
    name: currentTax?.name || '',
    rate: currentTax?.rate || 0,
    country: currentTax?.country || '',
    state: currentTax?.state || '',
    city: currentTax?.city || '',
    zip: currentTax?.zip || '',
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
      // Build inputData
      const inputData = {
        name: data.name,
        rate: data.rate,
        country: data.country,
        state: data.state,
        zip: data.zip,
        city: data.city,
        isGlobal: true,
        onShipping: true,
      };

      if (currentTax) {
        await axiosInstance.patch(`/tax-classes/${id}`, inputData);
        // Show success notification
        enqueueSnackbar('Tax Updated successfully!', { variant: 'success' });
        router.push(`/admin-dashboard/taxes`);
      } else {
        await axiosInstance.post(`/tax-classes`, inputData);
        // Show success notification
        enqueueSnackbar('Tax added successfully!', { variant: 'success' });
        router.push(`/admin-dashboard/taxes`);
      }
    } catch (error) {
      // Show error notification
      enqueueSnackbar('Unexpected error encountered', { variant: 'error' });
      console.error(error);
    }
  });

  const renderDescription = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Information
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add your tax information from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Description" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="rate" label="Rate" type="number" />
            <RHFTextField name="country" label="Country" />
            <RHFTextField name="city" label="City" />
            <RHFTextField name="state" label="State" />
            <RHFTextField name="zip" label="ZIP" />
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
          {!currentTax ? 'Add Tax' : 'Save Tax'}
        </LoadingButton>
      </Grid>
    </>
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDescription}
          {renderActions}
        </Grid>
      </FormProvider>
    </Container>
  );
}
TaxesNewEditDetails.propTypes = {
  currentTax: PropTypes.object,
};
