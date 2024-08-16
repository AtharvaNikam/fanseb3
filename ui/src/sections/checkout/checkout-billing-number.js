import PropTypes from 'prop-types';
// @mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
// components
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RHFCode } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import axiosInstance, { endpoints } from 'src/utils/axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MuiPhoneNumber from 'react-phone-input-2';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-phone-input-2/lib/material.css';

// ----------------------------------------------------------------------

export default function CheckoutBillingNumber({ methods }) {
  const { control } = useFormContext();

  const [verificationSid_onSend, setVerificationSid_onSend] = useState('');

  const isOtpVerified = useBoolean(false);
  const isLoading = useBoolean(false);
  const otpSend = useBoolean(false);

  const updateOtp_send = useBoolean(false);
  const updatePhoneNumber = useBoolean(false);

  const { watch, setValue, trigger } = methods;

  const values = watch();

  const onSubmitOtp = async () => {
    try {
      isLoading.onTrue();
      trigger('otp')
        .then(async (response) => {
          if (response) {
            const inputData = {
              id: verificationSid_onSend,
              code: values.otp,
              phoneNumber: values.phoneNumber,
            };
            const res = await axiosInstance.post(endpoints.otpGuest.verify, inputData);

            if (res?.data?.success === true) {
              setValue('verificationStatus', {
                phoneNumber: values.phoneNumber,
                isVerified: true,
                verificationSid: res?.data?.verificationSid,
              });
              isOtpVerified.onTrue();
              updatePhoneNumber.onFalse();
              otpSend.onFalse();
              enqueueSnackbar(res?.data?.message, {
                variant: 'success',
              });
            } else {
              // setValue('otp', '');
              // isOtpVerified.onFalse();
              enqueueSnackbar(res?.data?.message, {
                variant: 'error',
              });
            }
          }
        })
        .catch((err) => console.log('err =>>', err));

      isLoading.onFalse();
    } catch (error) {
      enqueueSnackbar('There was an error Verify OTP', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const onSendOtp = async () => {
    try {
      isLoading.onTrue();
      const fieldName = updatePhoneNumber.value ? 'phoneNumberUpdate' : 'phoneNumber';
      trigger(fieldName)
        .then(async (response) => {
          if (response) {
            const inputData = updatePhoneNumber.value
              ? {
                  phoneNumber: values.phoneNumberUpdate,
                }
              : {
                  phoneNumber: values.phoneNumber,
                };

            const res = await axiosInstance.post(endpoints.otpGuest.send, inputData);
            if (res?.data?.success === true) {
              if (updatePhoneNumber.value) {
                updateOtp_send.onTrue();
              } else {
                otpSend.onTrue();
              }
              setValue('otp', '');
              setVerificationSid_onSend(res?.data?.verificationSid);
              enqueueSnackbar(res?.data?.message);
            } else {
              if (updatePhoneNumber.value) {
                updateOtp_send.onFalse();
              } else {
                otpSend.onFalse();
              }
              enqueueSnackbar(res?.data?.message, {
                variant: 'error',
              });
            }
          }
        })
        .catch((err) => console.log('err =>>', err));
      isLoading.onFalse();
    } catch (error) {
      enqueueSnackbar('There was an error sending OTP', {
        variant: 'error',
      });
      console.error('Error =>', error);
    }
  };

  const sendOtp = values?.verificationStatus?.isVerified ? (
    <Box sx={{ typography: 'subtitle2', fontSize: '1.25rem', fontWeight: 'bold' }}>
      {`${values.phoneNumber}`}
      <Box component="span" sx={{ color: 'text.secondary' }}>
        <Iconify icon="material-symbols-light:verified" color="#4aa94e" width={26} mb={0.5} />
      </Box>
    </Box>
  ) : (
    <LoadingButton
      fullWidth
      size="large"
      variant="contained"
      loading={isLoading.value}
      onClick={onSendOtp}
    >
      Send OTP
    </LoadingButton>
  );
  return (
    <>
      <Card sx={{ mb: 3, zIndex: 'unset', overflow: 'visible' }}>
        <CardHeader
          title="Phone Number"
          action={
            values?.verificationStatus?.phoneNumber && (
              <Button
                size="small"
                startIcon={<Iconify icon="solar:pen-bold" />}
                onClick={() => {
                  updatePhoneNumber.onTrue();
                }}
              >
                Update
              </Button>
            )
          }
        />
        <Stack spacing={1} sx={{ p: 3 }}>
          <Stack spacing={3} alignItems="center" gap={2}>
            {!values?.verificationStatus?.phoneNumber && (
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field, fieldState: { error }, formState }) => (
                  <>
                    {console.log('field =>', formState)}
                    <MuiPhoneNumber
                      {...field}
                      inputProps={{
                        // autoFocus: true,
                        placeholder: 'Phone Number',
                        autoComplete: 'on',
                        style: {
                          width: '100%',
                          outline: 'none',
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#000',
                        },
                      }}
                      name="phoneNumber"
                      searchPlaceholder="Search for a country"
                      enableSearch
                      searchStyle={{
                        width: '100%',
                        fontFamily: 'Public Sans, sans-serif',
                        fontSize: '1rem',
                        color: '#000',
                      }}
                      dropdownStyle={{
                        width: '320px',
                        borderRadius: '10px',
                      }}
                      country="in"
                      specialLabel=""
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(`+${event}`);
                      }}
                    />
                    {error && (
                      <Box sx={{ color: '#FF5630', fontSize: '0.75rem' }}>{error?.message}</Box>
                    )}
                  </>
                )}
              />
            )}
            {otpSend.value && (
              <>
                <RHFCode name="otp" type="number" />
                <LoadingButton
                  size="small"
                  loading={isLoading.value}
                  onClick={() => {
                    onSendOtp();
                  }}
                >
                  <Typography variant="body2">Resend Verification Code</Typography>
                </LoadingButton>
              </>
            )}
            {otpSend.value ? (
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                loading={isLoading.value}
                onClick={onSubmitOtp}
              >
                Verify Number
              </LoadingButton>
            ) : (
              sendOtp
            )}
          </Stack>
        </Stack>
      </Card>
      <Dialog open={updatePhoneNumber.value} onClose={updatePhoneNumber.onFalse}>
        <DialogTitle>Update Phone Number</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new phone number to update your existing phone number.
          </DialogContentText>

          <Box pt={3}>
            <Controller
              name="phoneNumberUpdate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <MuiPhoneNumber
                    {...field}
                    inputProps={{
                      // autoFocus: true,
                      placeholder: 'Phone Number',
                      autoComplete: 'on',
                      style: {
                        width: '100%',
                        outline: 'none',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        border: error && '1px solid #FF5630',
                        color: '#000',
                      },
                    }}
                    name="phoneNumberUpdate"
                    searchPlaceholder="Search for a country"
                    enableSearch
                    searchStyle={{
                      width: '100%',
                      fontFamily: 'Public Sans, sans-serif',
                      fontSize: '1rem',
                      color: '#000',
                    }}
                    dropdownStyle={{
                      width: '320px',
                      borderRadius: '10px',
                    }}
                    country="in"
                    specialLabel="Phone Number"
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(`+${event}`);
                      updateOtp_send.onFalse();
                    }}
                  />
                  {error && (
                    <Box px={2} pt={2} sx={{ color: '#FF5630', fontSize: '0.75rem' }}>
                      {error?.message}
                    </Box>
                  )}
                </>
              )}
            />

            {updateOtp_send.value && <RHFCode pt={2} name="otp" type="number" />}
          </Box>
        </DialogContent>{' '}
        {updateOtp_send.value && (
          <DialogActions>
            <LoadingButton
              size="small"
              loading={isLoading.value}
              onClick={() => {
                onSendOtp();
              }}
            >
              <Typography variant="body2">Resend Verification Code</Typography>
            </LoadingButton>
          </DialogActions>
        )}
        <DialogActions>
          <Button size="large" onClick={updatePhoneNumber.onFalse}>
            Cancel
          </Button>
          {updateOtp_send.value ? (
            <LoadingButton
              size="large"
              variant="outlined"
              loading={isLoading.value}
              onClick={onSubmitOtp}
            >
              Verify Number
            </LoadingButton>
          ) : (
            <LoadingButton
              size="large"
              variant="outlined"
              loading={isLoading.value}
              onClick={onSendOtp}
            >
              Send OTP
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

CheckoutBillingNumber.propTypes = {
  PaymentSchema: PropTypes.object,
  methods: PropTypes.any,
};
