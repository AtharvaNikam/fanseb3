import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PatternFormat } from 'react-number-format';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

// assets
import { countries } from 'src/assets/data';
// components
import { TextField } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, {
  RHFAutocomplete,
  RHFCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { HOST_API } from 'src/config-global';
import axiosInstance from 'src/utils/axios';
import { useCheckout } from '../hooks';
// ----------------------------------------------------------------------

export default function AddressNewForm({ open, onClose, onCreate, setAddressBooks, addressBooks }) {
  const { user } = useAuthContext();
  const { onAddAddress } = useCheckout();

  const NewAddressSchema = Yup.object().shape({
    name: Yup.string().required('Fullname is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zipCode: Yup.string().required('Zip code is required'),
    // not required
    addressType: Yup.string(),
    primary: Yup.boolean(),
  });

  const defaultValues = {
    name: '',
    city: '',
    state: '',
    address: '',
    zipCode: '',
    primary: true,
    phoneNumber: '',
    addressType: 'Home',
    country: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      const createAddress = {
        id: `_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        phoneNumber: data.phoneNumber,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipCode}`,
        addressType: data.addressType,
        primary: data.primary,
      };

      let inputDataAll;
      if (addressBooks && data.primary === true) {
        const hasPrimaryAddress = addressBooks.some((address) => address.primary === true);
        const alteredUserAddresses = addressBooks.map((address) => ({
          ...address,
          primary: hasPrimaryAddress ? false : address.primary,
        }));

        inputDataAll = {
          userProfile: {
            address: [createAddress, ...(hasPrimaryAddress ? alteredUserAddresses : addressBooks)],
          },
        };
      } else {
        inputDataAll = {
          userProfile: {
            address: [createAddress, ...addressBooks],
          },
        };
      }

      const accessToken = localStorage.getItem('accessToken');
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      if (user) {
        const requestUrl = `${HOST_API}api/users/${user.id}`;
        const requestPayload = addressBooks
          ? inputDataAll
          : { userProfile: { address: [createAddress] } };
        await axios.patch(requestUrl, requestPayload);

        const res = await axiosInstance.get(`${HOST_API}me`);
        setAddressBooks(res?.data?.userProfile?.address);
      } else {
        const address = addressBooks ? inputDataAll.userProfile.address : createAddress;
        onAddAddress(address);
      }

      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    setAddressBooks(user?.userProfile?.address);
  }, [setAddressBooks, user]);
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>New address</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <RHFRadioGroup
              row
              name="addressType"
              options={[
                { label: 'Home', value: 'Home' },
                { label: 'Office', value: 'Office' },
              ]}
            />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />

              <Controller
                name="phoneNumber"
                render={({ field, fieldState: { error } }) => (
                  <PatternFormat
                    name="phoneNumber"
                    label="Phone Number"
                    format="+91%%%%%%%%%%"
                    patternChar="%"
                    customInput={TextField}
                    value={field.value === 0 ? '' : field.value}
                    {...field}
                    fullWidth
                    onValueChange={(event) => {
                      field.onChange(event.value);
                    }}
                    error={!!error}
                    helperText={error ? error?.message : null}
                  />
                )}
              />
            </Box>

            <RHFTextField name="address" label="Address" />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="city" label="Town / City" />
              <RHFTextField name="state" label="State" />
              <Controller
                name="zipCode"
                render={({ field, fieldState: { error } }) => (
                  <PatternFormat
                    name="zipCode"
                    label="PinCode"
                    format="%%%%%%"
                    patternChar="%"
                    customInput={TextField}
                    value={field.value === 0 ? '' : field.value}
                    {...field}
                    fullWidth
                    onValueChange={(event) => {
                      field.onChange(event.value);
                    }}
                    error={!!error}
                    helperText={error ? error?.message : null}
                  />
                )}
              />
            </Box>

            <RHFAutocomplete
              name="country"
              label="Country"
              options={countries.map((country) => country.label)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => {
                const { code, label, phone } = countries.filter(
                  (country) => country.label === option
                )[0];

                if (!label) {
                  return null;
                }

                return (
                  <li {...props} key={label}>
                    <Iconify
                      key={label}
                      icon={`circle-flags:${code.toLowerCase()}`}
                      width={28}
                      sx={{ mr: 1 }}
                    />
                    {label} ({code}) +{phone}
                  </li>
                );
              }}
            />

            <RHFCheckbox name="primary" label="Use this address as default." />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Deliver to this Address
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

AddressNewForm.propTypes = {
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  setAddressBooks: PropTypes.func,
  addressBooks: PropTypes.array,
  open: PropTypes.bool,
};
