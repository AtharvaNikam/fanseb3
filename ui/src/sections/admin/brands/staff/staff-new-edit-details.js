import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import * as Yup from 'yup';

// ----------------------------------------------------------------------
const productGalleryTypeOptions = [
  { value: 'collection', name: 'Collection' },
  { value: 'product', name: 'Product' },
];
// ----------------------------------------------------------------------

export default function StaffNewEditDetails({ currentProduct }) {
  const { enqueueSnackbar } = useSnackbar();

  const settings = useSettingsContext();

  const mdUp = useResponsive('up', 'md');

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.number().required('Password is required'),
  });

  const defaultValues = {
    name: currentProduct?.name || '',
    email: currentProduct?.email || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const inputData = {
        name: data?.name,
        email: data?.email,
        password: data?.password,
      };
      console.log('🚀 ~ inputData:', inputData);

      // await axiosInstance.post(`/brands/${id}/products`, inputData);

      enqueueSnackbar('Staff added successfully!', { variant: 'success' });
      // router.push(`/brand-dashboard/brands/${id}/staff`);
    } catch (error) {
      enqueueSnackbar('Unexpected error encountered', { variant: 'error' });
      console.error(error);
    }
  });

  const renderInformation = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Information
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add your staff information and create a new staff from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Information" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Name*" />

            <RHFTextField name="email" label="Email*" />

            <RHFTextField name="password" label="Password" type="password" />
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
          {!currentProduct ? 'Add Product' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderInformation}
          {renderActions}
        </Grid>
      </FormProvider>
    </Container>
  );
}
StaffNewEditDetails.propTypes = {
  currentProduct: PropTypes.object,
};
