import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ChromePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';
import { useParams, useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

export default function OrderStatusNewEditDetails({ currentOrderStatus }) {
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  const { id } = params;

  const settings = useSettingsContext();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const [color, setColor] = useState(currentOrderStatus?.color || '#b2b2');

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    serial: Yup.string().required('Serial is required'),
  });

  const defaultValues = {
    name: currentOrderStatus?.name || '',
    serial: currentOrderStatus?.serial || '',
    color: currentOrderStatus?.color || '',
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
      console.log('🚀 ~ data:', data);

      // Build inputData
      const inputData = {
        name: data?.name,
        serial: Number(data?.serial),
        color,
      };
      console.log('🚀 ~ inputData:', inputData);

      if (currentOrderStatus) {
        await axiosInstance.patch(`/order-statuses/${id}`, inputData);
        // Show success notification
        enqueueSnackbar('Order Status Updated successfully!', { variant: 'success' });
        router.push(`/admin-dashboard/orders-status`);
      } else {
        await axiosInstance.post(`/order-statuses`, inputData);
        // Show success notification
        enqueueSnackbar('Order Status added successfully!', { variant: 'success' });
        router.push(`/admin-dashboard/orders-status`);
      }
    } catch (error) {
      // Show error notification
      enqueueSnackbar('Unexpected error encountered', { variant: 'error' });
      console.error(error);
    }
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (clr) => {
    setColor(clr.hex);
  };

  useEffect(() => {
    if (currentOrderStatus) {
      setValue('name', currentOrderStatus?.name);
      setValue('serial', currentOrderStatus?.serial);
      setValue('color', currentOrderStatus?.color);
    }
  }, [currentOrderStatus, setValue]);

  const renderDescription = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add order status from here
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Description" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Name*" />

            <RHFTextField name="serial" label="Serial*" type="number" />
            <Label
              color="info"
              variant="soft"
              sx={{ justifyContent: 'flex-start', height: 22, pb: 0.2 }}
            >
              The order status should follow(ex: 1-[9])
            </Label>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  borderRadius: '50px',
                  padding: '5px',
                  background: `${color}`,
                  cursor: 'pointer',
                }}
                onClick={handleClick}
              />

              {displayColorPicker ? (
                <Box>
                  <Box
                    style={{
                      position: 'fixed',
                      top: '0px',
                      right: '0px',
                      bottom: '0px',
                      left: '0px',
                    }}
                    onClick={handleClose}
                  />
                  <ChromePicker color={color} onChange={handleChange} />
                </Box>
              ) : null}

              <Label
                color="info"
                variant="soft"
                sx={{ justifyContent: 'flex-start', height: 22, ml: 2 }}
              >
                {color}
              </Label>
            </Box>
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
          {!currentOrderStatus ? 'Add Order Status' : 'Save Order Status'}
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
OrderStatusNewEditDetails.propTypes = {
  currentOrderStatus: PropTypes.object,
};
