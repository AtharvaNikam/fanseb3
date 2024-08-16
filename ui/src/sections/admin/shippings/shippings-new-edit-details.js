import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  CardHeader,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

// ----------------------------------------------------------------------
const TYPES = ['free', 'fixed', 'percentage'];
// ----------------------------------------------------------------------

export default function TaxesNewEditDetails({ currentShipping }) {
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  const { id } = params;

  const settings = useSettingsContext();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const [type, setType] = useState('fixed');

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    amount: Yup.number().test('required', 'Amount is required', (value) => {
      console.log(value);
      if (type === 'fixed' || type === 'percentage') {
        return value > 0;
      }

      return true;
    }),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentShipping?.name || '',
      amount: currentShipping?.amount || 0,
    }),
    [currentShipping]
  );

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Build inputData
      const inputData = {
        name: data.name,
        amount: type === 'free' ? 0 : data.amount,
        is_global: true,
        type,
      };
      console.log('🚀 ~ inputData:', inputData);
      if (currentShipping) {
        await axiosInstance.patch(`/shipping-classes/${id}`, inputData);
        // Show success notification
        enqueueSnackbar('Shippings Updated successfully!', { variant: 'success' });
        router.push(`/admin-dashboard/shippings`);
      } else {
        await axiosInstance.post(`/shipping-classes`, inputData);
        // Show success notification
        enqueueSnackbar('Shippings added successfully!', { variant: 'success' });
        router.push(`/admin-dashboard/shippings`);
      }
    } catch (error) {
      // Show error notification
      enqueueSnackbar('Unexpected error encountered', { variant: 'error' });
      console.error(error);
    }
  });

  const handleChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    if (currentShipping) {
      setType(currentShipping.type);
    }
  }, [currentShipping]);

  useEffect(() => {
    if (currentShipping) {
      reset(defaultValues);
    }
  }, [currentShipping, defaultValues, reset]);

  const renderDescription = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add your shipping description and necessary information from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Description" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Name" />

            <RadioGroup value={type} name="typerr" onChange={handleChange}>
              <FormLabel
                xs={{
                  ml: 0.5,
                }}
              >
                Type
              </FormLabel>
              {TYPES.map((color) => (
                <FormControlLabel
                  key={color}
                  value={color}
                  control={<Radio size="medium" />}
                  label={color}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </RadioGroup>
            {type !== 'free' && <RHFTextField name="amount" label="Amount" type="number" />}
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
          {!currentShipping ? 'Add Tax' : 'Save Tax'}
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
  currentShipping: PropTypes.object,
};
